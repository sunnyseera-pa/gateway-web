import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './SavedPreferencesModal.scss';

const SavedPreferencesModal = ({ show, onHide }) => {
	return (
		<Modal show={show} onHide={onHide} className='save-modal'>
			<Modal.Header closeButton>
				<h5 className='black-20-semibold'>Header</h5>
			</Modal.Header>
			<Modal.Body>
				<p className='black-14'>Body</p>
			</Modal.Body>
			<Modal.Footer className='saved-modal-footer'>
				<Button onClick={onHide}>Cancel</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default SavedPreferencesModal;
