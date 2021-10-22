import React, { Fragment, useState } from 'react';
import _ from 'lodash';
import ActionBarMenu from '../../../commonComponents/ActionBarMenu/ActionBarMenu';
import EntityActionModal from '../../../dashboard/EntityActionModal';
import '../../Cohorts.scss';

const CohortActionButtons = ({ id, bcpLink, disabled }) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

	const options = [
		{
			description: '',
			actions: [
				{
					title: 'New version: edit metadata',
					isVisible: true,
					onClick: () => {
						window.location.href = `${window.location.search}/cohort/edit/${id}`;
					},
				},
				{
					title: 'New version: edit inclusion/exclusion criteria',
					isVisible: true,
					onClick: () => {
						setShow(!show);
					},
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
			<EntityActionModal show={show} handleClose={handleClose} actionType='editCriteria' bcpLink={bcpLink} />
			<ActionBarMenu
				label='Create a new version'
				options={availableOptions}
				disabled={disabled}
				buttonClass='techDetailButton newCohortVersionButton'
				isCohortPage={true}
			/>
		</Fragment>
	);
};

export default CohortActionButtons;
