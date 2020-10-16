import React, { Fragment } from 'react';
import '../../DataAccessRequest.scss';  
import Dropdown from 'react-bootstrap/Dropdown';
import DARHelperUtil from '../../../../utils/DarHelper.util';
import { Row } from "react-bootstrap";

const CustodianActionButtons = ({
  allowedNavigation = false, 
  inReviewMode, 
  onNextClick, 
  onActionClick, 
  applicationStatus, 
  roles, 
  workflowEnabled = false,
  workflowAssigned, 
  onWorkflowReview, 
  onWorkflowReviewDecisionClick}) => {

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="" ref={ref} onClick={e => { e.preventDefault(); onClick(e); }} >
      {children}
    </a> 
  ));

  return (
    <Fragment>
      {inReviewMode || (workflowAssigned && roles.includes('manager')) ?
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} >
            <button className={applicationStatus==="submitted" ? "dark-14" : "button-secondary"} >
              Make a decision
            </button>
          </Dropdown.Toggle>

            <Dropdown.Menu className="makeADecisionDropdown">  
              { inReviewMode ?
                <div className="review-phase">
                  <Row className="makeADecisionHeader"> 
                    <span className="gray800-14-bold mb-1">
                      Review this phase
                    </span> 
                  </Row>
                  <option className="gray800-14 pointer" onClick={e => onWorkflowReviewDecisionClick('Issues found')}> 
                    Issues found 
                  </option>
                  <option className="gray800-14 pointer" onClick={e => onWorkflowReviewDecisionClick('No issues found')}> 
                    No issues found 
                  </option> 
                </div>
              : '' }

              { roles.includes('manager') ?
                <Fragment>
                  <Row className="makeADecisionHeader"> 
                    <span className="gray800-14-bold">
                      Final application decision 
                    </span> 
                    <br/>
                    <span className="gray700-13 mb-2">
                      This will end the review process and send a final response to the applicant
                    </span>
                  </Row>
                    <option className="gray800-14 pointer" onClick={e => onActionClick(e)} value="Approve"> 
                      Approve
                    </option>

                    <option className="gray800-14 pointer" onClick={e => onActionClick(e)} value="ApproveWithConditions"> 
                      Approve with conditions
                    </option>

                    <option className="gray800-14 pointer" onClick={e => onActionClick(e)} value="Reject" >  
                        Reject
                    </option>
                </Fragment>
                : '' }
            </Dropdown.Menu>
          </Dropdown>
        : ''}
      
      { applicationStatus === "inReview" && workflowAssigned ? 
          <button className="button-secondary mr-1" onClick={e => onWorkflowReview(e)}>View decisions</button> 
        : ''}
      { applicationStatus === "inReview" && roles.includes('manager') && workflowEnabled && !workflowAssigned ? 
        <button className="button-secondary" onClick={e => onActionClick(e)} value="AssignWorkflow">Assign a workflow</button> 
      : ''}
      <button className={`button-primary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onNextClick()}>Next</button>      
    </Fragment>  
  );
}

export default CustodianActionButtons;