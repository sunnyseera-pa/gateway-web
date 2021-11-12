import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';
import datasetService from '../../../../services/datasets/datasets';
import './AccountDatasetDecisionModal.scss';
import _ from 'lodash';

const AccountDatasetRejectModal = ({
	id,
	open,
	closed,
    onReject,
	goToNext
}) => {
	const {
			handleSubmit,
			handleChange,
			handleBlur,
			touched,
			values,
			errors
		} = useFormik({
		initialValues: {
			reason: ''
		},
		validationSchema: Yup.object({
			reason: Yup.string().required('This cannot be empty'),
		}),
		onSubmit: async values => {
			const payload = {
				id,
				...values
			};
			await datasetService.postRejectDatasetRequest(payload);
		},
	});

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
				<div className='account-dataset-decision-body--wrap'>
					<p>Let the editor know why this submission is being rejected. They will be able to create a new version and make a new submission.</p>
					<label className='black-14'>Description</label>
					<Form.Control
						data-test-id='dataset-reject-reason'
						id='reason'
						name='reason'
						type='textarea'
						className={touched.reason && errors.reason && 'save-modal-input'}
						onChange={handleChange}
						value={values.reason}
						onBlur={handleBlur}
					/>
					{touched.reason && errors.reason ? <div className='errorMessages'>{errors.reason}</div> : null}
				</div>
			</div>
			<div className='account-dataset-decision-footer'>
				<div className='account-dataset-decision-footer--wrap'>
					<Button
						className='button-secondary'
						style={{ marginLeft: 'auto' }}
						onClick={() => {
							closed();
						}}>
						No, nevermind
					</Button>
					<Button
						className='button-secondary'
						style={{ marginLeft: 'auto' }}
						onClick={async () => {
							await handleSubmit();
							onReject();
							closed();
						}}>
						Reject
					</Button>
					<Button
						className='button-secondary'
						style={{ marginLeft: 'auto' }}
						onClick={() => {
							handleSubmit();
							goToNext();
							closed();
						}}>
						Reject and go to next
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default AccountDatasetRejectModal;
