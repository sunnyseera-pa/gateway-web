import React, { Fragment, useEffect } from 'react';
import Switch from 'react-switch';
import { userTypes } from './teamUtil';

const TeamGatewayNotificationEmails = ({ teamId, userHasRole, teamNotification, toggleTeamNotifications }) => {
	const isManager = () => {
		return userHasRole(teamId, userTypes.MANAGER);
	};

	let { optIn, notificationType } = teamNotification;

	useEffect(() => {
		isManager();
	}, [teamId, teamNotification]);

	return (
		<div className='tm-notification'>
			{teamId && isManager() && (
				<Fragment>
					<div className='tm-switch'>
						<Switch
							onChange={toggleTeamNotifications}
							checked={optIn}
							id={notificationType}
							offColor='#c2303d'
							uncheckedIcon={false}
							checkedIcon={false}
							width={48}
							height={24}
							className='react-switch'
						/>
					</div>
					<div className='tm-title'>
						<div className='black-16-semibold'>Send email notifcations to team email address</div>
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default TeamGatewayNotificationEmails;
