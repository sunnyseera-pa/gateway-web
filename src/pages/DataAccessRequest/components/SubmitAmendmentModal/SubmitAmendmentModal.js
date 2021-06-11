import React, { Fragment, useState } from 'react';
import _ from 'lodash';
import { Modal } from 'react-bootstrap';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';
import './SubmitAmendmentModal.scss';

const SubmitAmendmentModal = ({ open, close, onHandleSubmit }) => {
	const onSubmit = () => {
		const valid = true;

		if (valid) {
			close();
			onHandleSubmit({ description: textValue });
		}
	};
	const [textValue, setTextValue] = useState('');

	return (
		<Fragment>
			<Modal show={open} onHide={close} size='lg' aria-labelledby='contained-modal-title-vcenter' centered className='amendmentModal'>
				<div className='amendmentModal-header'>
					<div className='amendmentModal-header--wrap'>
						<div className='amendmentModal-head'>
							<h1 className='black-20-semibold'>Submit amendment</h1>
							<CloseButtonSvg className='amendmentModal-head--close' onClick={() => close()} />
						</div>
						<p>
							Are you sure you want to submit a new version of this application? If yes, please explain the changes you have made and why.
						</p>
					</div>
				</div>

				<div className='amendmentModal-body'>
					<div className='amendmentModal-body--group'>
						<label className='gray800-14'>Description</label>
						<label className='gray800-14'>(${textValue.length}/1500))</label>
						<textarea
							className={`form-control`}
							name='amendDesc'
							onChange={e => setTextValue(e.target.value)}
							value={textValue}
							rows='8'></textarea>
					</div>
				</div>

				<div className='amendmentModal-footer'>
					<div className='amendmentModal-footer--wrap'>
						<button className='button-secondary' onClick={() => close()}>
							No, nevermind
						</button>
						<button className='button-primary' onClick={() => onSubmit()}>
							Submit amendment
						</button>
					</div>
				</div>
			</Modal>
		</Fragment>
	);
};

export default SubmitAmendmentModal;
