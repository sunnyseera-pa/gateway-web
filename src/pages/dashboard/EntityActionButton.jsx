import React, { Fragment, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './Dashboard.scss';
import _ from 'lodash';
import EntityActionModal from './EntityActionModal';

export const EntityActionButton = props => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const performAction = () => props.action(props.id);

	let title;

	switch (props.actionType) {
		case 'delete':
			title = 'Delete';
			break;
		case 'archive':
			title = 'Archive';
			break;
		case 'unarchive':
			title = 'Unarchive';
			break;
		case 'editCriteria':
			title = 'New version: edit inclusion/exclusion criteria';
		default:
			break;
	}

	return (
		<Fragment>
			<Dropdown.Item href='#' onClick={handleShow} className='black-14'>
				{title}
			</Dropdown.Item>
			<EntityActionModal
				show={show}
				performAction={performAction}
				handleClose={handleClose}
				actionType={props.actionType}
				entity={props.entity}
				bcpLink={props.bcpLink}
			/>
		</Fragment>
	);
};
