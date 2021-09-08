import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Row, Col, Tabs, Tab, DropdownButton, Dropdown, Alert } from 'react-bootstrap';
import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading';
import './Dashboard.scss';
import { EntityActionButton } from './EntityActionButton.jsx';
import { PaginationHelper } from '../commonComponents/PaginationHelper';

const baseURL = require('../commonComponents/BaseURL').getURL();
const urlEnv = require('../commonComponents/BaseURL').getURLEnv();

const AccountCohorts = props => {
	const [key, setKey] = useState('active');
	const [cohortsList, setCohortsList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [activeCount, setActiveCount] = useState(0);
	const [archiveCount, setArchiveCount] = useState(0);
	const [draftCount, setDraftCount] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0);
	const [archiveIndex, setArchiveIndex] = useState(0);
	const [draftIndex, setDraftIndex] = useState(0);
	const [isResultsLoading, setIsResultsLoading] = useState(true);
	const [cohortSaved, setCohortSaved] = useState(false);
	const [bcpBaseUrl, setBcpBaseUrl] = useState('');
	const [userState] = useState(props.userState[0]);
	const maxResult = 40;

	useEffect(() => {
		setCohortSaved(props.cohortSaved);
		doCohortsCall('active', true, 0, true);
		urlEnv === 'prod'
			? setBcpBaseUrl('https://rquest.prod.healthdatagateway.org/bcrquest/')
			: setBcpBaseUrl('https://rquest.test.healthdatagateway.org/bcrquest/');
	}, []);

	const handleSelect = key => {
		setKey(key);

		let index;
		if (key === 'active') {
			index = activeIndex;
		} else if (key === 'archive') {
			index = archiveIndex;
		} else if (key === 'draft') {
			index = draftIndex;
		}

		doCohortsCall(key, false, index);
	};

	const doCohortsCall = (key, updateCounts, index, firstLoad) => {
		let page = index / maxResult + 1;

		if (firstLoad === true) {
			setIsLoading(true);
		}
		setIsResultsLoading(true);

		let apiUrl;
		if (typeof index === 'undefined') {
			apiUrl = baseURL + `/api/v1/cohorts?activeflag=${key}`;
		} else {
			userState.role === 'Admin'
				? (apiUrl = baseURL + `/api/v1/cohorts?activeflag=${key}&page=${page}&limit=${maxResult}`)
				: (apiUrl = baseURL + `/api/v1/cohorts?activeflag=${key}&page=${page}&limit=${maxResult}&uploaders=${userState.id}`);
		}

		axios.get(apiUrl).then(async res => {
			setCohortsList(res.data.data);

			if (updateCounts === true) {
				let getActiveCountUrl =
					userState.role === 'Admin'
						? `${baseURL}/api/v1/cohorts?activeflag=active&count=true`
						: `${baseURL}/api/v1/cohorts?activeflag=active&uploaders=${userState.id}&count=true`;
				let getArchiveCountUrl =
					userState.role === 'Admin'
						? `${baseURL}/api/v1/cohorts?activeflag=archive&count=true`
						: `${baseURL}/api/v1/cohorts?activeflag=archive&uploaders=${userState.id}&count=true`;
				let getDraftCountUrl =
					userState.role === 'Admin'
						? `${baseURL}/api/v1/cohorts?activeflag=draft&count=true`
						: `${baseURL}/api/v1/cohorts?activeflag=draft&uploaders=${userState.id}&count=true`;

				await axios.get(getActiveCountUrl).then(res => {
					setActiveCount(res.data.data);
				});
				await axios.get(getArchiveCountUrl).then(res => {
					setArchiveCount(res.data.data);
				});
				await axios.get(getDraftCountUrl).then(res => {
					setDraftCount(res.data.data);
				});
			}

			if (firstLoad === true) {
				setIsLoading(false);
			}
			setIsResultsLoading(false);
		});
		window.scrollTo(0, 0);
	};

	const archiveCohort = id => {
		// axios
		// 	.put(baseURL + '/api/v1/cohort/status/' + id, {
		// 		activeflag: 'archive',
		// 	})
		// 	.then(res => {
		// 		setKey('active');
		// 		if (activeCount - (activeIndex + maxResult) <= 0 && activeCount % maxResult === 1 && activeCount !== 1) {
		// 			setActiveIndex(activeIndex - maxResult);
		// 			doCohortsCall(key, true, activeIndex - maxResult);
		// 		} else {
		// 			doCohortsCall('active', true, activeIndex);
		// 		}
		// 	});
	};

	const unarchiveCohort = id => {
		// axios
		// 	.put(baseURL + '/api/v1/cohort/status/' + iid, {
		// 		activeflag: 'active',
		// 	})
		// 	.then(res => {
		// 		if (shouldChangeTab()) {
		// 			setKey('active');
		// 			doCohortsCall('active', true, activeIndex);
		// 		} else if (archiveCount - (archiveIndex + maxResult) <= 0 && archiveCount % maxResult === 1 && archiveCount !== 1) {
		// 			setArchiveIndex(archiveIndex - maxResult);
		// 			doCohortsCall(key, true, archiveIndex - maxResult);
		// 		} else {
		// 			doCohortsCall('archive', true, archiveIndex);
		// 		}
		// 	});
	};

	// const shouldChangeTab = () => {
	// 	return key === 'archive' && archiveCount <= 1 ? true : false;
	// };

	const getHeadings = () => {
		return (
			<Row className='subHeader mt-3 gray800-14-bold'>
				<Col xs={2}>Last updated</Col>
				<Col xs={5}>Name</Col>
				<Col xs={2}>Latest version</Col>
				<Col xs={3}></Col>
			</Row>
		);
	};

	const getNotFound = key => {
		let word = '';
		switch (key) {
			case 'active':
				word = 'saved';
				break;
			case 'archive':
				word = 'archived';
				break;
			case 'draft':
				word = 'draft';
				break;
		}

		return (
			<Row className='margin-right-15' data-testid='cohortEntryNotFound'>
				<NotFound
					text={`There aren’t any ${word} cohorts. Cohorts are definitions for groups of patients. For instance, Women Over 65 with Diabetes.`}
				/>
			</Row>
		);
	};

	const getCohortResultsCards = (key, cohort) => {
		let testId = '';
		switch (key) {
			case 'active':
				testId = 'cohortEntryActive';
				break;
			case 'archive':
				testId = 'cohortEntryArchive';
				break;
			case 'draft':
				testId = 'cohortEntryDraft';
				break;
		}

		return (
			<>
				<Row className='entryBox' data-testid={testId}>
					<Col sm={12} lg={2} className='pt-2 gray800-14'>
						{moment(cohort.updatedAt).format('D MMMM YYYY HH:mm')}
					</Col>
					<Col sm={12} lg={5} className='pt-2'>
						{key === 'draft' ? (
							<span className='black-14'>{cohort.name}</span>
						) : (
							<a href={'/cohort/' + cohort.id} className='black-14'>
								{cohort.name}
							</a>
						)}
					</Col>
					<Col sm={12} lg={2} className='pt-2 gray800-14'>
						{cohort.version}
					</Col>
					<Col sm={12} lg={3} style={{ textAlign: 'right' }} className='toolsButtons'>
						<DropdownButton variant='outline-secondary' alignRight title='Actions' className='floatRight'>
							{(key === 'active' || key === 'archive') && (
								<Dropdown.Item href={'/cohort/' + cohort.id} className='black-14'>
									View
								</Dropdown.Item>
							)}
							{(key === 'active' || key === 'draft') && (
								<Dropdown.Item href={'/cohort/edit/' + cohort.id} className='black-14'>
									New version: edit metadata
								</Dropdown.Item>
							)}
							{/* bcpLink will be updated to cohort.query_url or cohort.cohort.query_url */}
							{key === 'active' && <EntityActionButton id={cohort.id} bcpLink={bcpBaseUrl} actionType='editCriteria' entity='cohort' />}
							{key === 'active' && <EntityActionButton id={cohort.id} action={archiveCohort} actionType='archive' entity='cohort' />}
							{key === 'archive' && <EntityActionButton id={cohort.id} action={unarchiveCohort} actionType='unarchive' entity='cohort' />}
						</DropdownButton>
					</Col>
				</Row>
			</>
		);
	};

	if (isLoading) {
		return (
			<Row className='mt-4'>
				<Col xs={1}></Col>
				<Col xs={10}>
					<Loading data-testid='isLoading' />
				</Col>
				<Col xs={1}></Col>
			</Row>
		);
	}

	return (
		<div>
			{cohortSaved === 'true' ? (
				<Row>
					<Col sm={1} lg={1} />
					<Col sm={10} lg={10} className='pad-left-0'>
						<Alert data-test-id='collection-added-banner' variant='success' className='mb-3'>
							Your cohort /COHORT NAME/ has been saved
						</Alert>
					</Col>
					<Col sm={1} lg={10} />
				</Row>
			) : (
				''
			)}
			<Row>
				<Col xs={1}></Col>
				<Col xs={10}>
					<Row className='accountHeader'>
						<Col sm={12}>
							<Row>
								<span className='black-20'>Cohorts</span>
							</Row>
							<Row>
								<span className='gray700-13 '>View, edit and create new versions of your cohorts</span>
							</Row>
						</Col>
					</Row>

					<Row className='tabsBackground'>
						<Col sm={12} lg={12}>
							<Tabs data-testid='cohortTabs' className='dataAccessTabs gray700-13' activeKey={key} onSelect={handleSelect}>
								<Tab eventKey='active' title={'Active (' + activeCount + ')'}>
									{' '}
								</Tab>
								<Tab eventKey='draft' title={'Draft (' + draftCount + ')'}>
									{' '}
								</Tab>
								<Tab eventKey='archive' title={'Archived (' + archiveCount + ')'}>
									{' '}
								</Tab>
							</Tabs>
						</Col>
					</Row>

					{isResultsLoading && (
						<Row className='width-100'>
							<Col xs={12} className='noPadding'>
								<Loading />
							</Col>
						</Row>
					)}

					{!isResultsLoading &&
						(() => {
							switch (key) {
								case 'active':
									return (
										<div>
											{activeCount <= 0 ? '' : getHeadings()}

											{activeCount <= 0
												? getNotFound(key)
												: cohortsList.map(cohort => {
														if (cohort.activeflag !== 'active') {
															return <></>;
														} else {
															return <>{getCohortResultsCards(key, cohort)}</>;
														}
												  })}
										</div>
									);
								case 'draft':
									return (
										<div>
											{draftCount <= 0 ? '' : getHeadings()}

											{draftCount <= 0
												? getNotFound(key)
												: cohortsList.map(cohort => {
														if (cohort.activeflag !== 'draft') {
															return <></>;
														} else {
															return <>{getCohortResultsCards(key, cohort)} </>;
														}
												  })}
										</div>
									);
								case 'archive':
									return (
										<div>
											{archiveCount <= 0 ? '' : getHeadings()}

											{archiveCount <= 0
												? getNotFound(key)
												: cohortsList.map(cohort => {
														if (cohort.activeflag !== 'archive') {
															return <></>;
														} else {
															return <>{getCohortResultsCards(key, cohort)}</>;
														}
												  })}
										</div>
									);
							}
						})()}

					{!isResultsLoading && (
						<div className='text-center entityDashboardPagination'>
							{key === 'active' && activeCount > maxResult ? (
								<PaginationHelper
									doEntitiesCall={doCohortsCall}
									entityCount={activeCount}
									statusKey={key}
									paginationIndex={activeIndex}
									setPaginationIndex={setActiveIndex}
									maxResult={maxResult}></PaginationHelper>
							) : (
								''
							)}
							{key === 'draft' && draftCount > maxResult ? (
								<PaginationHelper
									doEntitiesCall={doCohortsCall}
									entityCount={draftCount}
									statusKey={key}
									paginationIndex={draftIndex}
									setPaginationIndex={setDraftIndex}
									maxResult={maxResult}></PaginationHelper>
							) : (
								''
							)}
							{key === 'archive' && archiveCount > maxResult ? (
								<PaginationHelper
									doEntitiesCall={doCohortsCall}
									entityCount={archiveCount}
									statusKey={key}
									paginationIndex={archiveIndex}
									setPaginationIndex={setArchiveIndex}
									maxResult={maxResult}></PaginationHelper>
							) : (
								''
							)}
						</div>
					)}
				</Col>
				<Col xs={1}></Col>
			</Row>
		</div>
	);
};

export default AccountCohorts;
