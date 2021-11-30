import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import * as Sentry from '@sentry/react';
import { Row, Col, Tabs, Tab, Container, Alert, Tooltip } from 'react-bootstrap';
import NotFound from '../../commonComponents/NotFound';
import Loading from '../../commonComponents/Loading';
import RelatedObject from '../../commonComponents/relatedObject/RelatedObject';
import SearchBar from '../../commonComponents/searchBar/SearchBar';
import DiscourseTopic from '../../discourse/DiscourseTopic';
import SideDrawer from '../../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../../commonComponents/userMessages/UserMessages';
import ActionBar from '../../commonComponents/actionbar/ActionBar';
import ResourcePageButtons from '../../commonComponents/resourcePageButtons/ResourcePageButtons';
import DataSetModal from '../../commonComponents/dataSetModal/DataSetModal';
import ErrorModal from '../../commonComponents/errorModal/ErrorModal';
import CollectionCard from '../../commonComponents/collectionCard/CollectionCard';
import 'react-tabs/style/react-tabs.css';
import { baseURL } from '../../../configs/url.config';
import SVGIcon from '../../../images/SVGIcon';
import _ from 'lodash';
import '../DataUse.scss';
import About from './About';
import googleAnalytics from '../../../tracking';

export const DataUseView = props => {
	const [id] = useState('');
	const [dataUseData, setDataUseData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [dataUseAdded, setDataUseAdded] = useState(false);
	const [dataUseEdited, setDataUseEdited] = useState(false);
	const [searchString, setSearchString] = useState('');
	const [relatedObjects, setRelatedObjects] = useState([]);
	const [discoursePostCount, setDiscoursePostCount] = useState(0);
	const [showDrawer, setShowDrawer] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [context, setContext] = useState({});
	const [collections, setCollections] = useState([]);
	const [searchBar] = useState(React.createRef());
	const [userState] = useState(
		props.userState || [
			{
				loggedIn: false,
				role: 'Reader',
				id: null,
				name: null,
			},
		]
	);

	let showError = false;

	//componentDidMount - on loading of page detail page
	useEffect(() => {
		if (!!window.location.search) {
			let values = queryString.parse(window.location.search);
			setDataUseAdded(values.dataUseAdded);
			setDataUseEdited(values.dataUseEdited);
		}
		getDataUseDataFromDb();
	}, []);

	//componentDidUpdate - on render of page detail page were id is different
	useEffect(() => {
		if (props.match.params.toolID !== id && id !== '' && !isLoading) {
			getDataUseDataFromDb();
		}
	});

	const showModalHandler = () => {
		showError = true;
	};

	const hideModalHandler = () => {
		showError = false;
	};

	const getDataUseDataFromDb = () => {
		setIsLoading(true);
		axios
			.get(baseURL + '/api/v2/data-use-registers/' + props.match.params.datauseID)
			.then(async res => {
				if (_.isNil(res.data)) {
					window.localStorage.setItem('redirectMsg', `Data Use not found for Id: ${props.match.params.datauseID}`);
					props.history.push({ pathname: '/search?search=', search: '' });
				} else {
					const localDataUseData = res.data;
					document.title = localDataUseData.projectTitle.trim();

					let counter = !localDataUseData.counter ? 1 : localDataUseData.counter + 1;
					updateCounter(props.match.params.datauseID, counter);

					if (!_.isUndefined(localDataUseData.relatedObjects)) {
						let localAdditionalObjInfo = await getAdditionalObjectInfo(localDataUseData.relatedObjects);
						await populateRelatedObjects(localDataUseData, localAdditionalObjInfo);
					}
					setDataUseData(localDataUseData);
					populateCollections(localDataUseData);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const populateCollections = localDataUseData => {
		setIsLoading(true);
		axios.get(baseURL + '/api/v1/collections/entityid/' + localDataUseData.id).then(res => {
			setCollections(res.data.data || []);
		});
	};

	const doSearch = e => {
		//fires on enter on searchbar
		if (e.key === 'Enter') window.location.href = `/search?search=${encodeURIComponent(searchString)}`;
	};

	const updateSearchString = searchString => {
		setSearchString(searchString);
	};

	const updateCounter = (id, counter) => {
		axios.post(baseURL + '/api/v1/counter/update', { id, counter });
	};

	const updateDiscoursePostCount = count => {
		setDiscoursePostCount(count);
	};

	const getAdditionalObjectInfo = async additionalObjInfo => {
		let tempObjects = [];
		if (additionalObjInfo) {
			const promises = additionalObjInfo.map(async (object, index) => {
				if (object.objectType === 'course') {
					await axios.get(baseURL + '/api/v1/relatedobject/course/' + object.objectId).then(res => {
						tempObjects.push({
							id: object.objectId,
							activeflag: res.data.data[0].activeflag,
						});
					});
				} else {
					await axios.get(baseURL + '/api/v1/relatedobject/' + object.objectId).then(res => {
						let datasetPublisher;
						let datasetLogo;
						!_.isEmpty(res.data.data[0].datasetv2) && _.has(res.data.data[0], 'datasetv2.summary.publisher.name')
							? (datasetPublisher = res.data.data[0].datasetv2.summary.publisher.name)
							: (datasetPublisher = '');

						!_.isEmpty(res.data.data[0].datasetv2) && _.has(res.data.data[0], 'datasetv2.summary.publisher.logo')
							? (datasetLogo = res.data.data[0].datasetv2.summary.publisher.logo)
							: (datasetLogo = '');

						tempObjects.push({
							id: object.objectId,
							authors: res.data.data[0].authors,
							activeflag: res.data.data[0].activeflag,
							datasetPublisher: datasetPublisher,
							datasetLogo: datasetLogo,
						});
					});
				}
			});
			await Promise.all(promises);
		}
		return tempObjects;
	};

	const populateRelatedObjects = (localDataUseData, localAdditionalObjInfo) => {
		let tempRelatedObjects = [];

		if (localDataUseData.relatedObjects && localAdditionalObjInfo) {
			localDataUseData.relatedObjects.map(object =>
				localAdditionalObjInfo.forEach(item => {
					if (object.objectId === item.id && item.activeflag === 'active') {
						object['datasetPublisher'] = item.datasetPublisher;
						object['datasetLogo'] = item.datasetLogo;

						tempRelatedObjects.push(object);
					}
					if (object.objectId === item.id && item.activeflag === 'review' && item.authors.includes(userState[0].id)) {
						tempRelatedObjects.push(object);
					}
				})
			);
		}
		setRelatedObjects(tempRelatedObjects);
	};

	const toggleDrawer = () => {
		if (showDrawer === true) {
			searchBar.current.getNumberOfUnreadMessages();
		}
		setShowDrawer(!showDrawer);
	};

	const toggleModal = (showEnquiry = false, context = {}) => {
		setShowModal(!showModal);
		setContext(context);
		setShowDrawer(showEnquiry);
	};

	if (isLoading) {
		return (
			<Container>
				<Loading data-testid='isLoading' />
			</Container>
		);
	}

	if (dataUseData.relatedObjects === null || typeof dataUseData.relatedObjects === 'undefined') {
		dataUseData.relatedObjects = [];
	}

	const renderTooltip = props => (
		<Tooltip className='tool-tip' style={{ width: '240px' }}>
			{props}
		</Tooltip>
	);

	return (
		<Sentry.ErrorBoundary fallback={<ErrorModal show={showModalHandler} handleClose={hideModalHandler} />}>
			<div>
				<SearchBar
					ref={searchBar}
					searchString={searchString}
					doSearchMethod={doSearch}
					doUpdateSearchString={updateSearchString}
					userState={userState}
					doToggleDrawer={toggleDrawer}
				/>
				<Container className='margin-bottom-48'>
					{dataUseAdded ? (
						<Row className=''>
							<Col sm={1} lg={1} />
							<Col sm={10} lg={10}>
								<Alert data-test-id='datause-added-banner' variant='success' className='mt-3'>
									Done! Someone will review your data use and let you know when it goes live
								</Alert>
							</Col>
							<Col sm={1} lg={10} />
						</Row>
					) : (
						''
					)}

					{dataUseEdited ? (
						<Row className=''>
							<Col sm={1} lg={1} />
							<Col sm={10} lg={10}>
								<Alert variant='success' className='mt-3'>
									Done! Your data use has been updated
								</Alert>
							</Col>
							<Col sm={1} lg={10} />
						</Row>
					) : (
						''
					)}

					{dataUseData.activeflag === 'inReview' ? (
						<Row className=''>
							<Col sm={1} lg={1} />
							<Col sm={10} lg={10}>
								<Alert data-test-id='datause-pending-banner' variant='warning' className='mt-3'>
									Your data use is pending review. Only you can see this page.
								</Alert>
							</Col>
							<Col sm={1} lg={10} />
						</Row>
					) : (
						''
					)}

					<Row className='mt-4'>
						<Col sm={1} lg={1} />
						<Col sm={10} lg={10}>
							<div className='rectangle'>
								<Row>
									<Col>
										<span data-test-id='datause-name' className='black-16' data-testid='title'>
											{dataUseData.projectTitle}
										</span>
										<br />
										<span className='gray800-14'>{dataUseData.organisationName}</span>
									</Col>
								</Row>
								<Row className='margin-top-16'>
									<Col>
										<span className='badge-datause badge-tag badge-datause-bold'>
											<SVGIcon name='datauseicon' width={12} height={12} fill={'#fff'} /> Data use
										</span>
										{dataUseData.keywords &&
											dataUseData.keywords.map(keyword => (
												<a href={`/search?search=&datausekeywords=${keyword}&tab=Datauses`} className='badge-tag badge-datause-bold'>
													{keyword}
												</a>
											))}
									</Col>
								</Row>
								<Row className='margin-top-16'>
									<Col xs={12}>
										<span className='gray800-14'>
											{dataUseData.counter === undefined ? 1 : dataUseData.counter + 1}
											{dataUseData.counter === undefined ? ' view' : ' views'}
										</span>
									</Col>
								</Row>
							</div>
						</Col>
						<Col sm={1} lg={10} />
					</Row>
					<Row>
						<Col sm={1} lg={1} />
						<Col sm={10} lg={10}>
							<div>
								<Tabs
									className='tabsBackground gray700-13 margin-bottom-16'
									onSelect={key => {
										googleAnalytics.recordVirtualPageView(`${key} tab`);
										googleAnalytics.recordEvent('Data Use', `Clicked ${key} tab`, `Viewing ${key}`);
									}}>
									<Tab eventKey='about' title={'About'}>
										<About data={dataUseData} renderTooltip={renderTooltip} />
									</Tab>

									<Tab eventKey='Discussion' title={`Discussion (${discoursePostCount})`}>
										<DiscourseTopic
											toolId={dataUseData.id}
											topicId={dataUseData.discourseTopicId || 0}
											userState={userState}
											onUpdateDiscoursePostCount={updateDiscoursePostCount}
										/>
									</Tab>
									<Tab eventKey='Related resources' title={'Related resources (' + relatedObjects.length + ')'}>
										{relatedObjects.length <= 0 ? (
											<NotFound word='related resources' />
										) : (
											relatedObjects.map(object => (
												<RelatedObject
													relatedObject={object}
													objectType={object.objectType}
													activeLink={true}
													showRelationshipAnswer={true}
													datasetPublisher={object.datasetPublisher}
													datasetLogo={object.datasetLogo}
												/>
											))
										)}
									</Tab>
									<Tab eventKey='Collections' title={'Collections (' + collections.length + ')'}>
										{!collections || collections.length <= 0 ? (
											<NotFound text='This data use has not been featured on any collections yet.' />
										) : (
											<>
												<NotFound text='This data use appears on the collections below. A collection is a group of resources on the same theme.' />

												<Row>
													{collections.map(collection => (
														<Col sm={12} md={12} lg={6} className='flexCenter'>
															<CollectionCard data={collection} />
														</Col>
													))}
												</Row>
											</>
										)}
									</Tab>
								</Tabs>
							</div>
						</Col>
						<Col sm={1} lg={1} />
					</Row>
				</Container>
				<SideDrawer open={showDrawer} closed={toggleDrawer}>
					<UserMessages userState={userState[0]} closed={toggleDrawer} toggleModal={toggleModal} drawerIsOpen={showDrawer} />
				</SideDrawer>

				<ActionBar userState={userState}>
					<ResourcePageButtons data={dataUseData} userState={userState} />
				</ActionBar>

				<DataSetModal open={showModal} context={context} closed={toggleModal} userState={userState[0]} />
			</div>
		</Sentry.ErrorBoundary>
	);
};

export default DataUseView;
