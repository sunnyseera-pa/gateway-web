import React, { Fragment, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import isEmpty from 'lodash';
import ShareFormModal from './ShareFormModal';
import Loading from '../../../commonComponents/Loading';
import './Messages.scss';
import { baseURL } from '../../../../configs/url.config';

const Messages = ({
	applicationId,
	activeMessages,
	settings,
	applicationShared,
	toggleDrawer,
	setMessageDescription,
	userState,
	userType,
}) => {
	const [showShareFormModal, setShowShareFormModal] = useState(false);
	const [currentMessage, setCurrentMessage] = useState('');
	const [messageThread, setMessageThread] = useState([]);
	const [applicationIsShared, setApplicationIsShared] = useState(applicationShared);
	const [isloading, setIsloading] = useState(true);
	// const [userState, setUserState] = useState(userState);

	const messagesEndRef = useRef(null);

	useEffect(() => {
		setIsloading(true);
		retrieveMessageThread();
	}, [settings]);

	useEffect(() => {
		scrollToBottom();
	}, [messageThread]);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView(false);
	};

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
			sendMessage(message);
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

	const sendMessage = async message => {
		// TODO: Post message to API
		const { questionId } = settings;
		let response = await axios.post(`${baseURL}/api/v1/data-access-request/${applicationId}/messages`, {
			questionId,
			messageType: 'DAR_Message',
			messageBody: message,
		});

		setMessageThread([...messageThread, { name: userState[0].name, date: '01/01/2021', content: currentMessage, userType: userType }]);
		setCurrentMessage('');
	};

	const retrieveMessageThread = async () => {
		// 1. api call to get messages
		const { questionId } = settings;
		const response = await axios.get(
			`${baseURL}/api/v1/data-access-request/${applicationId}/messages?messageType=DAR_Message&questionId=${questionId}`
		);
		setIsloading(false);
		setMessageThread(response.data.messages);
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
								<span>{msg.name} </span>
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
					{isloading ? (
						<Fragment>
							<Loading />
						</Fragment>
					) : (
						buildMessageThread()
					)}

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
