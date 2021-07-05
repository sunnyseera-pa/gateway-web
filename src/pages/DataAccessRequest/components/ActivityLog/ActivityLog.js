import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../../../configs/url.config';
import DarHelperUtil from '../../../../utils/DarHelper.util';
//import VersionSelector from '../../../commonComponents/versionSelector/VersionSelector';
import SLA from '../../../commonComponents/sla/SLA';
import { Row, Col } from 'react-bootstrap';
import AccessActivity from '../../../dashboard/DataAccessRequests/AccessActivity/AccessActivity';
import WorkflowReviewStepsModal from '../../../commonComponents/workflowReviewStepsModal/WorkflowReviewStepsModal';
import _ from 'lodash';

const ActivityLog = ({ dataaccessrequest, team }) => {
	const [showWorkflowReviewModal, setShowWorkflowReviewModal] = useState(false);
	const [activityLogs, setActivityLogs] = useState([]);

	useEffect(() => {
		const getActivityLogs = async () => {
			const versionIds = (dataaccessrequest.versions || []).map(version => version._id);
			const type = 'data_request';

			const response = await axios.post(`${baseURL}/api/v2/activitylog`, {
				versionIds,
				type,
			});

			const { logs = [] } = response.data;
			setActivityLogs(logs);
		};
		getActivityLogs();
	}, [dataaccessrequest]);

	const createMarkup = (htmlString) => {
		return { __html: htmlString };
	}

	const toggleWorkflowReviewModal = e => {
		setShowWorkflowReviewModal(prevState => {
			return {
				showWorkflowReviewModal: !prevState.showWorkflowReviewModal,
			};
		});
	};

	const startWorkflowReview = async applicationId => {
		await axios
			.put(`${baseURL}/api/v1/data-access-request/${applicationId}/startreview`)
			.then(() => {
				window.location.href = `/data-access-request/${applicationId}`;
			})
			.catch(err => {
				console.error(err.message);
			});
	};

	const navigateToLocation = (e, applicationId) => {
		e.stopPropagation();

		let [id] = e.currentTarget.id.split('_');

		switch (id) {
			case 'workflow':
				if (!_.isEmpty(dataaccessrequest.workflow)) {
					toggleWorkflowReviewModal();
				}
				break;
			case 'startReview':
				startWorkflowReview(applicationId);
				break;
			default:
				break;
		}
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
		versions = [],
		applicationType = 'initial',
	} = dataaccessrequest;

	const selectedVersion = versions.find(v => v.isCurrent)?.displayTitle;

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
									{
										(applicationType =
											DarHelperUtil.darApplicationTypes.amendment &&
											applicationStatus !== DarHelperUtil.darStatus.approved &&
											applicationStatus !== DarHelperUtil.darStatus['approved with conditions'] &&
											applicationStatus !== DarHelperUtil.darStatus.rejected ? (
												<>
													<SLA
														classProperty={DarHelperUtil.darStatusColours[applicationStatus]}
														text={
															applicationStatus === DarHelperUtil.darStatus.inProgress ? 'Pre-submission amendment' : 'Amendment in review'
														}
													/>
													<SLA classProperty={DarHelperUtil.darStatusColours['approved']} text={DarHelperUtil.darSLAText['approved']} />
												</>
											) : (
												<SLA
													classProperty={DarHelperUtil.darStatusColours[applicationStatus]}
													text={DarHelperUtil.darSLAText[applicationStatus]}
													applicationType={applicationType}
												/>
											))
									}
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
									isStartReviewEnabled={true}
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
					<div className='col-md-12'>
						<div className='layoutCard'></div>
						{activityLogs.map(version => {
							const {
								version: versionNumber,
								meta: { dateSubmitted, daysSinceSubmission, applicationType, applicationStatus, timeWithApplicants },
								events = [],
							} = version;
							return (
								<div>
									<p>{versionNumber}</p>
									<p>Date Submitted {dateSubmitted}</p>
									<p>Days Since Submission {daysSinceSubmission}</p>
									<p>Application Type {applicationType}</p>
									<p>Application Status {applicationStatus}</p>
									<p>Time With Applicants {timeWithApplicants}</p>
									<p>
										{events.map(event => {
											return <p dangerouslySetInnerHTML={createMarkup(event.html)}></p>;
										})}
									</p>
								</div>
							);
						})}
					</div>
				</Col>
				<Col xs={1}></Col>
			</Row>
			<WorkflowReviewStepsModal open={showWorkflowReviewModal} close={toggleWorkflowReviewModal} workflow={workflow} />​
		</>
	);
};

export default ActivityLog;
