import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Row, Container } from 'react-bootstrap';
import './SavedPreferencesModal.scss';

var baseURL = require('../../commonComponents/BaseURL').getURL();

const SavedPreferencesModal = ({ show, onHide }) => {
	const [data, setData] = useState(null);

	axios
		.get(baseURL + '/api/v1/search-preferences')
		.then(res => console.log(res.data))
		.catch(err => console.log(err));

	return (
		<Modal show={show} onHide={onHide} className='save-modal'>
			<Modal.Header closeButton>
				<Container>
					{' '}
					<Row>
						<h5 className='black-20-semibold'>Search preferences</h5>
					</Row>
					<Row>
						<p className='black-14'>
							View saved preferences across all resources on the Gateway. To create a new preference, apply your desired filters on the
							resources search results page and select 'save'.
						</p>
					</Row>
				</Container>
			</Modal.Header>
			<Modal.Body>
				<p className='black-14'>Body</p>
			</Modal.Body>
			<Modal.Footer className='saved-preference-modal-footer'>
				<Button onClick={onHide} className='saved-preference-modal button-tertiary'>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default SavedPreferencesModal;
