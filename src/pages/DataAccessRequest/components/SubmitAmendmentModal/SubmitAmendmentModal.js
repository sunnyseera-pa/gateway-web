import React, { Fragment } from 'react';
import _ from 'lodash';
import { Modal } from 'react-bootstrap';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';
import './SubmitAmendmentModal.scss'


const SubmitAmendmentModal = ({ open, close }) => {
	const onSaveChanges = () => {
		close();
	};

	return (
		<Fragment>
			<Modal show={open} onHide={close} size='lg' aria-labelledby='contained-modal-title-vcenter' centered className='amendmentModal'>
				<div className='amendmentModal-header'>
					<div className='amendmentModal-header--wrap'>
						<div className='amendmentModal-head'>
							<h1 className='black-20-semibold'>Submit amendment</h1>
							<CloseButtonSvg className='amendmentModal-head--close' onClick={() => close()} />
						</div>
						<p>Are you sure you want to submit a new version of this application? If yes, please explain the changes you have made and why.</p>
					</div>
				</div>

				<div className='amendmentModal-body'>
					<div className='amendmentModal-body--group'>
						<label className='gray800-14'>Description</label>
                        <textarea
								className={`form-control`}
								name='amendDesc'
								rows='8'></textarea>
					</div>
				</div>

				<div className='amendmentModal-footer'>
					<div className='amendmentModal-footer--wrap'>
						<button className='button-secondary' onClick={() => close()}>
							No, nevermind
						</button>
						<button className='button-primary' onClick={() => onSaveChanges()}>
							Submit amendment
						</button>
					</div>
				</div>
			</Modal>
		</Fragment>
	);
};

export default SubmitAmendmentModal;
