import React, { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { ReactComponent as CloseButtonSvg } from '../../../images/close-alt.svg';
import './TeamEmailAlertModal.scss';

const TeamEmailAlertModal = ({ open, close }) => {
	return (
		<Fragment>
			<Modal show={open} onHide={close} aria-labelledby='contained-modal-title-vcenter' centered className='teamEmailAlertModal'>
				<div className='teamEmailAlertModal-header'>
					<h1 className='black-20-semibold'>You must have one email address selected</h1>
					<CloseButtonSvg className='teamEmailAlertModal-header--close' onClick={close} />
				</div>
				<div className='teamEmailAlertModal-body'>At least one email address is needed to receive notifications from the gateway.</div>
			</Modal>
		</Fragment>
	);
};

export default TeamEmailAlertModal;
