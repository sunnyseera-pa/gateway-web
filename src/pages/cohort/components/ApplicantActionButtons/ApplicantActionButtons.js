import React, { Fragment } from 'react';
import ActionBarMenu from '../../../commonComponents/ActionBarMenu/ActionBarMenu';
import '../../Cohorts.scss';

const ApplicantActionButtons = ({ allowedNavigation = false }) => {
	const options = [
		{
			description: '',
			actions: [
				{
					title: 'New version: edit metadata',
					isVisible: true,
				},
				{
					title: 'New version: edit inclusion/exclusion criteria',
					isVisible: true,
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
			<ActionBarMenu
				label='Create a new version'
				options={availableOptions}
				disabled={!allowedNavigation}
				buttonClass='techDetailButton newCohortVersionButton'
			/>
		</Fragment>
	);
};

export default ApplicantActionButtons;
