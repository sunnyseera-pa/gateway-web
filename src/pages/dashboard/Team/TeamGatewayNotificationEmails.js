import React, { Fragment, useEffect, useState } from 'react';
import Switch from 'react-switch';
import { useTranslation } from 'react-i18next';
import { userTypes } from './teamUtil';

const TeamGatewayNotificationEmails = ({ teamId, userHasRole, teamNotification, toggleTeamNotifications }) => {
    const { t } = useTranslation();
    const [isManager, setManager] = useState(false);
    let { optIn, notificationType } = teamNotification;

    useEffect(() => {
        setManager(userHasRole(teamId, userTypes.MANAGER));
    }, [teamId, teamNotification]);

    return (
        <div className='tm-notification'>
            {teamId && isManager && (
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
                            data-testid='notify-team-email'
                        />
                    </div>
                    <div className='tm-title'>
                        <div className='black-16-semibold'>{t('notifications.teamEmailText')}</div>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default TeamGatewayNotificationEmails;
