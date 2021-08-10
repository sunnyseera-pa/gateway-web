import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './SaveModal.scss';

const SaveModal = ({ show, onHide }) => {
	const [title, setTitle] = useState('');
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);

	const handleSubmit = () => {
		const data = {
			title: title,
		};
		axios
			.post('https://link-here.com', data)
			.then(res => {
				setData(res.data);
				setTitle('');
			})
			.catch(err => {
				setError(true);
			});
	};

	return (
		<Modal show={show} onHide={onHide} className='save-modal'>
			<Modal.Header closeButton>
				<h5 className='black-20-semibold'>Saved search preference</h5>
			</Modal.Header>
			<Modal.Body>
				<p className='black-14'>Are you sure you want to save this search preference? If yes, please provide a title for this search.</p>
				<label className='black-14'>Title</label>
				<input type='text' className='save-modal-input' value={title} onChange={e => setTitle(e.target.value)} />
			</Modal.Body>
			<Modal.Footer className='saved-modal-footer'>
				<Button variant='outline-primary saved-no' onClick={onHide}>
					No, nevermind
				</Button>
				<Button type='submit' onClick={handleSubmit}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default SaveModal;
