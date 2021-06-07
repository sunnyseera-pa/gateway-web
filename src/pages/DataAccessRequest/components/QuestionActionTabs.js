import React, { useState, useEffect, Fragment } from 'react';
import { Tabs, Tab } from 'react-bootstrap/';
import Guidance from './Guidance/Guidance';
import Messages from './Messages/Messages';
import Notes from './Notes/Notes';
import DarHelper from '../../../utils/DarHelper.util';
import { capitalize, isEmpty } from 'lodash';

const QuestionActionTabs = ({
	applicationId,
	userState,
	settings,
	activeGuidance,
	resetGuidance,
	onHandleActionTabChange,
	toggleDrawer,
	setMessageDescription,
	userType,
	messageCounts,
	noteCounts,
	isShared,
}) => {
	const [activeSettings, setActiveSettings] = useState({ key: '', questionSetId: '', questionId: '' });

	const onHandleSelect = key => {
		onHandleActionTabChange({ ...activeSettings, key });
	};

	useEffect(() => {
		if (!isEmpty(settings)) {
			if (settings.key === '') settings.key = DarHelper.actionKeys.GUIDANCE;
			setActiveSettings(settings);
		}
	}, [settings]);

	return (
		<div>
			<Tabs activeKey={activeSettings.key} onSelect={onHandleSelect} className='action-tabs'>
				<Tab
					eventKey={DarHelper.actionKeys.GUIDANCE}
					title={
						<Fragment>
							<i className={`far fa-question-circle mr-2 ${activeSettings.key === DarHelper.actionKeys.GUIDANCE ? 'tab-is-active' : ''}`} />
							{capitalize(DarHelper.actionKeys.GUIDANCE)}
						</Fragment>
					}>
					{!isEmpty(activeSettings.questionId) ? (
						<Guidance activeGuidance={activeGuidance}></Guidance>
					) : (
						<div className='darTab-guidance'>Click on a question guidance to view details</div>
					)}
				</Tab>
				<Tab
					eventKey={DarHelper.actionKeys.MESSAGES}
					title={
						<Fragment>
							<i className={`far fa-comment-alt mr-2 ${activeSettings.key === DarHelper.actionKeys.MESSAGES ? 'tab-is-active' : ''}`} />
							{capitalize(DarHelper.actionKeys.MESSAGES)}
							{!isEmpty(activeSettings.questionId) ? <span className='tab-count'>33</span> : ''}
						</Fragment>
					}>
					{!isEmpty(activeSettings.questionId) ? (
						<Messages
							applicationId={applicationId}
							userState={userState}
							settings={settings}
							applicationShared={isShared}
							toggleDrawer={toggleDrawer}
							setMessageDescription={setMessageDescription}
							userType={userType}
							isShared={isShared}></Messages>
					) : (
						<div className='darTab-guidance'>Click on a question message to view messages</div>
					)}
				</Tab>

				<Tab
					eventKey={DarHelper.actionKeys.NOTES}
					title={
						<Fragment>
							<i className={`far fa-edit mr-2 ${activeSettings.key === DarHelper.actionKeys.NOTES ? 'tab-is-active' : ''}`} />
							{capitalize(DarHelper.actionKeys.NOTES)}
							<span className='tab-count'>1</span>
						</Fragment>
					}>
					{!isEmpty(activeSettings.questionId) ? (
						<Notes applicationId={applicationId} userState={userState} settings={settings} userType={userType}></Notes>
					) : (
						<div className='darTab-guidance'>Click on a question note to view notes</div>
					)}
				</Tab>
			</Tabs>
		</div>
	);
};

export default QuestionActionTabs;
