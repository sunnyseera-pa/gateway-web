import React, { Fragment } from 'react';
import '../../DataAccessRequest.scss'; 

const ApplicantActionButtons = ({allowedNavigation = false, onFormSubmit, onNextClick, onShowContributorModal}) => {
  return (
    <Fragment>
      <button className={`button-tertiary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onFormSubmit()}>Submit application</button>
      <button className={`button-tertiary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onShowContributorModal()}>Contributors</button>
      <button className={`button-primary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onNextClick()}>Next</button>
    </Fragment>
  );
}

export default ApplicantActionButtons;