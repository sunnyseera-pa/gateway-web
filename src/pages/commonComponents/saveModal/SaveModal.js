import React, { Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';

import './SaveModal.scss';

const SaveModal = ({ show, onHide }) => {
	return (
		<Fragment>
			<Modal show={show} onHide={onHide}>
				<Modal.Header closeButton>Saved search preference</Modal.Header>
				<Modal.Body>
					<p>Are you sure you want to save this search preference? If yes, please provide a title for this search.</p>
					<label>Title</label>
					<input type='text' />
				</Modal.Body>
				<Modal.Footer>
					<Button>No, nevermind</Button>
					<Button>Save</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
};

export default SaveModal;
