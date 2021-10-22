import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import * as Sentry from '@sentry/react';
import queryString from 'query-string';
import { Row, Col, Tabs, Tab, Container, Alert, Pagination } from 'react-bootstrap';
import Loading from '../commonComponents/Loading';
import SearchBar from '../commonComponents/searchBar/SearchBar';
import 'react-tabs/style/react-tabs.css';
import DiscourseTopic from '../discourse/DiscourseTopic';
import moment from 'moment';
import _ from 'lodash';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../commonComponents/userMessages/UserMessages';
import DataSetModal from '../commonComponents/dataSetModal/DataSetModal';
import ActionBar from '../commonComponents/actionbar/ActionBar';
import ErrorModal from '../commonComponents/errorModal';
import ResourcePageButtons from '../commonComponents/resourcePageButtons/ResourcePageButtons';
import SVGIcon from '../../images/SVGIcon';
import './Collections.scss';
import CollectionsSearch from './CollectionsSearch';
import googleAnalytics from '../../tracking';
import { getCollectionRequest, getCollectionRelatedObjectsRequest, postCollectionCounterUpdateRequest } from '../../services/collection';
import { filterCollectionItems, generatePaginatedItems, generateDropdownItems } from './collection.utils';
import { sortByMetadataQuality, sortByRecentlyAdded, sortByResources, sortByRelevance, sortByPopularity } from './collection.utils.sort';
import { MAXRESULT } from './constants';
import DatasetCollectionResults from './Components/DatasetCollectionResults';
import ToolCollectionResults from './Components/ToolCollectionResults';
import ProjectCollectionResults from './Components/ProjectCollectionResults';
import PaperCollectionResults from './Components/PaperCollectionResults';
import PersonCollectionResults from './Components/PersonCollectionResults';
import CourseCollectionResults from './Components/CourseCollectionResults';

export const CollectionPage = props => {
	const [collectionData, setCollectionData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isResultsLoading, setIsResultsLoading] = useState(true);
	const [toolCount, setToolCount] = useState(0);
	const [datasetCount, setDatasetCount] = useState(0);
	const [personCount, setPersonCount] = useState(0);
	const [projectCount, setProjectCount] = useState(0);
	const [paperCount, setPaperCount] = useState(0);
	const [courseCount, setCourseCount] = useState(0);
	const [datasetIndex, setDatasetIndex] = useState(0);
	const [toolIndex, setToolIndex] = useState(0);
	const [projectIndex, setProjectIndex] = useState(0);
	const [paperIndex, setPaperIndex] = useState(0);
	const [personIndex, setPersonIndex] = useState(0);
	const [courseIndex, setCourseIndex] = useState(0);
	const [collectionAdded, setCollectionAdded] = useState(false);
	const [collectionEdited, setCollectionEdited] = useState(false);
	const [searchString, setSearchString] = useState('');
	const [searchCollectionsString, setCollectionsSearchString] = useState('');
	const [collectionsPageSort, setCollectionsPageSort] = useState('recentlyadded');
	const [discoursePostCount, setDiscoursePostCount] = useState(0);
	const [key, setKey] = useState('dataset');
	const [searchBar] = useState(React.createRef());
	const [showDrawer, setShowDrawer] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [context, setContext] = useState({});
	const [objectData, setObjectData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
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

	useEffect(() => {
		if (!!window.location.search) {
			let values = queryString.parse(window.location.search);
			setCollectionAdded(values.collectionAdded);
			setCollectionEdited(values.collectionEdited);
		}
		getCollectionDataFromApi();
	}, []);

	useEffect(() => {
		handleSort(collectionsPageSort);
	}, [filteredData]);

	const getCollectionDataFromApi = async () => {
		setIsLoading(true);
		await getCollectionRequest(props.match.params.collectionID).then(async res => {
			if (_.isNil(res.data)) {
				// Redirect user if invalid collection id is supplied
				window.localStorage.setItem('redirectMsg', `Collection not found for Id: ${props.match.params.collectionID}`);
				props.history.push({ pathname: '/search?search=', search: '' });
			} else {
				const localCollectionData = res.data.data[0];
				let counter = !localCollectionData.counter ? 1 : localCollectionData.counter + 1;
				postCollectionCounterUpdateRequest({ id: props.match.params.collectionID, counter });

				setCollectionData(res.data.data[0]);
				getObjectData();
				setIsLoading(false);
			}
		});
	};

	const getObjectData = async () => {
		await getCollectionRelatedObjectsRequest(props.match.params.collectionID).then(async res => {
			setObjectData(res.data.data);
			setFilteredData(res.data.data);
			countEntities(res.data.data);
		});
		setIsResultsLoading(false);
	};

	const countEntities = filteredData => {
		const entityCounts = filteredData.reduce((entityCountsByType, currentValue) => {
			let type = currentValue.type;
			if (!entityCountsByType.hasOwnProperty(type)) {
				entityCountsByType[type] = 0;
			}
			entityCountsByType[type]++;
			return entityCountsByType;
		}, {});

		let key;
		if (entityCounts.dataset > 0) {
			key = 'dataset';
		} else if (entityCounts.tool > 0) {
			key = 'tool';
		} else if (entityCounts.paper > 0) {
			key = 'paper';
		} else if (entityCounts.project > 0) {
			key = 'project';
		} else if (entityCounts.person > 0) {
			key = 'person';
		} else if (entityCounts.course > 0) {
			key = 'course';
		}
		setKey(key);

		setToolCount(entityCounts.tool || 0);
		setPersonCount(entityCounts.person || 0);
		setProjectCount(entityCounts.project || 0);
		setDatasetCount(entityCounts.dataset || 0);
		setPaperCount(entityCounts.paper || 0);
		setCourseCount(entityCounts.course || 0);
	};

	const updateDiscoursePostCount = count => {
		setDiscoursePostCount(count);
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

	const handleSort = sort => {
		googleAnalytics.recordEvent('Collections', `Sorted collection entities by ${sort}`, 'Sort dropdown option changed');
		setCollectionsPageSort(sort);
		switch (sort) {
			case 'metadata': {
				sortByMetadataQuality(filteredData);
				break;
			}
			case 'recentlyadded': {
				sortByRecentlyAdded(filteredData);
				break;
			}
			case 'resources': {
				sortByResources(filteredData);
				break;
			}
			case 'relevance': {
				sortByRelevance(filteredData, searchCollectionsString);
				break;
			}
			case 'popularity': {
				sortByPopularity(filteredData);
				break;
			}
			default:
				return sort;
		}
	};

	const handlePaginatedItems = index => {
		const filteredByKey = filteredData.filter(object => object.type === key);

		return filteredByKey.slice(index * MAXRESULT, (index + 1) * MAXRESULT);
	};

	const doCollectionsSearch = e => {
		// Fires on enter on searchbar
		if (e.key === 'Enter') {
			const filteredCollectionItems = filterCollectionItems(objectData, searchCollectionsString);

			let tempFilteredData = filteredCollectionItems.filter(dat => {
				return dat !== '';
			});
			setFilteredData(tempFilteredData);

			countEntities(filteredCollectionItems);
			handlePagination(key, 0);
		}
	};

	const setIndexByType = (type, page) => {
		switch (type) {
			case 'dataset':
				setDatasetIndex(page);
				break;
			case 'tool':
				setToolIndex(page);
				break;
			case 'project':
				setProjectIndex(page);
				break;
			case 'person':
				setPersonIndex(page);
				break;
			case 'course':
				setCourseIndex(page);
				break;
			default:
				break;
		}
	};

	const handlePagination = (type, page) => {
		setIndexByType(type, page - 1);

		window.scrollTo(0, 0);
	};

	const dropdownItems = generateDropdownItems(key);
	const { relatedObjects } = collectionData;
	const userId = userState[0].id;

	const searchProps = {
		isLoading: isResultsLoading || isLoading,
		maxResult: MAXRESULT,
		onPagination: handlePagination,
		relatedObjects,
		userId,
	};

	if (isLoading) {
		return (
			<Container>
				<Loading data-testid='outerLoadingSpinner' />
			</Container>
		);
	}

	return (
		<Sentry.ErrorBoundary fallback={<ErrorModal />}>
			<div data-testid='collection-container'>
				<SearchBar
					ref={searchBar}
					searchString={searchString}
					doSearchMethod={e => (e.key === 'Enter' ? (window.location.href = `/search?search=${encodeURIComponent(searchString)}`) : null)}
					doUpdateSearchString={searchString => setSearchString(searchString)}
					doToggleDrawer={toggleDrawer}
					userState={userState}
				/>
				<div className='collectionHeader pixelGapTop pixelGapBottom'>
					<Container>
						{collectionAdded ? (
							<Row>
								<Col sm={1} lg={1} />
								<Col sm={10} lg={10} className='pad-left-0'>
									<Alert data-test-id='collection-added-banner' variant='success' className='mb-3'>
										{collectionData.publicflag === true
											? 'This public collection is now live. This collection is searchable on the Gateway and can be viewed by all users.'
											: 'This private collection is now live. Only those who you share the collection link with will be able to view this page.'}
									</Alert>
								</Col>
								<Col sm={1} lg={10} />
							</Row>
						) : (
							''
						)}

						{collectionEdited ? (
							<Row>
								<Col sm={1} lg={1} />
								<Col sm={10} lg={10}>
									<Alert data-test-id='collection-added-banner' variant='success' className='mb-3'>
										{collectionData.publicflag === true
											? 'Done! Your public collection has been updated. This collection is searchable on the Gateway and can be viewed by all users.'
											: 'Done! Your private collection has been updated. Only those who you share the collection link with will be able to view this page.'}
									</Alert>
								</Col>
								<Col sm={1} lg={10} />
							</Row>
						) : (
							''
						)}

						{collectionData.activeflag === 'archive' ? (
							<Row>
								<Col sm={1} lg={1} />
								<Col sm={10} lg={10}>
									<Alert variant='danger' className='mb-3'>
										This collection has been archived
									</Alert>
								</Col>
								<Col sm={1} lg={10} />
							</Row>
						) : (
							''
						)}

						<Row>
							<Col md={3} lg={2} />
							<Col md={6} lg={8} className='flexCenter'>
								{!collectionData.imageLink || collectionData.imageLink === 'https://' ? (
									<div id='defaultCollectionImage' className='margin-right-1' />
								) : (
									<div id='collectionImage' style={{ backgroundImage: `url(${collectionData.imageLink})` }}></div>
								)}
							</Col>
							<Col md={2} lg={1} className='privatePublicDisplayCol'>
								{collectionData.publicflag === true ? (
									<div className='privatePublicDisplay'>
										<SVGIcon name='eye' width={24} height={24} fill={'#000000'} className={'margin-right-8'} />
										<span className='deepBlack-14 alignSuper' data-testid='publicBadge'>
											Public
										</span>
									</div>
								) : (
									<div className='privatePublicDisplay'>
										<SVGIcon name='eyeCrossed' width={24} height={24} fill={'#000000'} className={'margin-right-8'} />
										<span className='deepBlack-14 alignSuper' data-testid='privateBadge'>
											Private
										</span>
									</div>
								)}
							</Col>
							<Col md={1} lg={1} />
						</Row>
						<Row>
							<Col sm={12} lg={12} className='collectionCreatedDate'>
								<span className='gray700-13' data-testid='collectionCreated'>
									Created {moment(collectionData.createdAt).format('MMM YYYY')}{' '}
								</span>
							</Col>
						</Row>
						<Row>
							<Col sm={12} lg={12} className='centerText'>
								<span className='black-28' data-test-id='collectionName'>
									{collectionData.name}{' '}
								</span>
							</Col>
						</Row>
						<Row>
							<Col sm={1} lg={1} />
							<Col sm={10} lg={10} className='centerText'>
								{collectionData.persons.map((person, index) => {
									if (index > 0) {
										return (
											<a className='gray800-14' href={'/person/' + person.id} key={index}>
												, {person.firstname} {person.lastname}
											</a>
										);
									} else {
										return (
											<a className='gray800-14' href={'/person/' + person.id} key={index}>
												{person.firstname} {person.lastname}
											</a>
										);
									}
								})}
							</Col>
							<Col sm={1} lg={1} />
						</Row>

						<Row>
							<div className='col-sm-12 mt-3 gray800-14 text-center'>{collectionData.counter ? collectionData.counter : 0} views</div>
						</Row>

						<Row>
							<Col sm={1} lg={1} />
							<Col sm={10} lg={10} className='collectionKeywords'>
								{collectionData.keywords &&
									collectionData.keywords.length > 0 &&
									collectionData.keywords.map((keyword, index) => {
										return (
											<a href={'/search?search=&tab=Collections&collectionkeywords=' + keyword}>
												<div className='badge-tag' data-testid={`collectionKeyword${index}`}>
													{keyword}
												</div>
											</a>
										);
									})}
							</Col>
							<Col sm={1} lg={1} />
						</Row>

						<Row className='pad-top-24'>
							<Col sm={1} lg={1} />
							<Col sm={10} lg={10} data-test-id='collection-description' className='gray800-14 hdruk-section-body'>
								<ReactMarkdown source={collectionData.description} data-testid='collectionDescription' />
							</Col>
							<Col sm={1} lg={1} />
						</Row>
					</Container>
				</div>
			</div>

			<div>
				<Tabs
					className='tabsBackground gray700-13'
					activeKey={key}
					onSelect={key => {
						setKey(key);
						googleAnalytics.recordVirtualPageView(`${key} tab`);
						googleAnalytics.recordEvent('Collections', `Clicked ${key} tab`, `Viewing ${key}`);
					}}
					data-testid='collectionPageTabs'>
					<Tab eventKey='dataset' title={'Datasets (' + datasetCount + ')'}></Tab>
					<Tab eventKey='tool' title={'Tools (' + toolCount + ')'}></Tab>
					<Tab eventKey='paper' title={'Papers (' + paperCount + ')'}></Tab>
					<Tab eventKey='project' title={'Projects (' + projectCount + ')'}></Tab>
					<Tab eventKey='person' title={'People (' + personCount + ')'}></Tab>
					<Tab eventKey='course' title={'Course (' + courseCount + ')'}></Tab>
					<Tab eventKey='discussion' title={`Discussion (${discoursePostCount})`}>
						<Container className='resource-card'>
							<Row>
								<Col sm={1} lg={1} />
								<Col sm={10} lg={10}>
									<DiscourseTopic
										collectionId={collectionData.id}
										topicId={collectionData.discourseTopicId || 0}
										userState={userState}
										onUpdateDiscoursePostCount={updateDiscoursePostCount}></DiscourseTopic>
								</Col>
							</Row>
						</Container>
					</Tab>
				</Tabs>
			</div>

			<Container className='resource-card'>
				{key !== 'discussion' && (
					<CollectionsSearch
						doCollectionsSearchMethod={doCollectionsSearch}
						doUpdateCollectionsSearchString={searchCollectionsString => setCollectionsSearchString(searchCollectionsString)}
						isLoading={isResultsLoading}
						handleSort={handleSort}
						isCollectionsSearch={true}
						dropdownItems={dropdownItems}
						sort={collectionsPageSort === '' ? (searchCollectionsString === '' ? 'recentlyadded' : 'relevance') : collectionsPageSort}
					/>
				)}
				<Row>
					<Col sm={1} lg={1} />
					<Col sm={10} lg={10}>
						{key === 'dataset' && (
							<DatasetCollectionResults
								data={handlePaginatedItems(datasetIndex)}
								count={datasetCount}
								pageNumber={datasetIndex}
								totalPages={datasetCount / MAXRESULT}
								{...searchProps}
							/>
						)}

						{key === 'tool' && (
							<ToolCollectionResults
								data={handlePaginatedItems(toolIndex)}
								count={toolCount}
								pageNumber={toolIndex}
								totalPages={toolCount / MAXRESULT}
								{...searchProps}
							/>
						)}

						{key === 'project' && (
							<ProjectCollectionResults
								data={handlePaginatedItems(projectIndex)}
								count={projectCount}
								pageNumber={projectIndex}
								totalPages={projectCount / MAXRESULT}
								{...searchProps}
							/>
						)}

						{key === 'paper' && (
							<PaperCollectionResults
								data={handlePaginatedItems(paperIndex)}
								count={paperCount}
								pageNumber={paperIndex}
								totalPages={paperCount / MAXRESULT}
								{...searchProps}
							/>
						)}

						{key === 'person' && (
							<PersonCollectionResults
								data={handlePaginatedItems(personIndex)}
								count={personCount}
								pageNumber={personIndex}
								totalPages={personCount / MAXRESULT}
								{...searchProps}
							/>
						)}

						{key === 'course' && (
							<CourseCollectionResults
								data={handlePaginatedItems(courseIndex)}
								count={courseCount}
								pageNumber={courseIndex}
								totalPages={courseCount / MAXRESULT}
								{...searchProps}
							/>
						)}
					</Col>
					<Col sm={1} lg={10} />
				</Row>
			</Container>

			{userState[0].loggedIn &&
				(userState[0].role === 'Admin' || (collectionData.authors && collectionData.authors.includes(userState[0].id))) && (
					<ActionBar userState={userState}>
						<ResourcePageButtons data={collectionData} userState={userState} isCollection={true} />
					</ActionBar>
				)}

			<SideDrawer open={showDrawer} closed={toggleDrawer}>
				<UserMessages userState={userState[0]} closed={toggleDrawer} toggleModal={toggleModal} drawerIsOpen={showDrawer} />
			</SideDrawer>

			<DataSetModal open={showModal} context={context} closed={toggleModal} userState={userState[0]} />
		</Sentry.ErrorBoundary>
	);
};

export default CollectionPage;
