import React, { Fragment } from 'react';
import '../../DatasetOnboarding.scss';

const ApplicantActionButtons = ({
	allowedNavigation = false,
	onFormSubmit,
	onNextClick,
	onShowArchiveModal,
	onShowUnArchiveModal,
	onShowCreateNewVersionModal,
	showSubmit,
	submitButtonText,
	showCreateNewVersion,
	showArchive,
	showUnArchive,
	showDeleteDraft,
	onShowDeleteDraftModal,
}) => {
	return (
		<Fragment>
			{showDeleteDraft ? (
				<a href='!#' onClick={e => onShowDeleteDraftModal()}>
					{' '}
					<span class='rejected-red-semibold-14 deleteDraftDataset cursorPointer'>Delete draft</span>{' '}
				</a>
			) : (
				''
			)}
			{showArchive ? (
				<button className={`button-tertiary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onShowArchiveModal()}>
					Archive
				</button>
			) : (
				''
			)}
			{/*  {showUnArchive ? <button className={`button-tertiary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onShowUnArchiveModal()}>Un-archive</button> : ''} */}
			{showCreateNewVersion ? (
				<button className={`button-tertiary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onShowCreateNewVersionModal()}>
					Create a new version
				</button>
			) : (
				''
			)}
			{showSubmit ? (
				<button className={`button-secondary ${allowedNavigation ? '' : 'disabled'}`} onClick={e => onFormSubmit()}>
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
