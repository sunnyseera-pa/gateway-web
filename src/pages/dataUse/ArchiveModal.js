import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ArchiveModal = ({ show, hide, archive }) => (
	<Modal show={show} onHide={hide}>
		<Modal.Header closeButton>{archive ? 'Archive this data use?' : 'Un-archive this data use?'}</Modal.Header>
		<Modal.Body>
			{archive
				? 'This will remove this data use from search results, but will remain accessable via any linked related resources with a message explaining that it is an old version of the data use.'
				: 'This data use will appear in search results again. You will be able to edit this data use once it has been un-archived.'}
		</Modal.Body>
		<Modal.Footer>
			<Button>No, nevermind</Button>
			<Button>{archive ? 'Archive' : 'Un-archive'}</Button>
		</Modal.Footer>
	</Modal>
);

export default ArchiveModal;
