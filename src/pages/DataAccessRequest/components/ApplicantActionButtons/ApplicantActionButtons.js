import React, { Fragment } from 'react';
import DarHelper from '../../../../utils/DarHelper.util';
import ActionBarMenu from '../../../commonComponents/ActionBarMenu/ActionBarMenu';

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
	onShowAmendApplicationModal
}) => {
	const options = [
		{
			description: 'Manage application:',
			actions: [
				{
					title: 'Contributors',
					description: 'Add or remove others to help with this application',
					onClick: () => {
						onShowContributorModal();
					},
					isVisible: true,
				},
				{
					title: 'Amend application',
					description: 'Add or remove datasets and edit answers in approved applications',
					onClick: () => {
						onShowAmendApplicationModal();
					},
					isVisible:
						applicationStatus === DarHelper.darStatus.inReview ||
						applicationStatus === DarHelper.darStatus.approved ||
						applicationStatus === DarHelper.darStatus.rejected,
				},
				{
					title: 'Duplicate application',
					description: 'Copy answers into a new or existing pre-submission application',
					onClick: () => {
						onDuplicateClick();
					},
					isVisible: isCloneable,
				},
				{
					title: 'Delete draft',
					description: 'Delete and close this draft application',
					onClick: () => {
						onDeleteDraftClick();
					},
					isVisible: applicationStatus === DarHelper.darStatus.inProgress,
				},
			],
		},
	];

	const availableOptions = options.map(option => {
		option.actions = option.actions.filter(action => action.isVisible);
		return option;
	});

	return (
		<Fragment>
			<ActionBarMenu label='Manage application' options={availableOptions} disabled={!allowedNavigation} buttonClass='button-tertiary' />

			{showSubmit && (
				<button className={`button-secondary ${allowedNavigation ? '' : 'disabled'}`} onClick={() => onSubmitClick()}>
					{submitButtonText}
				</button>
			)}

			<button className={`button-primary ${allowedNavigation ? '' : 'disabled'}`} onClick={() => onNextClick()}>
				Next
			</button>
		</Fragment>
	);
};

export default ApplicantActionButtons;
