import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import * as Sentry from '@sentry/react';
import { Container, Row, Col, Tabs, Tab, Alert, Button, Accordion } from 'react-bootstrap';
import RelatedObject from '../commonComponents/relatedObject/RelatedObject';
import NotFound from '../commonComponents/NotFound';
import SearchBar from '../commonComponents/searchBar/SearchBar';
import Loading from '../commonComponents/Loading';
import Uploader from '../commonComponents/Uploader';
import SVGIcon from '../../images/SVGIcon';
import DiscourseTopic from '../discourse/DiscourseTopic';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../commonComponents/userMessages/UserMessages';
import ActionBar from '../commonComponents/actionbar/ActionBar';
import ResourcePageButtons from '../commonComponents/resourcePageButtons/ResourcePageButtons';
import ErrorModal from '../commonComponents/errorModal/ErrorModal';
import CollectionCard from '../commonComponents/collectionCard/CollectionCard';
import DataSetModal from '../commonComponents/dataSetModal/DataSetModal';
import googleAnalytics from '../../tracking';
import CohortDiscoveryBanner from '../dataset/components/CohortDiscoveryBanner';

var baseURL = require('../commonComponents/BaseURL').getURL();

export const CohortPage = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [searchString, setSearchString] = useState('');
	const [showDrawer, setShowDrawer] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [context, setContext] = useState({});
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

	const toggleModal = (showEnquiry = false, context = {}) => {
		setShowModal(!showModal);
		setContext(context);
		setShowDrawer(showEnquiry);
	};

	const [flagClosed, setFlagClosed] = useState(true);

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
					<Row className=''>
						<Col sm={1} lg={1} />
						<Col sm={10} lg={10}>
							<Alert variant='warning' className='mt-3' data-test-id='project-pending-banner'>
								This is an old version of this cohort.
							</Alert>
						</Col>
					</Row>

					<Row className='mt-4'>
						<Col sm={1} lg={1} />
						<Col sm={10} lg={10}>
							<div className='rectangle'>
								<Row>
									<Col data-test-id='project-name' className='line-height-normal'>
										<span className='black-16'>Females with Asthma</span>
									</Col>
								</Row>
								<Row className='margin-top-16'>
									<Col xs={12}>
										<span className='badge-project'>
											<SVGIcon name='newestprojecticon' fill={'#472505'} className='badgeSvg mr-2' viewBox='-2 -2 22 22' />
											<span>Cohort</span>
										</span>
										<a href='/search?search=&tab=Projects&projectcategories='>
											<div className='badge-tag'>Female</div>
										</a>
										<a href='/search?search=&tab=Projects&projectcategories='>
											<div className='badge-tag'>Asthma</div>
										</a>
									</Col>
								</Row>

								<Row className='margin-top-20'>
									<Col xs={12} className='line-height-normal'>
										<span className='gray700-14'>1 view</span>
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
										googleAnalytics.recordEvent('Projects', `Clicked ${key} tab`, `Viewing ${key}`);
									}}>
									<Tab eventKey='About' title={'About'}>
										<Row className='mt-2'>
											<Col sm={12} lg={12}>
												<div className='rectangle'>
													<Row className='gray800-14-bold'>
														<Col sm={12}>Inclusion / exclusion criteria</Col>
													</Row>
													<Row className='mt-3'>
														<Col sm={12} className='gray800-14 hdruk-section-body' data-test-id='project-description'>
															<ReactMarkdown source='' />
														</Col>
													</Row>
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
														<Col sm={12} className='gray800-14 hdruk-section-body' data-test-id='project-results'>
															<ReactMarkdown source='Word Sense Disambiguation (WSD), the automatic identification of the meanings of ambiguous terms in a document, is an important stage in text processing. We describe a WSD system that has been developed specifically for the types of ambiguities found in biomedical documents. This system uses a range of knowledge sources. It employs both linguistic features, such as local collocations, and features derived from domain-specific knowledge sources, the Unified Medical Language System (UMLS) and Medical Subject Headings (MeSH). This system is applied to three types of ambiguities found in Medline abstracts: ambiguous terms, abbreviations with multiple expansions and names that are ambiguous between genes.' />
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
																			style={{ width: '18px', height: '18px', paddingLeft: '4px' }}
																			className={flagClosed === true ? 'svg-24' : 'svg-24 flipSVG'}
																		/>
																	</div>
																</Accordion.Toggle>
															</Col>
															<Col sm={10} data-test-id='link' className='gray800-14'>
																<div className='box'>
																	<Accordion.Collapse eventKey='0' style={{ paddingRight: '20px' }}>
																		<>
																			<>
																				<a
																					href='!#'
																					className='version-list'
																					onClick={e => {
																						e.stopPropagation();
																						window.location.href = `/dataset-onboarding/${1}`;
																					}}>
																					2.0 Additional phenotypes included
																				</a>
																			</>
																			<>
																				<a
																					href='!#'
																					className='version-list'
																					onClick={e => {
																						e.stopPropagation();
																						window.location.href = `/dataset-onboarding/${1}`;
																					}}>
																					1.3 Fixed typo on header
																				</a>
																			</>
																			<>
																				<a
																					href='!#'
																					className='version-list'
																					onClick={e => {
																						e.stopPropagation();
																						window.location.href = `/dataset-onboarding/${1}`;
																					}}>
																					1.2
																				</a>
																			</>
																			<>
																				<a
																					href='!#'
																					className='version-list'
																					onClick={e => {
																						e.stopPropagation();
																						window.location.href = `/dataset-onboarding/${1}`;
																					}}>
																					1.1 Added uploaders
																				</a>
																			</>
																			<>
																				<a
																					href='!#'
																					className='version-list'
																					onClick={e => {
																						e.stopPropagation();
																						window.location.href = `/dataset-onboarding/${1}`;
																					}}>
																					1.0
																				</a>
																			</>
																		</>
																	</Accordion.Collapse>
																</div>
															</Col>
														</Row>
													</Accordion>
													<Row className='mt-2'>
														<Col sm={2} className='gray800-14'>
															Uploaders
														</Col>
														<Col sm={10} className='gray800-14'>
															<span>
																<Uploader uploader={'Joan Admin'} />
															</span>
															<span>
																<Uploader uploader={'Tanika patel'} />
															</span>
														</Col>
													</Row>
												</div>
											</Col>
										</Row>
									</Tab>

									<Tab eventKey='Datasets' title='Datasets'>
										<>
											<NotFound text='This project appears on the collections below. A collection is a group of resources on the same theme.' />

											<Row>
												<Col sm={12} md={12} lg={6} className='flexCenter'>
													{/* <CollectionCard data={[]} /> */}
												</Col>
											</Row>
										</>
									</Tab>

									<Tab eventKey='Discussion' title='Discussions'>
										<DiscourseTopic toolId='' topicId='' userState={userState} onUpdateDiscoursePostCount='' />
									</Tab>
									<Tab eventKey='Related resources' title='Related resources'>
										{/* <RelatedObject
													relatedObject=''
													objectType=''
													activeLink={true}
													showRelationshipAnswer={true}
													datasetPublisher=''
													datasetLogo=''
												/> */}
									</Tab>
								</Tabs>
							</div>

							<CohortDiscoveryBanner userProps={' '} />
						</Col>
						<Col sm={1} lg={1} />
					</Row>
				</Container>

				{/* <SideDrawer open={showDrawer} closed={toggleDrawer}>
					<UserMessages userState={userState[0]} closed={toggleDrawer} toggleModal={toggleModal} drawerIsOpen={showDrawer} />
				</SideDrawer> */}

				{/* <ActionBar userState={userState}>
					<ResourcePageButtons data='' userState={userState} />
				</ActionBar> */}

				{/* <DataSetModal open={showModal} context={context} closed={toggleModal} userState={userState[0]} /> */}
			</div>
		</Sentry.ErrorBoundary>
	);
};

export default CohortPage;
