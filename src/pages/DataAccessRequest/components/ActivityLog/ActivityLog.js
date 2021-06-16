import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { baseURL } from '../../../../configs/url.config';
import DarHelperUtil from '../../../../utils/DarHelper.util';
import VersionSelector from '../../../commonComponents/versionSelector/VersionSelector';
import SLA from '../../../commonComponents/sla/SLA';
import { Row, Col } from 'react-bootstrap';
import AccessActivity from '../../../dashboard/DataAccessRequests/AccessActivity/AccessActivity';
import WorkflowReviewStepsModal from '../../../commonComponents/workflowReviewStepsModal/WorkflowReviewStepsModal';
import _ from 'lodash';

class ActivityLog extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		showWorkflowReviewModal: false,
	};

	render() {
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
		} = this.props.dataaccessrequest;

		const selectedVersion = versions.find(v => v.isCurrent).displayTitle;

		return (
			<Fragment>
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
																applicationStatus === DarHelperUtil.darStatus.inProgress
																	? 'Pre-submission amendment'
																	: 'Amendment in review'
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
										team={this.props.team}
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
										navigateToLocation={this.navigateToLocation}
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
				<WorkflowReviewStepsModal open={this.state.showWorkflowReviewModal} close={this.toggleWorkflowReviewModal} workflow={workflow} />​
			</Fragment>
		);
	}

	toggleWorkflowReviewModal = e => {
		this.setState(prevState => {
			return {
				showWorkflowReviewModal: !prevState.showWorkflowReviewModal,
			};
		});
	};

	startWorkflowReview = async applicationId => {
		await axios
			.put(`${baseURL}/api/v1/data-access-request/${applicationId}/startreview`)
			.then(() => {
				window.location.href = `/data-access-request/${applicationId}`;
			})
			.catch(err => {
				console.error(err.message);
			});
	};

	navigateToLocation = (e, applicationId) => {
		e.stopPropagation();

		let [id] = e.currentTarget.id.split('_');

		switch (id) {
			case 'workflow':
				if (!_.isEmpty(this.props.dataaccessrequest.workflow)) {
					this.toggleWorkflowReviewModal();
				}
				break;
			case 'startReview':
				this.startWorkflowReview(applicationId);
				break;
			default:
				break;
		}
	};
}
export default ActivityLog;
