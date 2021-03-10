import React, { Fragment } from 'react';
import '../../DataAccessRequest.scss';

const ApplicantActionButtons = ({
	allowedNavigation = false,
	onSubmitClick,
	onNextClick,
	onShowContributorModal,
	onEditForm,
	showSubmit,
	submitButtonText,
	onDeleteDraftClick,
	inProgress,
}) => {
	return (
		<Fragment>
			{inProgress ? (
				<button className={`btn-link btn-link-delete p-2 ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onDeleteDraftClick()}>
					Delete draft
				</button>
			) : (
				''
			)}
			<button className={`button-tertiary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onShowContributorModal()}>
				Contributors
			</button>
			{showSubmit ? (
				<button className={`button-secondary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onSubmitClick()}>
					{submitButtonText}
				</button>
			) : (
				''
			)}
			<button className={`button-primary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onNextClick()}>
				Next
			</button>
		</Fragment>
	);
};

export default ApplicantActionButtons;
