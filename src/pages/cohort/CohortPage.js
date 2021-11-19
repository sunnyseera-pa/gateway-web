import React, { Fragment, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import * as Sentry from '@sentry/react';
import { Container, Row, Col, Tabs, Tab, Alert, Button, Accordion, Dropdown } from 'react-bootstrap';
import SearchBar from '../commonComponents/searchBar/SearchBar';
import Loading from '../commonComponents/Loading';
import Uploader from '../commonComponents/Uploader';
import SVGIcon from '../../images/SVGIcon';
import DiscourseTopic from '../discourse/DiscourseTopic';
import ErrorModal from '../commonComponents/errorModal/ErrorModal';
import CohortDiscoveryBanner from '../dataset/components/CohortDiscoveryBanner';
import ActionBar from '../commonComponents/actionbar/ActionBar';
import CohortActionButtons from './components/ApplicantActionButtons/CohortActionButtons';
import ToolTips from '../commonComponents/ToolTips/ToolTips';
import './Cohorts.scss';
import { ReactComponent as InfoSVG } from '../../images/info.svg';
import { ReactComponent as InfoFillSVG } from '../../images/infofill.svg';
import { ReactComponent as CycleSVG } from '../../images/cycle.svg';
import OmopCard from './OmopCard';
import axios from 'axios';
import { has, isEmpty, isNil } from 'lodash';
import { CohortDatasetPublisherCard } from './CohortDatasetPublisherCard';
import NotFound from '../commonComponents/NotFound';
import RelatedObject from '../commonComponents/relatedObject/RelatedObject';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../commonComponents/userMessages/UserMessages';
import DataSetModal from '../commonComponents/dataSetModal/DataSetModal';
import _ from 'lodash';
let baseURL = require('../commonComponents/BaseURL').getURL();

export const CohortPage = props => {
	const [isLoading, setIsLoading] = useState(true);
	const [cohortData, setCohortData] = useState([]);
	const [cohortGroups, setCohortGroups] = useState([]);
	const [searchString, setSearchString] = useState('');
	const [showDrawer, setShowDrawer] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [context, setContext] = useState({});
	const [versionHistory, setVersionHistory] = useState([]);
	const [searchBar] = useState(React.createRef());
	const [showOldVersionBanner, setShowOldVersionBanner] = useState(false);
	const [showArchivedBanner, setShowArchivedBanner] = useState(false);
	const [datasetsGroupedByPublisher, setDatasetsGroupedByPublisher] = useState([]);
	const [topicContextByPublisher, setTopicContextByPublisher] = useState({});
	const [relatedObjectsFiltered, setRelatedObjectsFiltered] = useState([]);
	const [relatedResourcesSort, setRelatedResourcesSort] = useState([]);
	const [relatedObjectsSearchValue, setRelatedObjectsSearchValue] = useState('');
	const [sorting, setSorting] = useState('showAll');
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

	useEffect(() => {
		getCohortFromDb();
	}, []);

	const getCohortFromDb = async () => {
		setIsLoading(true);
		let newCohortData, newVersionHistory;
		await axios.get(baseURL + '/api/v1/cohorts/' + props.match.params.cohortID).then(res => {
			newCohortData = res.data;
			setCohortData(newCohortData);

			if (has(newCohortData, 'cohort.input.cohorts[0].groups')) {
				setCohortGroups(newCohortData.cohort.input.cohorts[0].groups);
			}
			const updatedCounter = !newCohortData.counter ? 1 : newCohortData.counter + 1;
			updateCounter(newCohortData.id, updatedCounter);
		});

		await axios.get(baseURL + `/api/v1/cohorts?pid=${newCohortData.pid}&fields=id,version,changeLog&sort=-version`).then(res => {
			newVersionHistory = res.data.data;
			setVersionHistory(newVersionHistory);
		});

		setShowOldVersionBanner(
			newCohortData.activeflag === 'archived_version' &&
				newVersionHistory.length > 1 &&
				newVersionHistory[0].version > newCohortData.version
		);
		setShowArchivedBanner(newCohortData.activeflag === 'archive');

		// Get datasets information for datasets tab
		await getDatasets(newCohortData);
		//Get publisher info for data request
		await getPublisherDetailsForTopicContext(topicContextByPublisher);

		setIsLoading(false);
	};

	const getDatasets = async newCohortData => {
		// 1. Get dataset information
		const datasets = await Promise.all(
			newCohortData.countsPerDataset.map(async cpDataset => {
				const dataset = await axios.get(baseURL + '/api/v1/datasets/' + cpDataset.pid);
				const {
					_id,
					name,
					pid,
					datasetid,
					tags: { features } = {},
					datasetfields: { publisher, abstract, contactPoint } = {},
				} = dataset.data.data;

				buildTopicContextForDAR(publisher, datasetid, _id, name, contactPoint);

				const datasetInfo = {
					name,
					pid,
					datasetid,
					abstract,
					features,
					publisher,
					count: cpDataset.count,
				};
				return datasetInfo;
			})
		);

		// 2. Group datasets by Publisher
		const datasetsGrouped = datasets.reduce((result, curr) => {
			result[curr.publisher] = result[curr.publisher] || [];
			result[curr.publisher].push(curr);
			return result;
		}, Object.create(null));
		setDatasetsGroupedByPublisher(datasetsGrouped);
	};

	const buildTopicContextForDAR = (publisher, datasetid, _id, name, contactPoint) => {
		// Check if key for current publisher already exists
		let topicContextTemp = topicContextByPublisher;
		if (topicContextTemp.hasOwnProperty(publisher)) {
			topicContextTemp[publisher].datasets.push({ datasetId: datasetid, publisher });
			topicContextTemp[publisher].relatedObjectIds.push(_id);
			topicContextTemp[publisher].subTitle.push(name);
			topicContextTemp[publisher].tags.push(name);
		} else {
			topicContextTemp[publisher] = {
				datasets: [{ datasetId: datasetid, publisher }] || [],
				relatedObjectIds: [_id] || [],
				subTitle: [name],
				tags: [name],
				title: publisher,
				contactPoint: contactPoint || '',
			};
		}

		setTopicContextByPublisher(topicContextTemp);
	};

	// Extract data required for DAR message enquiry
	const getPublisherDetailsForTopicContext = async topicContext => {
		let topicContextTemp = topicContext;
		// Iterate through keys (publishers)
		for (const publisher of Object.keys(topicContext)) {
			const response = await axios.get(`${baseURL}/api/v1/publishers/${publisher}`);
			const {
				data: {
					publisher: { dataRequestModalContent = {}, allowsMessaging = false, uses5Safes = false },
				},
			} = response;

			topicContextTemp[publisher].dataRequestModalContent = dataRequestModalContent;
			topicContextTemp[publisher].allowsMessaging = allowsMessaging;
			topicContextTemp[publisher].is5Safes = uses5Safes;
			topicContextTemp[publisher].allowNewMessage = false;
		}
		setTopicContextByPublisher(topicContextTemp);
	};

	const showModalHandler = () => {
		showError = true;
	};

	const hideModalHandler = () => {
		showError = false;
	};

	const doSearch = e => {
		//fires on enter on searchbar
		if (e.key === 'Enter') window.location.href = `/search?search=${encodeURIComponent(searchString)}`;
	};

	const updateSearchString = searchString => {
		setSearchString(searchString);
	};

	const toggleDrawer = () => {
		if (showDrawer === true) {
			searchBar.current.getNumberOfUnreadMessages();
		}
		setShowDrawer(!showDrawer);
	};

	const updateCounter = (id, counter) => {
		axios.post(baseURL + '/api/v1/cohortcounter/update', { id, counter });
	};

	const getVersionLink = (id, versionNumber, changeLog) => {
		return (
			<a
				href={'/cohort/' + id}
				className='version-list'
				onClick={e => {
					e.stopPropagation();
					window.location.href = `/`;
				}}>
				<span className='versionNumber'>{!isNil(versionNumber) ? versionNumber.toFixed(1) : ''}</span>
				{changeLog}
			</a>
		);
	};

	const toggleModal = (showEnquiry = false, context = {}) => {
		setShowModal(!showModal);
		setContext(context);
		setShowDrawer(showEnquiry);
	};

	const onRelatedObjectsSearch = e => {
		setRelatedObjectsSearchValue(e.target.value);
	};

	const doRelatedObjectsSearch = async e => {
		// Fires on enter on searchbar
		if (e.key === 'Enter') {
			setRelatedObjectsFiltered([]);
			setRelatedResourcesSort([]);
			setSorting('showAll');
			const filteredRelatedResourceItems = await filterRelatedResourceItems(relatedObjects, relatedObjectsSearchValue);

			let tempFilteredData = filteredRelatedResourceItems.filter(dat => {
				return dat !== '';
			});
			setRelatedObjectsFiltered(tempFilteredData);
			setRelatedResourcesSort(tempFilteredData);
		}
	};

	const filterRelatedResourceItems = (objectData, relatedObjectsSearchValue) =>
		objectData.map(object => {
			// Searching functionality - searches through object data and returns true if there is a match with the search term
			if (
				(_.has(object, 'name') ? object.name.toLowerCase().includes(relatedObjectsSearchValue.toLowerCase()) : false) ||
				(_.has(object, 'title') ? object.title.toLowerCase().includes(relatedObjectsSearchValue.toLowerCase()) : false) ||
				(_.has(object, 'firstname') ? object.firstname.toLowerCase().includes(relatedObjectsSearchValue.toLowerCase()) : false) ||
				(_.has(object, 'lastname') ? object.lastname.toLowerCase().includes(relatedObjectsSearchValue.toLowerCase()) : false)
			) {
				return object;
			} else {
				return '';
			}
		});

	const handleSort = async sort => {
		setRelatedObjectsFiltered([]);

		let tempFilteredData = [];
		if (sort === 'showAll') {
			tempFilteredData = await relatedResourcesSort;
		} else {
			tempFilteredData = await relatedResourcesSort.filter(dat => dat.objectType === sort);
		}
		setSorting(sort);
		setRelatedObjectsFiltered(tempFilteredData);
	};

	const [flagClosed, setFlagClosed] = useState(true);
	const { name, description, counter, filterCriteria, persons, totalResultCount, numberOfDatasets, relatedObjects } = cohortData;
	if (isLoading) {
		return (
			<Container>
				<Loading />
			</Container>
		);
	}

	return (
		<Sentry.ErrorBoundary fallback={<ErrorModal show={showModalHandler} handleClose={hideModalHandler} />}>
			<div>
				<SearchBar
					ref={searchBar}
					searchString={searchString}
					doSearchMethod={doSearch}
					doUpdateSearchString={updateSearchString}
					doToggleDrawer={toggleDrawer}
					userState={userState}
				/>
				<Container className='margin-bottom-48'>
					{showOldVersionBanner ? (
						<Row className='mt-2'>
							<Col sm={1} lg={1} />
							<Col sm={10} lg={10}>
								<Alert variant='warning' className='mt-3'>
									This is an old version of this cohort.
									<span className='float-right'>
										<a href={`/cohort/${versionHistory[0].id}`} className='alertLink'>
											Go to the latest version
										</a>
									</span>
								</Alert>
							</Col>
						</Row>
					) : (
						''
					)}

					{showArchivedBanner ? (
						<Row className='mt-2'>
							<Col sm={1} lg={1} />
							<Col sm={10} lg={10}>
								<Alert variant='warning' className='mt-3'>
									This cohort has been archived and there are no active versions.
								</Alert>
							</Col>
						</Row>
					) : (
						''
					)}

					<Row className='mt-2'>
						<Col sm={1} lg={1} />
						<Col sm={10} lg={10}>
							<div className='rectangle'>
								<Row>
									<Col className='line-height-normal'>
										<span className='black-16'>{name}</span>
									</Col>
								</Row>
								<Row className='margin-top-16'>
									<Col xs={12}>
										<span className='badge-cohort'>
											<SVGIcon name='dashboard' fill={'#472505'} className='badgeSvg mr-2' viewBox='-2 -2 22 22' />
											<span>Cohort</span>
										</span>
										{[...new Set(filterCriteria)].map(criteria => {
											return (
												<a href={'/search?search=&tab=Cohorts&cohortinclusionexclusion=' + criteria}>
													<div className='badge-tag'>{criteria}</div>
												</a>
											);
										})}
									</Col>
								</Row>

								<Row className='margin-top-20'>
									<Col xs={12} className='line-height-normal'>
										<span className='gray700-14'>
											{counter === undefined ? 1 : counter + 1}
											{counter === undefined ? ' view' : ' views'}
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
								<Tabs className='tabsBackground gray700-13 margin-bottom-8'>
									<Tab eventKey='About' title={'About'}>
										<Row>
											<Col sm={12} lg={12}>
												<div className='rectangle'>
													<Row className='gray800-14-bold'>
														<Col sm={12}>
															Inclusion / exclusion criteria
															<ToolTips
																content='This is the search criteria used to define this cohort within the Cohort Discovery tool.'
																class='margin-right-8 margin-left-6 titleToolTip'>
																<InfoSVG />
															</ToolTips>
														</Col>
													</Row>
													{cohortGroups.map((cohortGroup, index) => {
														return (
															<Row className='mt-3'>
																<Col sm={12}>
																	<div className='black-16-semibold mb-3'>Group {index + 1}</div>
																	{cohortGroup.rules.map((groupRule, index) => {
																		return <OmopCard index={index} groupRulesOperator={cohortGroup.rules_oper} groupRule={groupRule} />;
																	})}
																</Col>
															</Row>
														);
													})}
												</div>
											</Col>
										</Row>

										<Row className='mt-2'>
											<Col sm={12} lg={12}>
												<div className='rectangle'>
													<Row className='gray800-14-bold'>
														<Col sm={12}>Description</Col>
													</Row>
													<Row className='mt-3'>
														<Col sm={12} className='gray800-14 hdruk-section-body'>
															<ReactMarkdown source={description} />
														</Col>
													</Row>
												</div>
											</Col>
										</Row>

										<Row className='mt-2'>
											<Col sm={12}>
												<div className='rectangle'>
													<Row className='gray800-14-bold'>
														<Col sm={12}>Details</Col>
													</Row>
													<Accordion defaultActiveKey='1' style={{ width: '100%' }}>
														<Row className='mt-3'>
															<Col sm={2} className='gray800-14'>
																<Accordion.Toggle
																	as={Button}
																	variant='link'
																	eventKey='0'
																	onClick={e => {
																		e.stopPropagation();
																		setFlagClosed(!flagClosed);
																	}}
																	data-testid='accordion-toggle'
																	style={{ width: '100%', padding: '0px', border: '0px' }}
																	className='version-list'>
																	<div className='version-list'>
																		Version
																		<SVGIcon
																			name='chevronbottom'
																			fill={'#475da7'}
																			style={{ width: '18px', height: '18px', paddingLeft: '4px', marginTop: '-2px' }}
																			className={flagClosed === true ? 'svg-24' : 'svg-24 flipSVG'}
																		/>
																	</div>
																</Accordion.Toggle>
															</Col>
															<Col sm={10} className='gray800-14 contents'>
																<ToolTips
																	content='Any changes made to this cohort will create a new version. You can view previous versions, and a changelog message provided by the uploaders. Major versions indicate a change in the inclusion/exclusion criteria, and minor versions indicate a change in the description, title or uploaders.'
																	class='margin-right-8'>
																	<InfoSVG />
																</ToolTips>
																<div>
																	{flagClosed || versionHistory.length <= 1 ? (
																		getVersionLink(cohortData.id, cohortData.version, cohortData.changeLog)
																	) : (
																		<Accordion.Collapse eventKey='0' style={{ paddingRight: '20px' }}>
																			<Fragment>
																				{versionHistory.map(version => {
																					return getVersionLink(version.id, version.version, version.changeLog);
																				})}
																			</Fragment>
																		</Accordion.Collapse>
																	)}
																</div>
															</Col>
														</Row>
													</Accordion>
													<Row className='mt-2'>
														<Col sm={2} className='gray800-14'>
															Uploaders
														</Col>
														<ToolTips
															content='Uploaders are the Innovation Gateway users who added this cohort to the Innovation Gateway.'
															class='margin-right-8'>
															<InfoSVG />
														</ToolTips>
														<Col sm={10} className='gray800-14 contents'>
															{persons.map(person => {
																return <Uploader uploader={person} />;
															})}
														</Col>
													</Row>
												</div>
											</Col>
										</Row>

										<Row className='mt-1'>
											<Col sm={12} lg={12}>
												<CohortDiscoveryBanner userProps={userState[0]} />
											</Col>
										</Row>
									</Tab>

									<Tab eventKey='Datasets' title={`Datasets (${numberOfDatasets})`}>
										<Row>
											<Col sm={12} lg={12}>
												<div className='rectangle'>
													<Row className='gray800-14-bold'>
														<Col sm={10} className='gray800-14'>
															<div className='black-20-semibold'>Total entries</div>
															<div className='gray800-14 mt-1'>
																{totalResultCount.toLocaleString()} entries found across {numberOfDatasets}{' '}
																{numberOfDatasets > 1 ? 'datasets' : 'dataset'} using the cohort discovery functionality
															</div>
															<div className='mt-3'>
																<a href='/' className='gray800-14 textUnderline'>
																	<CycleSVG width={12} height={12} className='margin-right-4' />
																	Refresh data
																</a>
																<span className='gray-med-14 margin-left-10'>Last update 14 Aug 2020</span>
															</div>
														</Col>
														<Col sm={2}>
															<div className='black-20-semibold floatRight'>{totalResultCount.toLocaleString()}</div>
														</Col>
													</Row>
												</div>
											</Col>
										</Row>

										{!isEmpty(datasetsGroupedByPublisher) &&
											Object.keys(datasetsGroupedByPublisher).map(publisher => {
												return (
													<CohortDatasetPublisherCard
														publisher={publisher}
														publisherGroup={datasetsGroupedByPublisher[publisher]}
														userState={userState[0]}
														topicContext={topicContextByPublisher[publisher]}
														searchBar={searchBar}
													/>
												);
											})}

										<Row className='mt-2'>
											<Col sm={12} lg={12}>
												<div className='rectangle'>
													<Row className='gray800-14-bold'>
														<Col sm={11} lg={11} className='gray800-14'>
															<div className='black-16-semibold'>
																<InfoFillSVG className='margin-right-4' /> How to request access to datasets from multiple custodians
															</div>
															<div className='gray800-14 mt-2'>
																We understand researchers and innovators often need data from multiple sources for the same project. For
																now, only one request per custodian is possible, but there are ways to streamline this process. Read more to
																see our recommendations.
															</div>
														</Col>
														<Col sm={1} lg={1} className='alignSelfCenter'>
															<span onClick={() => {}}>
																<SVGIcon
																	name='chevronright'
																	fill={'#475da7'}
																	style={{ width: '18px', height: '18px' }}
																	className='floatRight pointer'
																/>
															</span>
														</Col>
													</Row>
												</div>
											</Col>
										</Row>
									</Tab>

									<Tab eventKey='Discussion' title='Discussions'>
										<DiscourseTopic toolId='' topicId='' userState={userState} onUpdateDiscoursePostCount='' />
									</Tab>
									<Tab
										eventKey='Related resources'
										title={`Related resources (${relatedObjects.filter(object => object.objectType !== 'dataset').length})`}>
										<Row>
											<Col lg={8}>
												<span className='collectionsSearchBar form-control'>
													<span className='collectionsSearchIcon'>
														<SVGIcon name='searchicon' width={20} height={20} fill={'#2c8267'} stroke='none' type='submit' />
													</span>
													<span>
														<input
															id='collectionsSearchBarInput'
															type='text'
															placeholder='Search within related resources'
															onChange
															value
															onKeyDown
														/>
													</span>
												</span>
											</Col>

											<Col lg={4} className='text-right'>
												<Dropdown className='sorting-dropdown' alignRight onSelect={handleSort}>
													<Dropdown.Toggle variant='info' id='dropdown-menu-align-right' className='gray800-14'>
														{(() => {
															if (sorting !== 'showAll')
																return `Show ${sorting === 'people' ? sorting : `${sorting}s`} (
																	${relatedResourcesSort.filter(dat => dat.objectType === sorting).length})`;
															else return `Show all resources (${relatedResourcesSort.length})`;
														})()}
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<Row
															key={`ddl-item-showall`}
															className={
																sorting === 'showAll'
																	? 'sort-dropdown-item sort-dropdown-item-selected sortingDropdown'
																	: 'sort-dropdown-item sortingDropdown'
															}>
															<Col xs={12} className='p-0'>
																<Dropdown.Item eventKey={'showAll'} className='gray800-14'>
																	Show all resources ({relatedResourcesSort.length})
																</Dropdown.Item>
															</Col>
															<div className='p-0 sortingCheckmark'>
																{sorting === 'showAll' ? (
																	<SVGIcon
																		name='check'
																		width={20}
																		height={20}
																		visble='true'
																		style={{
																			float: 'right',
																			fill: '#3db28c',
																			marginTop: '5px',
																		}}
																		fill={'#3db28c'}
																		stroke='none'
																	/>
																) : null}
															</div>
														</Row>
														{['dataset', 'tool', 'paper', 'course', 'person'].map(item => {
															return relatedResourcesSort.filter(dat => dat.objectType === item).length > 0 ? (
																<Row
																	key={`ddl-item-${item}`}
																	className={
																		sorting === item
																			? 'sort-dropdown-item sort-dropdown-item-selected sortingDropdown'
																			: 'sort-dropdown-item sortingDropdown'
																	}>
																	<Col xs={12} className='p-0'>
																		<Dropdown.Item eventKey={item} className='gray800-14'>
																			Show {item === 'people' ? item : `${item}s`} (
																			{relatedResourcesSort.filter(dat => dat.objectType === item).length})
																		</Dropdown.Item>
																	</Col>
																	<div className='p-0 sortingCheckmark'>
																		{sorting === item ? (
																			<SVGIcon
																				name='check'
																				width={20}
																				height={20}
																				visble='true'
																				style={{
																					float: 'right',
																					fill: '#3db28c',
																					marginTop: '5px',
																				}}
																				fill={'#3db28c'}
																				stroke='none'
																			/>
																		) : null}
																	</div>
																</Row>
															) : (
																''
															);
														})}
													</Dropdown.Menu>
												</Dropdown>
											</Col>
										</Row>
										{relatedObjects.length <= 0 ? (
											<NotFound word='related resources' />
										) : (
											relatedObjects
												.filter(object => object.objectType !== 'dataset')
												.map(object => (
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
								</Tabs>
							</div>
						</Col>
						<Col sm={1} lg={1} />
					</Row>
				</Container>

				<SideDrawer open={showDrawer} closed={toggleDrawer}>
					<UserMessages userState={userState[0]} closed={toggleDrawer} toggleModal={toggleModal} drawerIsOpen={showDrawer} />
				</SideDrawer>

				<DataSetModal open={showModal} closed={toggleModal} context={context} userState={userState[0]} />

				<ActionBar userState={props.userState}>
					<div className='action-bar-actions'>
						<CohortActionButtons
							allowedNavigation={true}
							id={cohortData.id}
							bcpLink={cohortData.cohort.query_url}
							disabled={cohortData.activeflag !== 'active'}
						/>
					</div>
				</ActionBar>
			</div>
		</Sentry.ErrorBoundary>
	);
};

export default CohortPage;
