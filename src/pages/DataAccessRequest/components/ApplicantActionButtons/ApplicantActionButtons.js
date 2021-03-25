import React, { Fragment } from 'react';
import '../../DataAccessRequest.scss';

const ApplicantActionButtons = ({
	allowedNavigation = false,
	isCloneable = false,
	onSubmitClick,
	onNextClick,
	onShowContributorModal,
	showSubmit,
	submitButtonText,
	onDuplicateClick,
}) => {
	return (
		<Fragment>
			{ allowedNavigation && isCloneable && (
			<button className={`button-tertiary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onDuplicateClick()}>
				Duplicate
			</button>
			)}
			<button className={`button-tertiary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onShowContributorModal()}>
				Contributors
			</button>
			{ showSubmit && (
				<button className={`button-secondary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onSubmitClick()}>
					{submitButtonText}
				</button>
			)}
			<button className={`button-primary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onNextClick()}>
				Next
			</button>
		</Fragment>
	);
};

export default ApplicantActionButtons;
