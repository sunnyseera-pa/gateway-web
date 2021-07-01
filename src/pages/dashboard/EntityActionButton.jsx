import React, { Fragment, useState } from 'react';
import { Modal, Dropdown } from 'react-bootstrap';
import { ReactComponent as CloseButtonSvg } from '../../images/close-alt.svg';
import './Dashboard.scss';
import _ from 'lodash';

export const EntityActionButton = props => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const performAction = () => props.action(props.id);

	let title;
	let pastTense;

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
		default:
			break;
	}

	return (
		<Fragment>
			<Dropdown.Item href='#' onClick={handleShow} className='black-14'>
				{title}
			</Dropdown.Item>

			<Modal show={show} onHide={handleClose} size='md' centered>
				<Modal.Header>
					<Modal.Title>
						{title} {!_.isEmpty(props.entity) ? props.entity : 'entity'}?
					</Modal.Title>
					<CloseButtonSvg className='modal-close pointer' onClick={handleClose} width='20px' height='20px' fill='#475DA7' />
				</Modal.Header>
				<Modal.Body>
					{props.bodyText ? (
						<p>{props.bodyText}</p>
					) : (
						<p>
							This {!_.isEmpty(props.entity) ? props.entity : 'entity'} will be {pastTense} from the directory.
						</p>
					)}
				</Modal.Body>
				<Modal.Footer>
					<button className='button-secondary' onClick={handleClose}>
						No, nevermind
					</button>
					<button className='button-primary' onClick={performAction}>
						{title} {!_.isEmpty(props.entity) ? props.entity : 'entity'}
					</button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
};
