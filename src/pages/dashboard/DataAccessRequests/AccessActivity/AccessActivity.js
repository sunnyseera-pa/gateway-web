import React, {Fragment} from 'react';
import _ from 'lodash';
import moment from 'moment';
import SLA from '../../../commonComponents/sla/SLA';
import DarHelperUtil from '../../../../utils/DarHelper.util';
import { Button } from 'react-bootstrap';
import WorkflowDecision from '../../../commonComponents/workflowDecision/WorkflowDecision';

const AccessActivity = ({
  datasets = [], 
  updatedAt, 
  applicants = '',
  dateSubmitted = '', 
  team = '',
  publisher = '', 
  applicationStatus,
  navigateToLocation,
  workflow = {},
  workflowName = '',
  workflowCompleted = false,
  reviewStatus = '',
  deadlinePassed = false,
  decisionStatus = '',
  decisionMade = false,
  isReviewer = false,
  activeStepName = '',
  remainingActioners = [] }) =>{

  const setActivityMeta = () => {
	  let reviewDecision;
		// Determine return for Deadline or final decision and color
		if (workflowCompleted && applicationStatus === DarHelperUtil.darStatus.inReview) {
			reviewDecision = <WorkflowDecision text={reviewStatus} icon='flag' />
		} else if (deadlinePassed) {
			reviewDecision = <div className="box-deadline">{reviewStatus}</div>
		}

		if(isReviewer && deadlinePassed) {
			reviewDecision = <WorkflowDecision classProperty="box-deadline" text={reviewStatus} decisionText={decisionStatus} icon='flag' />
		} else if(isReviewer && !decisionMade) {
			reviewDecision = <WorkflowDecision text={reviewStatus} decisionText={decisionStatus} icon='flag' />
		}

		if(isReviewer && decisionMade) {
			return <WorkflowDecision decisionMade={decisionMade} decisionText={decisionStatus} icon='check' />
		}

		return reviewDecision;
	};

	const buildAccessRequest = () => {	
		const hasWorkflow = !_.isEmpty(workflowName) ? true : false;
		const isTeam = !_.isEmpty(team) ? true : false;
		return (
			<Fragment>
				<div className='box gray800-14'>Datasets</div>
				<div className='box'>
					{datasets.map((d, i) => {
						return <SLA key={i} classProperty='default' text={d.name} />;
					})}
				</div>
				<div className='box'>Custodian</div>
				<div className='box'>{publisher}</div>
				<div className='box'>Applicants</div>
				<div className='box'>{!_.isEmpty(applicants) ? applicants : "-"}</div>
				{hasWorkflow == true ? (
					<Fragment>
						<div className='box'>Workflow</div>
						<div
							id='workflow'
							className='box box-link'
							onClick={(e) => navigateToLocation(e)}
						>
							{!_.isEmpty(workflowName) ? workflowName : "-"}
							{!_.isEmpty(activeStepName) ? `| ${activeStepName}`: ""}
							{workflowCompleted ? ' complete' : ""}
						</div>
					</Fragment>
				) : (
					""
				)}
				{isTeam == true ? (
					<Fragment>
						<div className='box'>Action required by</div>
						<div className='box'>
							{!_.isEmpty(remainingActioners) ? (
								<Fragment>{remainingActioners}</Fragment>
							) : (
								"-"
							)}
						</div>
					</Fragment>
				) : (
					""
				)}
				<div className='box'>Submitted</div>
				<div className='box'>
					{!_.isEmpty(dateSubmitted)
						? moment(dateSubmitted).format("D MMMM YYYY HH:mm")
						: "-"}
				</div>
				<div className='box'>Last activity</div>
				<div className='box'>
					{moment(updatedAt).format("D MMMM YYYY HH:mm")}
					{isTeam == true ? (
						<Fragment>
							{applicationStatus === DarHelperUtil.darStatus.submitted ? (
								<button className='button-primary' onClick=''>Start Review</button>
							) : (
								setActivityMeta()
							)}
						</Fragment>
					) : (
						""
					)}
				</div>
			</Fragment>
		);
	};
  return (
    <Fragment>{buildAccessRequest()}</Fragment>
  )
}

export default AccessActivity;