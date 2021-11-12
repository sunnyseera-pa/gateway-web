import React from 'react';
import { Modal } from 'react-bootstrap';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';
import './AccountDatasetDecisionModal.scss';
import _ from 'lodash';

const AccountDatasetRejectModal = ({
	open,
	closed,
    onReject,
	onRejectAndGoToNext
}) => {
	return (
		<Modal
			show={open}
			onHide={closed}
			className='account-dataset-decision-modal'
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<div className='account-dataset-decision-header'>
				<CloseButtonSvg className='account-dataset-decision-modal-close' onClick={closed} />
				<div className='account-dataset-decision-header--wrap'>
					<h4 className='black-20'>Reject this version of this dataset metadata</h4>
				</div>
			</div>

			<div className='account-dataset-decision-body'>
				<div className='account-dataset-decision-body--wrap'>Placeholder content for now</div>
			</div>
			<div className='account-dataset-decision-footer'>
				<div className='account-dataset-decision-footer--wrap'>
					<button
						className='button-secondary'
						style={{ marginLeft: 'auto' }}
						onClick={() => {
							closed();
						}}>
						No, nevermind
					</button>
					<button
						className='button-secondary'
						style={{ marginLeft: 'auto' }}
						onClick={() => {
							onReject();
							closed();
						}}>
						Reject
					</button>
					<button
						className='button-secondary'
						style={{ marginLeft: 'auto' }}
						onClick={() => {
							onRejectAndGoToNext();
							closed();
						}}>
						Reject and go to next
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default AccountDatasetRejectModal;
