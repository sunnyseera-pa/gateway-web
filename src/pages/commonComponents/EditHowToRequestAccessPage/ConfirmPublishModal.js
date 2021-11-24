import React from 'react';
import { Modal } from 'react-bootstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ReactComponent as CloseButtonSvg } from '../../../images/close-alt.svg';

export const ConfirmPublishModal = ({ showConfirmPublishModal, setShowConfirmPublishModal, updatePublisherModalContent }) => {
	return (
		<Modal
			show={showConfirmPublishModal}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
			className='removeUploaderModal'>
			<div className='removeUploaderModal-header'>
				<div className='removeUploaderModal-header--wrap'>
					<div className='removeUploaderModal-head'>
						<h1 className='black-20-semibold'>Publish ‘How to request access’ information</h1>
						<CloseButtonSvg className='removeUploaderModal-head--close' onClick={() => setShowConfirmPublishModal(false)} />
					</div>
					<div className='gray700-13 new-line'>
						Are you sure you want to publish your updates to the ‘How to request access’ information?
					</div>
				</div>
			</div>
			<div className='removeUploaderModal-footer'>
				<div className='removeUploaderModal-footer--wrap'>
					<button className='button-secondary' onClick={() => setShowConfirmPublishModal(false)}>
						No, nevermind
					</button>
					<button
						className='button-primary'
						onClick={() => {
							updatePublisherModalContent();
						}}>
						Publish
					</button>
				</div>
			</div>
		</Modal>
	);
};
