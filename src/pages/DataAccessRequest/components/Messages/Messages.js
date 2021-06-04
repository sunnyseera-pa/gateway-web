import React, { Fragment, useState, useEffect, useRef } from 'react';
import isEmpty from 'lodash';
import ShareFormModal from './ShareFormModal';
import './Messages.scss';
const baseURL = require('../../../commonComponents/BaseURL');

const Messages = ({ activeMessages, applicationShared, toggleDrawer, setMessageDescription, userState, userType }) => {
	const [showShareFormModal, setShowShareFormModal] = useState(false);
	const [currentMessage, setCurrentMessage] = useState('');
	const [messageThread, setMessageThread] = useState([]);
	const [applicationIsShared, setApplicationIsShared] = useState(applicationShared);
	// const [userState, setUserState] = useState(userState);

	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView(false);
	};

	useEffect(() => {
		scrollToBottom();
	});

	useEffect(() => {
		retrieveMessageThread();
	}, []);

	const onShowShareFormModal = () => {
		setShowShareFormModal(!showShareFormModal);
	};

	const handleSendMessage = message => {
		if (!message) {
			return;
		}
		// if application NOT shared show modal
		if (!applicationIsShared) {
			onShowShareFormModal();
		} else {
			sendMessage();
		}
		// sendMessage(); //delete this
	};

	const messageWithoutSharing = () => {
		// 1. Set share flag to false
		//await axios.put(baseURL + '/api/v1/setFlagFalse/');
		// 2. Show side drawer with message populated
		setShowShareFormModal(false);
		setMessageDescription(currentMessage);
		toggleDrawer();
		setCurrentMessage('');
	};

	const messageAndShare = () => {
		// 1. Set share flag to true
		//await axios.put(baseURL + '/api/v1/setFlagFalse/');
		// 2. Show message in messages tab
		setApplicationIsShared(true);
		setShowShareFormModal(false);
		sendMessage();
	};

	const sendMessage = () => {
		// TODO: Post message to API
		setMessageThread([...messageThread, { name: userState[0].name, date: '01/01/2021', content: currentMessage, userType: userType }]);
		setCurrentMessage('');
	};

	const retrieveMessageThread = () => {
		// 1. api call to get messages
		let messageThreadTestData = [
			{
				name: 'Richard Hobbs',
				date: '1 Jun 2021 16:20',
				content: 'Can you tell me more about this question please?',
				userType: 'applicant',
			},
			{
				name: 'Shannon Hoon',
				date: '10 Jun 2021 16:20',
				content: 'Yes this question is asking you for details about your.... blah blah blah blah blah',
				userType: 'custodian',
			},
			{
				name: 'Christopher man',
				date: '11 Jun 2021 16:20',
				content: 'You should also include details about .... blah blah blah blah blah and other stuff like that',
				userType: 'custodian',
			},
			{
				name: 'Richard Hobbs',
				date: '12 Jun 2021 16:20',
				content:
					'Thanks for your help Shannon and Christoper man.  This will help me answer the question.  Test test test test test tets test test test.  Test test test test test tets test test test.  Test test test test test tets test test test',
				userType: 'applicant',
			},
			{
				name: 'Richard Hobbs',
				date: '13 Jun 2021 16:20',
				content: 'Thank you!',
				userType: 'applicant',
			},
		];

		setMessageThread(messageThreadTestData);
	};

	const buildMessageThread = () => {
		if (isEmpty(messageThread) && messageThread.length < 1) {
			return (
				<Fragment>
					<div className='info-msg no-messages'>
						Use messages to clarify questions regarding certain parts of the application. The custodian will receive an email.{' '}
					</div>
					<div className='info-msg no-messages pb-0'>There are no messages relating to this question.</div>
				</Fragment>
			);
		} else {
			// Map over messages and return each as a bubble styled depending on who sent it
			return messageThread.map(msg => {
				return (
					<div className={userType.toUpperCase() === msg.userType.toUpperCase() ? 'message-sent' : 'message-received'}>
						<div
							className={`${
								userType.toUpperCase() === msg.userType.toUpperCase() ? 'message-bubble-sent' : 'message-bubble-received'
							} message-bubble`}>
							<div className='message-metadata'>
								<span>{msg.name}</span>
								<span>{msg.date}</span>
							</div>
							{msg.content}
						</div>
					</div>
				);
			});
		}
	};

	return (
		<Fragment>
			<div className='info-msg'>Both data custodian and applicants can see messages</div>
			<div className='darTab-messages'>
				<div className='messages'>
					{buildMessageThread()}
					<div ref={messagesEndRef} id='messageEndRef'></div>
				</div>
			</div>
			<form
				className='messages-form'
				onSubmit={e => {
					e.preventDefault();
					handleSendMessage(currentMessage);
				}}>
				<div className='messages-textarea'>
					<textarea
						className='form-control messages-textarea2'
						type='text'
						value={currentMessage}
						name='name'
						onChange={e => {
							e.preventDefault();
							setCurrentMessage(e.target.value);
						}}
					/>
				</div>
				<button className='button-secondary messages-button' type='submit'>
					Send
				</button>
			</form>
			{showShareFormModal ? (
				<ShareFormModal
					open={showShareFormModal}
					close={onShowShareFormModal}
					messageWithoutSharing={messageWithoutSharing}
					messageAndShare={messageAndShare}
				/>
			) : (
				''
			)}
		</Fragment>
	);
};

export default Messages;
