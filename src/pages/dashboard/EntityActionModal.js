import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import _ from 'lodash';

const EntityActionModal = props => {
	let title, pastTense;

	switch (props.actionType) {
		case 'delete':
			title = 'Delete';
			pastTense = 'deleted';
			break;
		case 'archive':
			title = 'Archive';
			pastTense = 'archived';
			break;
		case 'unarchive':
			title = 'Unarchive';
			pastTense = 'unarchived';
			break;
		case 'editCriteria':
			title = 'New version: edit inclusion/exclusion criteria';
		default:
			break;
	}

	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{props.actionType === 'editCriteria' ? `${title}` : `${title} this ${!_.isEmpty(props.entity) ? props.entity : 'entity'}?`}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{props.actionType === 'editCriteria'
					? `You must return to the Cohort Discovery tool to edit the inlusion/exclusion criteria. You’ll need to run a new search and save. When saving, choose save as a new version and select the appropriate cohort from the list.`
					: `This ${!_.isEmpty(props.entity) ? props.entity : 'entity'} will be ${pastTense} from the directory.`}
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={props.handleClose}>
					No, nevermind
				</Button>
				{props.actionType === 'editCriteria' ? (
					<a href={props.bcpLink}>
						<Button variant='primary'>Go to Cohort Discovery</Button>
					</a>
				) : (
					<Button variant='primary' onClick={props.performAction}>
						Yes, {title.toLowerCase()}
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
};

export default EntityActionModal;
