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
import ActivityLogVersionCard from './ActivityLogVersionCard';

const ActivityLog = ({ dataaccessrequest, team, navigateToLocation }) => {
	const [showWorkflowReviewModal, setShowWorkflowReviewModal] = useState(false);
	const [activityLogs, setActivityLogs] = useState([]);

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
	}, [dataaccessrequest]);

	const toggleWorkflowReviewModal = e => {
		setShowWorkflowReviewModal(prevState => {
			return {
				showWorkflowReviewModal: !prevState.showWorkflowReviewModal,
			};
		});
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
				<Col xs={1}></Col>
				<Col>
					{activityLogs.map(version => {
						return <ActivityLogVersionCard version={version} team={team} />;
					})}
				</Col>
				<Col xs={1}></Col>
			</Row>
			<WorkflowReviewStepsModal open={showWorkflowReviewModal} close={toggleWorkflowReviewModal} workflow={workflow} />​
		</>
	);
};

export default ActivityLog;
