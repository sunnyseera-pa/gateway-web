import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../../../configs/url.config';
import DarHelperUtil from '../../../../utils/DarHelper.util';
//import VersionSelector from '../../../commonComponents/versionSelector/VersionSelector';
import SLA from '../../../commonComponents/sla/SLA';
import { Row, Col } from 'react-bootstrap';
import AccessActivity from '../../../dashboard/DataAccessRequests/AccessActivity/AccessActivity';
import WorkflowReviewStepsModal from '../../../commonComponents/workflowReviewStepsModal/WorkflowReviewStepsModal';
import _ from 'lodash';
import './ActivityLog.scss';
import moment from 'moment';
import { ReactComponent as VersionCreated } from '../../../../images/Versions_created.svg';
import { ReactComponent as VersionAccepted } from '../../../../images/check.svg';
import { ReactComponent as ApplicationRejected } from '../../../../images/Application_rejected.svg';
import { ReactComponent as Workflow } from '../../../../images/Workflows.svg';
import { ReactComponent as Collaborators } from '../../../../images/Collaborators.svg';
import { ReactComponent as UpdateRequested } from '../../../../images/Updates_requested.svg';
import { ReactComponent as ActionRequired } from '../../../../images/Action_required.svg';
import { ReactComponent as Clock } from '../../../../images/clock.svg';
import SVGIcon from '../../../../images/SVGIcon';
import { SlideDown } from 'react-slidedown';

const ActivityLog = ({ userState, dataaccessrequest, team, navigateToLocation }) => {
	const durationLookups = ['inProgress', 'submitted', 'inReview'];
	const finalDurationLookups = ['rejected', 'approved', 'approved with conditions'];
	const [showWorkflowReviewModal, setShowWorkflowReviewModal] = useState(false);
	const [activityLogs, setActivityLogs] = useState([]);
	const [detailsOpened, setDetailsOpened] = useState([]);

	useEffect(() => {
		const getActivityLogs = async () => {
			const versionIds = (Object.values(dataaccessrequest.versionTree) || []).map(version => {
				return version.iterationId ? version.iterationId : version.applicationId;
			});

			const type = 'data_request';

			const response = await axios.post(`${baseURL}/api/v2/activitylog`, {
				versionIds,
				type,
			});

			const { logs = [] } = response.data;
			setActivityLogs(logs);
		};
		getActivityLogs();
		setDetailsOpened([]);
	}, [dataaccessrequest]);

	const createMarkup = htmlString => {
		return { __html: htmlString };
	};

	const toggleWorkflowReviewModal = e => {
		setShowWorkflowReviewModal(prevState => {
			return {
				showWorkflowReviewModal: !prevState.showWorkflowReviewModal,
			};
		});
	};

	const renderDuration = (applicationStatus, dateSubmitted, applicationType, version, team = {}, timeWithApplicants) => {
		let { createdAt, decisionDuration = 0 } = version;
		let diff = 0;
		if (durationLookups.includes(applicationStatus)) {
			if (applicationStatus === DarHelperUtil.darStatus.inProgress) {
				diff = calculateTimeDifference(createdAt);
				return (
					<div className='time'>
						<Clock />
						<b>{diff} days</b>&nbsp;since start | {timeWithApplicants} spent with applicants{' '}
					</div>
				);
			}
			if (applicationStatus === DarHelperUtil.darStatus.submitted) {
				diff = calculateTimeDifference(dateSubmitted);
				return (
					<div className='time'>
						<Clock />
						<b>{diff} days </b>&nbsp;since submission | {timeWithApplicants} spent with applicants{' '}
					</div>
				);
			}

			if (applicationStatus === DarHelperUtil.darStatus.inReview && applicationType === DarHelperUtil.darApplicationTypes.amendment) {
				diff = calculateTimeDifference(dateSubmitted);
				return (
					<div className='time'>
						<Clock />
						<b>{diff} days</b>&nbsp;since resubmission | {timeWithApplicants} spent with applicants{' '}
					</div>
				);
			}
		}
		if (finalDurationLookups.includes(applicationStatus) && team) {
			if (!_.isEmpty(decisionDuration.toString())) {
				return (
					<div className='time'>
						<Clock />
						<b>{decisionDuration} days </b>&nbsp;total | {timeWithApplicants} spent with applicants{' '}
					</div>
				);
			}
		}
		return '';
	};

	const calculateTimeDifference = startTime => {
		let start = moment(startTime);
		let end = moment();
		return end.diff(start, 'days');
	};

	const toggleSection = (key, index) => {
		const newArray = detailsOpened.includes(key + index)
			? detailsOpened.filter(detail => detail !== key + index)
			: [...detailsOpened, key + index];

		setDetailsOpened(newArray);
		console.log(newArray);
	};

	const isToday = someDate => {
		const today = new Date();
		return (
			someDate.getDate() == today.getDate() && someDate.getMonth() == today.getMonth() && someDate.getFullYear() == today.getFullYear()
		);
	};

	let {
		datasets = [],
		updatedAt,
		applicants = '',
		publisher = '',
		dateSubmitted = new Date(),
		applicationStatus,
		projectName = '',
		workflow = {},
		workflowName = '',
		workflowCompleted = false,
		reviewStatus = '',
		deadlinePassed = false,
		decisionStatus = '',
		decisionMade = false,
		isReviewer = false,
		stepName = '',
		remainingActioners = [],
		_id,
		amendmentStatus = '',
		applicationType = 'initial',
	} = dataaccessrequest;

	return (
		<>
			<Row>
				<Col xs={1}></Col>
				<Col>
					<div className='col-md-12'>
						<div className='layoutCard'>
							<div className='header-version'>
								<div className='header-version-title'>
									<h1>{projectName}</h1>
								</div>
								<div className='header-version-status'>
									{applicationType === DarHelperUtil.darApplicationTypes.amendment &&
									applicationStatus !== DarHelperUtil.darStatus.approved &&
									applicationStatus !== DarHelperUtil.darStatus['approved with conditions'] &&
									applicationStatus !== DarHelperUtil.darStatus.rejected ? (
										<>
											<SLA
												classProperty={DarHelperUtil.darStatusColours[applicationStatus]}
												text={applicationStatus === DarHelperUtil.darStatus.inProgress ? 'Pre-submission amendment' : 'Amendment in review'}
											/>
											<SLA classProperty={DarHelperUtil.darStatusColours['approved']} text={DarHelperUtil.darSLAText['approved']} />
										</>
									) : (
										<SLA
											classProperty={DarHelperUtil.darStatusColours[applicationStatus]}
											text={DarHelperUtil.darSLAText[applicationStatus]}
											applicationType={applicationType}
										/>
									)}
								</div>
							</div>
							<div className='body'>
								<AccessActivity
									datasets={datasets}
									applicationStatus={applicationStatus}
									publisher={publisher}
									updatedAt={updatedAt}
									applicants={applicants}
									dateSubmitted={dateSubmitted}
									team={team}
									workflow={workflow}
									workflowName={workflowName}
									workflowCompleted={workflowCompleted}
									reviewStatus={reviewStatus}
									deadlinePassed={deadlinePassed}
									decisionStatus={decisionStatus}
									decisionMade={decisionMade}
									isReviewer={isReviewer}
									stepName={stepName}
									remainingActioners={remainingActioners}
									navigateToLocation={navigateToLocation}
									applicationId={_id}
									amendmentStatus={amendmentStatus}
									isStartReviewEnabled={false}
								/>
							</div>
						</div>
					</div>
				</Col>

				<Col xs={1}></Col>
			</Row>
			<Row>
				{/* This is a loose integration designed to prove the API is responding as expected only
				
					Note:- Assume that presubmission messages from designs will appear in the last version in the array here
					Advise taking the below and refactoring into an individual activity log version card to group events
					then using additional sub-components for each event type based on UI design/requirements 
				*/}
				<Col xs={1}></Col>
				<Col>
					{activityLogs.map(version => {
						const {
							version: versionNumber,
							meta: { dateSubmitted, applicationType, applicationStatus, timeWithApplicants },
							events = [],
						} = version;

						const groupedByDateEvents = _.groupBy(events, e => moment(e.timestamp).format('D MMMM YYYY'));
						const keys = Object.keys(groupedByDateEvents);
						const values = Object.values(groupedByDateEvents);

						return (
							<div className='col-md-12'>
								<div className={applicationType === 'Update' ? 'layoutCard layoutCardUpdates' : 'layoutCard'}>
									<div className='header-version'>
										<div className='header-version-title'>
											<div className='header-version-number'>
												<h1>
													{applicationType === DarHelperUtil.darApplicationTypes.initial
														? versionNumber
														: versionNumber + ' | ' + _.startCase(applicationType)}
												</h1>
											</div>
											<div className='time'>Submitted {dateSubmitted}</div>
										</div>
										<div className='header-version-status activity-log-version-status'>
											{renderDuration(applicationStatus, dateSubmitted, applicationType, version, team, timeWithApplicants)}

											{
												<SLA
													classProperty={DarHelperUtil.darStatusColours[applicationStatus]}
													text={DarHelperUtil.darSLAText[applicationStatus]}
													applicationType={applicationType}
												/>
											}
										</div>
									</div>

									<div className='version-log-body'>
										{keys.map((key, index) => {
											const logs = values[index];
											return (
												<div className='activity-log-item'>
													<div className='activity-log-key'> {isToday(new Date(key)) ? 'Today' : key}</div>
													{logs.map((log, index) => {
														return (
															<div>
																<div className='activity-log' key={`step-${index}`} onClick={e => toggleSection(versionNumber, index)}>
																	<div className='activity-log-icon'>
																		{log.eventType === 'applicationApproved' ||
																		log.eventType === 'applicationApprovedWithConditions' ||
																		log.eventType === 'updateSubmitted' ? (
																			<VersionAccepted className='versionAccepted' />
																		) : (
																			''
																		)}
																		{log.eventType === 'updatesSubmitted' ||
																		log.eventType === 'amendmentSubmitted' ||
																		log.eventType === 'applicationSubmitted' ? (
																			<VersionCreated className='versionCreated' />
																		) : (
																			''
																		)}
																		{log.eventType === 'applicationRejected' ? <ApplicationRejected className='versionCreated' /> : ''}
																		{log.eventType === 'finalDecisionRequired' || log.eventType === 'deadlinePassed' ? (
																			<ActionRequired className='versionCreated' />
																		) : (
																			''
																		)}
																		{log.eventType === 'reviewProcessStarted' ||
																		log.eventType === 'workflowAssigned' ||
																		log.eventType === 'reviewPhaseStarted' ||
																		log.eventType === 'reccomendationWithIssue' ||
																		log.eventType === 'reccomendationWithNoIssue' ? (
																			<Workflow className='versionCreated' />
																		) : (
																			''
																		)}
																		{log.eventType === 'collaboratorAdded' || log.eventType === 'collaboratorRemoved' ? (
																			<Collaborators className='versionCreated' />
																		) : (
																			''
																		)}
																		{log.eventType === 'updateRequested' ? <UpdateRequested className='versionCreated' /> : ''}
																	</div>
																	<div className='activity-log-time'>{moment(log.timestamp).format('HH:mm')}</div>{' '}
																	<div className='activity-log-text'>
																		<div className='gray800-14' dangerouslySetInnerHTML={createMarkup(log.html)} />{' '}
																	</div>
																	{log.detailedHtml ? (
																		<div className='activity-log-arrow'>
																			<SVGIcon
																				name='chevronbottom'
																				width={16}
																				height={16}
																				fill={'#3c4e8c'}
																				className={!detailsOpened.includes(versionNumber + index) ? '' : 'flip180'}
																			/>
																		</div>
																	) : (
																		''
																	)}
																</div>
																{log.detailedHtml ? (
																	<SlideDown closed={!detailsOpened.includes(versionNumber + index)}>
																		<div className='activity-log-details' dangerouslySetInnerHTML={createMarkup(log.detailedHtml)} />
																	</SlideDown>
																) : (
																	''
																)}
															</div>
														);
													})}
												</div>
											);
										})}
									</div>
									{applicationType === 'Update' ? (
										<div className='version-submitted'>
											<div className='line' />
											<div className='text'>{versionNumber} Submitted</div>
											<div className='line' />
										</div>
									) : (
										''
									)}
								</div>
							</div>
						);
					})}
				</Col>
				<Col xs={1}></Col>
			</Row>
			<WorkflowReviewStepsModal open={showWorkflowReviewModal} close={toggleWorkflowReviewModal} workflow={workflow} />​
		</>
	);
};

export default ActivityLog;
