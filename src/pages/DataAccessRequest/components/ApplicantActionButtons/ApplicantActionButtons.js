import React, { Fragment } from 'react';
import '../../DataAccessRequest.scss';
import DarHelper from '../../../../utils/DarHelper.util';

const ApplicantActionButtons = ({
	allowedNavigation = false,
	isCloneable = false,
	onSubmitClick,
	onNextClick,
	onShowContributorModal,
	showSubmit,
	submitButtonText,
	onDeleteDraftClick,
	applicationStatus,
	onDuplicateClick,
}) => {
	return (
		<Fragment>
			{applicationStatus === DarHelper.darStatus.inProgress ? (
				<button className={`btn-link btn-link-delete p-2 ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onDeleteDraftClick()}>
					Delete draft
				</button>
			) : (
				''
			)}
			{allowedNavigation && isCloneable && (
				<button className={`button-tertiary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onDuplicateClick()}>
					Duplicate
				</button>
			)}
			<button className={`button-tertiary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onShowContributorModal()}>
				Contributors
			</button>
			{showSubmit && (
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
