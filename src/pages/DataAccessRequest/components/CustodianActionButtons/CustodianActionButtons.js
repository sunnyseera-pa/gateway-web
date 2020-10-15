import React, { Fragment } from 'react';
import '../../DataAccessRequest.scss';  
import Dropdown from 'react-bootstrap/Dropdown';
import { Row, Col, Button } from "react-bootstrap";

const CustodianActionButtons = ({allowedNavigation = false, onNextClick, onActionClick, applicationStatus, roles, workflowEnabled = false, workflowAssigned}) => {

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="" ref={ref} onClick={e => { e.preventDefault(); onClick(e); }} >
      {children}
    </a> 
  ));

  return (
    <Fragment>
      {applicationStatus==="inReview" && roles.includes('reviewer') || roles.includes('manager') ?
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} >
            <Button variant="medium" className={applicationStatus==="submitted" ? "buttonHeight40 dark-14 margin-right-8" : "button-secondary margin-right-8"} >
              Make a decision
            </Button>
          </Dropdown.Toggle>

            <Dropdown.Menu className="makeADecisionDropdown">  
            { roles.includes('reviewer') ?
              <>
                <Row className="makeADecisionHeader"> 
                  <span className="gray800-14-bold margin-bottom-8">
                    Review this phase
                  </span> 
                </Row>
                <option className="gray800-14 addToCollectionItem pointer noPadding"> 
                  Issues found 
                </option>
                <option className="gray800-14 addToCollectionItem pointer noPadding"> 
                  No issues found 
                </option> 
              </>
            : '' }

            { roles.includes('reviewer') && roles.includes('manager') ?
              <div className="makeADecisionLine" />
            : ''}

            { roles.includes('manager') ?
              <>
                <Row className="makeADecisionHeader"> 
                  <span className="gray800-14-bold">
                    Final application decision 
                  </span> 
                  <br/>
                  <span className="gray700-13 margin-bottom-12">
                    This will end the review process and send a final response to the applicant
                  </span>
                </Row>
                  <option className="gray800-14 addToCollectionItem pointer noPadding" onClick={e => onActionClick(e)} value="Approve"> 
                    Approve
                  </option>

                  <option className="gray800-14 addToCollectionItem pointer noPadding" onClick={e => onActionClick(e)} value="ApproveWithConditions"> 
                    Approve with conditions
                  </option>

                  <option className="gray800-14 addToCollectionItem pointer noPadding" onClick={e => onActionClick(e)} value="Reject" >  
                      Reject
                  </option>
              </>
              : '' }
            </Dropdown.Menu>
          </Dropdown>
        : ''}
      
      {applicationStatus==="inReview" && workflowAssigned ? 
          <button className="button-secondary mr-1" onClick={e => onWorkflowReview(e)}>View decisions</button> 
        : ''}
      { applicationStatus==="inReview" && roles.includes('manager') && workflowEnabled && !workflowAssigned ? 
        <button className="button-secondary" onClick={e => onActionClick(e)} value="AssignWorkflow">Assign a workflow</button> 
      : ''}
      <button className={`button-primary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onNextClick()}>Next</button>      
    </Fragment>  
  );
}

export default CustodianActionButtons;