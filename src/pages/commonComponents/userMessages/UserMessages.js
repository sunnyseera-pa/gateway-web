import React, { useState, useEffect, Fragment } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as CloseButtonSvg } from '../../../images/close-alt.svg';
import axios from 'axios';
import _ from 'lodash';
import { baseURL } from '../../../configs/url.config';
import TopicList from './components/TopicList';
import MessageHeader from './components/MessageHeader';
import MessageItem from './components/MessageItem';
import MessageFooter from './components/MessageFooter';
import './UserMessages.scss';

const UserMessages = ({ topicContext, closed }) => {
	const defaultMessage =
		'Use messages to clarify questions with the data custodian before starting your application to request access to the data. Provide a brief description of your project and what datasets you are interested in.';

    let relatedObjectId, title, subTitle, dataSetId;
    
    let history = useHistory();

	if (typeof topicContext !== 'undefined')
		({ relatedObjectId = '', title = '', subTitle = '', dataSetId = '' } = topicContext);

	const [messageDescription, setMessageDescription] = useState('');

	const [topics, setTopics] = useState([]);

	const [activeTopic, setActiveTopic] = useState({});

	const [textArea, resetTextArea] = useState('');

	/**
	 * GetUserTopics
	 * @param null
	 * @desc Gets topics from API, set inital state and active state
	 * @returns [{Object}] topics
	 */
	const getUserTopics = async () => {
		await axios
			.get(`${baseURL}/api/v1/topics`)
			.then(async (res) => {
				const {
					data: { topics }
				} = res;
				// 1. clone topics from t
				let topicsArr = [...topics];
				// 2. check if existing relatedObjectId already in topic arr
				const existingTopicIdx = checkTopicExists(topicsArr, relatedObjectId);
				// 3. if topics exists
				if (existingTopicIdx > -1) {
					// 3a. get topic in arr
					const activeTopic = topicsArr[existingTopicIdx];
					// 3b. get full topic including messages set active topic
					await getTopicById(activeTopic._id);
					// 3c. set active state on topics arr
					topicsArr[existingTopicIdx].active = true;
				} else {
					// 4. if new topic make new object
					const newTopic = setNewTopic();
					// 5. only push new topic in if not empty
					if (!_.isEmpty(newTopic)) {
						topicsArr.unshift(newTopic);
						setActiveTopic(newTopic);
					}
				}
				// 6 set topics state
				setTopics(topicsArr);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const setNewTopic = () => {
		if (typeof relatedObjectId !== 'undefined') {
			let topic = {
				_id: '',
				title,
				subTitle,
				recipients: [],
				status: 'active',
				isDeleted: false,
				relatedObjectId,
				createdDate: 'New message',
				active: true,
				topicMessages: []
			};
			return topic;
		}
		return {};
	};

	const checkTopicExists = (topics = [], relatedObjectId = '') => {
		if (!_.isEmpty(topics) && !_.isEmpty(relatedObjectId)) {
			const idx = topics.findIndex(
				(t) => t.relatedObjectId === relatedObjectId
			);
			return idx;
		}
		return -1;
	};

	const onCloseDrawer = () => {
		closed();
	};

	/**
	 * Topic Click
	 * @param id {ObjectId}
	 * @desc When a topic is clicked add active flag true for selected topic
	 * @returns [{Object}] topics
	 */
	const onTopicClick = (id = '') => {
		// 1. loop over topics and set active state to the id
		const generatedTopics = [...topics].reduce((arr, item) => {
			let topic = {
				...item,
				active: item._id === id
			};
			// setActiveTopic if active
			if (topic.active) {
				// go get topic by id and set activeTopic
				getTopicById(topic._id);
			}
			return [...arr, topic];
		}, []);
		// 2. set state
		setTopics(generatedTopics);
		// 3. reset textArea
		setMessageDescription('');
	};

	/**
	 * getTopicById
	 * @param topic {<ObjectId>}
	 * @desc Returns the full topic including messages for selected topic
	 * @returns Sets state for active topic
	 */
	const getTopicById = async (id = '') => {
		if (!_.isEmpty(id)) {
			await axios
				.get(`${baseURL}/api/v1/topics/${id}`)
				.then((res) => {
					const {
						data: { topic }
					} = res;
					setActiveTopic({ ...topic, active: true });
				})
				.catch((err) => {
					console.log(err);
					return {};
				});
		}
	};

	/**
	 * Request Access
	 * @param topic {ObjectId}
	 * @desc When a user clicks Request Access button in header
	 */
	const onRequestAccess = (e) => {
        e.preventDefault();
        let id = '';
		if (!_.isEmpty(activeTopic)) {
            // remove scroll if in body
            if(document.body.classList.contains('no-scroll'))
                document.body.classList.remove('no-scroll');

			let { dataSetId: dSId } = { ...activeTopic };
			if (typeof dSId !== 'undefined' && !_.isEmpty(dSId)) {
                id = dSId;
			} else {
                id = dataSetId;
            }

            console.log('Request Access');
            history.push({pathname: `/data-access-request/dataset/${id}`});
		} 
	};

	/**
	 * onMessageChange
	 * @param event {<Object>}
	 * @desc Event to set message description text
	 */
	const onMessageChange = (e) => {
		e.preventDefault();
		setMessageDescription(e.target.value);
	};

	/**
	 * onSubmitMessage
	 * @param event {<Object>}
	 * @desc Event to Post message to db
	 */
	const onSubmitMessage = (e) => {
		e.preventDefault();
		if (_.isEmpty(messageDescription)) return false;

		let params = {
			messageType: 'message',
			topic: activeTopic._id,
			relatedObjectId: activeTopic.relatedObjectId,
			messageDescription
		};
		// do post here
		axios
			.post(`${baseURL}/api/v1/messages`, params)
			.then((response) => {
				// 1. set textarea to be blank
				setMessageDescription('');
				// 2. deconstruct message obj
				const {
					data: {
						message: {
							messageDescription,
							createdDate,
							createdByName,
							_id,
							topic
						}
					}
				} = response;
				// 3. copy new message
				let newTopic = { ...activeTopic };
				// 4. check here if new topic has been saved - key 'new'
				if (_.isEmpty(newTopic._id)) {
					// 4a. update newTopic date and _id
					newTopic['createdDate'] = createdDate;
					newTopic._id = topic;
					// 4b. update the main topics arr with the updated topic info
					let topicsArr = [...topics];
					topicsArr[0].createdDate = createdDate;
					topicsArr[0]._id = topic;
					// 4c. set topics state
					setTopics(topicsArr);
				}
				// 5. add new data into topic message
				newTopic.topicMessages.unshift({
					_id,
					messageDescription,
					createdDate,
					createdBy: createdByName
				});
				// 6. set the active topic
				setActiveTopic(newTopic);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
        // 1. GET Topics for current user
        if(typeof topicContext !== 'undefined')
		    getUserTopics();
	}, []);

	return (
		<Fragment>
			<div className='sideDrawer-header'>
				<div>Messages</div>
				<CloseButtonSvg
					className='sideDrawer-header--close'
					onClick={() => onCloseDrawer()}
				/>
			</div>
			<div className='sideDrawer-body'>
				<TopicList topics={topics} onTopicClick={onTopicClick} />
				<div className='messageArea'>
					<div className='messageArea-header'>
						{!_.isEmpty(activeTopic) ? (
							<MessageHeader
								topic={activeTopic}
								onRequestAccess={onRequestAccess}
							/>
						) : (
							''
						)}
					</div>
					<div className='messageArea-body'>
						{!_.isEmpty(activeTopic.topicMessages)
							? activeTopic.topicMessages.map((message) => (
                                    <MessageItem 
                                        key={message._id} 
                                        {...message} 
                                    />
							  ))
							: ''}
					</div>
					<div className='messageArea-footer'>
						<MessageFooter
							value={messageDescription}
							onSubmitMessage={onSubmitMessage}
							onMessageChange={onMessageChange}
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default UserMessages;

UserMessages.propTypes = {
	closed: PropTypes.bool,
	topicContext: undefined
};
