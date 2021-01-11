import React, { Fragment } from 'react';
import DarHelper from '../../../../utils/DarHelper.util';
import '../../DataAccessRequest.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import { Row } from 'react-bootstrap';

const CustodianActionButtons = ({
	activeParty = '',
	allowedNavigation = false,
	inReviewMode,
	onNextClick,
	onActionClick,
	applicationStatus,
	roles,
	workflowEnabled = false,
	workflowAssigned,
	onWorkflowReview,
	hasRecommended = false,
	unansweredAmendments = 0,
	onUpdateRequest,
	onWorkflowReviewDecisionClick,
}) => {
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<a
			href=''
			ref={ref}
			onClick={e => {
				e.preventDefault();
				onClick(e);
			}}>
			{children}
		</a>
  ));
  
	const showRecommendationDropdown =
		unansweredAmendments === 0 &&
		applicationStatus === DarHelper.darStatus.inReview &&
		((inReviewMode && !hasRecommended) || roles.includes('manager'));

	const showViewRecommendations = applicationStatus === DarHelper.darStatus.inReview && workflowAssigned;

	const showAssignWorkflow =
		unansweredAmendments === 0 &&
		applicationStatus === DarHelper.darStatus.inReview &&
		roles.includes('manager') &&
		workflowEnabled &&
		!workflowAssigned;

	const showSendUpdateRequest =
		applicationStatus === DarHelper.darStatus.inReview &&
		activeParty === 'custodian' &&
		roles.includes('manager') &&
		unansweredAmendments > 0;

	return (
		<Fragment>
			{showViewRecommendations && (
				<button className='button-tertiary mr-1' onClick={e => onWorkflowReview(e)}>
					View recommendations
				</button>
			)}

			{showRecommendationDropdown && (
				<Dropdown>
					<Dropdown.Toggle as={CustomToggle}>
						<button className='button-secondary'>Make a decision</button>
					</Dropdown.Toggle>
					<Dropdown.Menu className='makeADecisionDropdown'>
						{inReviewMode && !hasRecommended && workflowAssigned && (
							<div className='review-phase'>
								<Row className='makeADecisionHeader'>
									<span className='gray800-14-bold mb-1'>Review this phase</span>
								</Row>
								<div className='gray800-14 pointer option' onClick={e => onWorkflowReviewDecisionClick(false)}>
									Issues found
								</div>
								<div className='gray800-14 pointer option' onClick={e => onWorkflowReviewDecisionClick(true)}>
									No issues found
								</div>
							</div>
						)}
						{roles.includes('manager') && (
							<Fragment>
								<Row className='makeADecisionHeader'>
									<span className='gray800-14-bold'>Final application decision</span>
									<br />
									<span className='gray700-13 mb-2'>This will end the review process and send a final response to the applicant</span>
								</Row>
								<div className='gray800-14 pointer option' onClick={e => onActionClick('Approve')}>
									Approve
								</div>
								<div className='gray800-14 pointer option' onClick={e => onActionClick('ApproveWithConditions')}>
									Approve with conditions
								</div>
								<div className='gray800-14 pointer option' onClick={e => onActionClick('Reject')}>
									Reject
								</div>
							</Fragment>
						)}
					</Dropdown.Menu>
				</Dropdown>
			)}

			{showAssignWorkflow && (
				<button className='button-secondary' onClick={e => onActionClick('AssignWorkflow')}>
					Assign a workflow
				</button>
			)}

			{showSendUpdateRequest && (
				<button className='button-secondary' onClick={e => onUpdateRequest(e)} value='SendUpdateRequest'>
					Send update request
				</button>
			)}

			<button className={`button-primary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onNextClick()}>
				Next
			</button>
		</Fragment>
	);
};

export default CustodianActionButtons;
