import React, { Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ReactComponent as CloseButtonSvg } from '../../../images/close-alt.svg';
import './DataUseSubmitModal.scss';

const DataUseSubmitModal = ({ open, close, confirm, isValid, isAdmin }) => {
	return (
		<Fragment>
			<Modal show={open} onHide={close} aria-labelledby='contained-modal-title-vcenter' centered className='dataUseSubmitModal'>
				<CloseButtonSvg className='dataUseSubmitModal-close' onClick={close} />
				<div className='dataUseSubmitModal-header'>
					<h1 className='black-20-semibold'>{isValid ? 'Submit data uses for review' : 'Submit data uses with errors'}</h1>
					<div className='dataUseSubmitModal-subtitle'>
						{isValid ? (
							<>
								<p>Are you sure that you want to submit these data uses for review? </p>
								<p>You cannot edit these whilst it is pending.</p>
							</>
						) : isAdmin ? (
							<>
								<p>
									There are errors on the file that you have uploaded. Are you sure that you want to submit these data uses for review? You
									cannot edit these whilst it is pending.
								</p>
								<p>You cannot edit these whilst it is pending.</p>
							</>
						) : (
							<p>
								You cannot submit these data uses for review with errors. If with the errors cannot be resolved, please raise a support
								ticket at the following link:{' '}
								<a className='data-use-link' href='https://hdruk.atlassian.net/servicedesk/customer/portal/1'>
									https://hdruk.atlassian.net/servicedesk/customer/portal/1
								</a>
							</p>
						)}
					</div>
				</div>
				<div className='dataUseSubmitModal-body'>
					{(isValid || isAdmin) && (
						<div className='dataUseSubmitModal-footer'>
							<div className='dataUseSubmitModal-footer--wrap'>
								<Button variant='white' className='techDetailButton mr-2' onClick={close}>
									No, nevermind
								</Button>
								<Button variant='primary' className='white-14-semibold' onClick={confirm}>
									Confirm submission
								</Button>
							</div>
						</div>
					)}
				</div>
			</Modal>
		</Fragment>
	);
};

export default DataUseSubmitModal;
