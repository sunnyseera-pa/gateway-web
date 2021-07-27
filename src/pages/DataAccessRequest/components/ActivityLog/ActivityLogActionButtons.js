import React from 'react';
import { Fragment } from 'react';

import DarHelperUtil from '../../../../utils/DarHelper.util';

const ActivityLogActionButtons = ({ team, latestVersion, onClickAddNewEvent, onClickDownloadLog, onClickStartReview }) => {
	return (
		<Fragment>
			<button className={`button-secondary`} onClick={() => onClickDownloadLog()}>
				Download activity log
			</button>

			{team !== 'user' && (
				<button className={`button-secondary`} onClick={() => onClickAddNewEvent()}>
					+ Add new event
				</button>
			)}

			{(Object.values(latestVersion.versionTree) || [])
				.filter(version => version.applicationStatus === DarHelperUtil.darStatus.submitted)
				.map(submittedVersion => {
					return (
						team !== 'user' && (
							<button
								id='startReview'
								className='button-primary'
								onClick={e => {
									onClickStartReview(e, submittedVersion.applicationId);
								}}>
								Start Review: {submittedVersion.displayTitle}
							</button>
						)
					);
				})}

			{(team === 'user' || latestVersion.applicationStatus === DarHelperUtil.darStatus.inReview) && (
				<a href={latestVersion.versions[0].link}>
					<button className={`button-primary`}>View application form</button>
				</a>
			)}
		</Fragment>
	);
};

export default ActivityLogActionButtons;
