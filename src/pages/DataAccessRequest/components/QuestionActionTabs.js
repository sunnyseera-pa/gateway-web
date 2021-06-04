import React, { useState, useEffect, Fragment } from 'react';
import { Tabs, Tab } from 'react-bootstrap/';
import Guidance from './Guidance/Guidance';
import Messages from './Messages/Messages';
import Notes from './Notes/Notes';
import DarHelper from '../../../utils/DarHelper.util';
import { capitalize, isEmpty } from 'lodash';

const QuestionActionTabs = ({
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
}) => {
	const [activeSettings, setActiveSettings] = useState({ key: '', questionSetId: '', questionId: '' });

	const onHandleSelect = key => {
		onHandleActionTabChange({ ...activeSettings, key });
	};

	useEffect(() => {
		if (!isEmpty(settings)) {
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
					<Guidance activeGuidance={activeGuidance} resetGuidance={resetGuidance}></Guidance>
				</Tab>
				<Tab
					eventKey={DarHelper.actionKeys.MESSAGES}
					title={
						<Fragment>
							<i className={`far fa-comment-alt mr-2 ${activeSettings.key === DarHelper.actionKeys.MESSAGES ? 'tab-is-active' : ''}`} />
							{capitalize(DarHelper.actionKeys.MESSAGES)}
							<span className='tab-count'>33</span>
						</Fragment>
					}>
					<Messages
						userState={userState}
						toggleDrawer={toggleDrawer}
						setMessageDescription={setMessageDescription}
						userType={userType}></Messages>
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
					<Notes userState={userState} userType={userType}></Notes>
				</Tab>
			</Tabs>
		</div>
	);
};

export default QuestionActionTabs;
