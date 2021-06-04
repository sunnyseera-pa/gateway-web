import React, { Fragment, useState, useEffect, useRef } from 'react';
import isEmpty from 'lodash';
import '../Messages/Messages.scss';
import SVGIcon from '../../../../images/SVGIcon';

const baseURL = require('../../../commonComponents/BaseURL');

const Notes = ({ activeNotes, userState, userType }) => {
	const [currentNote, setCurrentNote] = useState('');
	const [notesThread, setNotesThread] = useState([]);

	const notesEndRef = useRef(null);

	useEffect(() => {
		retrieveNotesThread();
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [notesThread]);

	const scrollToBottom = () => {
		notesEndRef.current.scrollIntoView(false);
	};

	const handleSendNote = message => {
		if (!message) {
			return;
		}
		addNote();
	};

	const addNote = () => {
		// TODO: Post message to API
		setNotesThread([...notesThread, { name: userState[0].name, date: '01/01/2021', content: currentNote, userType: userType }]);
		setCurrentNote('');
	};

	const retrieveNotesThread = () => {
		// 1. api call to get messages
		let notesThreadTestData = [
			{
				name: 'Richard Hobbs',
				date: '1 Jun 2021 16:20',
				content: 'These are my notes that only applicants can see',
				userType: 'applicant',
			},
			{
				name: 'Christopher veryLongSurname',
				date: '11 Jun 2021 16:20',
				content: 'That is most correct',
				userType: 'applicant',
			},
			{
				name: 'Richard Hobbs',
				date: '12 Jun 2021 16:20',
				content:
					'Test test test test test tets test test test.  Test test test test test tets test test test.  Test test test test test tets test test test',
				userType: 'applicant',
			},
		];

		setNotesThread(notesThreadTestData);
		setNotesThread([]);
	};

	const buildNotesThread = () => {
		if (isEmpty(notesThread) && notesThread.length < 1) {
			return (
				<Fragment>
					<div className='info-msg no-messages'>
						{userType.toUpperCase() === 'APPLICANT'
							? 'Use notes to organise your thoughts and share ideas with your collaborators before sending the application.'
							: 'Use notes to organise your thoughts and share ideas with other reviewers during the review process.'}
					</div>
					<div className='info-msg no-messages pb-0'>There are no notes relating to this question.</div>
				</Fragment>
			);
		} else {
			// Map over messages and return each as a bubble styled depending on who sent it
			return notesThread.map(note => {
				return (
					<div className='message-sent'>
						<div className='notes-bubble-sent message-bubble'>
							<div className='message-metadata'>
								<span>{note.name}</span>
								<span>{note.date}</span>
							</div>
							{note.content}
						</div>
					</div>
				);
			});
		}
	};

	const getInfoMessage = () => {
		let message = 'Applicants cannot see your notes, reviewers can.';
		if (userType.toUpperCase() === 'APPLICANT') {
			message = 'Data custodians cannot see your notes, collaborators can.';
		}
		return (
			<div className='info-note'>
				<SVGIcon name='eyeCrossed' width={16} height={16} fill={'#53575a'} className={'margin-right-8'} />
				{message}
			</div>
		);
	};

	return (
		<Fragment>
			{getInfoMessage()}
			<div className='darTab-notes'>
				<div className='messages'>
					{buildNotesThread()}
					<div ref={notesEndRef} id='messageEndRef'></div>
				</div>
			</div>
			<form
				className='messages-form'
				onSubmit={e => {
					e.preventDefault();
					handleSendNote(currentNote);
				}}>
				<div className='messages-textarea'>
					<textarea
						className='form-control messages-textarea2'
						type='text'
						value={currentNote}
						name='name'
						onChange={e => {
							e.preventDefault();
							setCurrentNote(e.target.value);
						}}
					/>
				</div>
				<button className='button-secondary messages-button' type='submit'>
					Add
				</button>
			</form>
		</Fragment>
	);
};

export default Notes;
