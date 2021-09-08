import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ArchiveModal = ({ show, hide, archive }) => (
	<Modal show={show} onHide={hide}>
		<Modal.Header closeButton>
			{archive ? (
				<h3 className='black-20-semibold'>Archive this data use?</h3>
			) : (
				<h3 className='black-20-semibold'>Un-archive this data use</h3>
			)}
		</Modal.Header>
		<Modal.Body>
			{archive ? (
				<p className='gray700-14'>
					This will remove this data use from search results, but will remain accessable via any linked related resources with a message
					explaining that it is an old version of the data use.
				</p>
			) : (
				<p className='gray700-14'>
					This data use will appear in search results again. You will be able to edit this data use once it has been un-archived.
				</p>
			)}
		</Modal.Body>
		<Modal.Footer>
			<Button className='data-use-no' variant='outline-primary'>
				No, nevermind
			</Button>
			<Button className='data-use-arch'>{archive ? 'Archive' : 'Un-archive'}</Button>
		</Modal.Footer>
	</Modal>
);

export default ArchiveModal;
