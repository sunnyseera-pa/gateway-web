import React from 'react';
import { Modal } from 'react-bootstrap';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';
import './AccountDatasetDecisionModal.scss';
import _ from 'lodash';

const AccountDatasetApproveModal = ({
	id,
	open,
	closed,
    onApprove,
	onApproveAndGoToNext
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
					<h4 className='black-20'>Approve this version of this dataset metadata</h4>
				</div>
			</div>

			<div className='account-dataset-decision-body'>
				<div className='account-dataset-decision-body--wrap'>
					<p></p>
				</div>
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
							onApprove();
							closed();
						}}>
						Approve
					</button>
					<button
						className='button-secondary'
						style={{ marginLeft: 'auto' }}
						onClick={() => {
							onApproveAndGoToNext();
							closed();
						}}>
						Approve and go to next
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default AccountDatasetApproveModal;
