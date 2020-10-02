import React, { Fragment } from 'react';
import '../../DataAccessRequest.scss'; 

const CustodianActionButtons = ({allowedNavigation = false, onNextClick, onActionClick, workflowEnabled = false}) => {
  return (
    <Fragment>
      { workflowEnabled ? <button className={`button-secondary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onActionClick(e)} value="AssignWorkflow">Assign Workflow</button> : null }
      <button className={`button-secondary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onActionClick(e)} value="Reject">Reject</button>
      <button className={`button-secondary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onActionClick(e)} value="Approve">Approve</button>
      <button className={`button-secondary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onActionClick(e)} value="ApproveWithConditions">Approve with conditions</button>
      <button className={`button-primary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onNextClick()}>Next</button>
    </Fragment>
  );
}

export default CustodianActionButtons;