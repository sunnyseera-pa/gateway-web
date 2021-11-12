import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';
import datasetOnboardingService from '../../../../services/dataset-onboarding/dataset-onboarding';
import './AccountDatasetDecisionModal.scss';

const AccountDatasetRejectModal = ({
	id,
	open,
	closed,
	goToNext,
	showGoToNext
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
			applicationStatusDesc: ''
		},
		validationSchema: Yup.object({
			applicationStatusDesc: Yup.string().required('Description cannot be empty'),
		}),
		onSubmit: async values => {
			const payload = {
				...values,
				id,
				applicationStatus: 'rejected'
			};
			datasetOnboardingService.usePutDatasetOnboarding(payload);
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
				<CloseButtonSvg data-testid="close-modal" className='account-dataset-decision-modal-close' onClick={closed} />
				<div className='account-dataset-decision-header--wrap'>
					<h4 className='black-20'>Reject this version of this dataset metadata</h4>
				</div>
			</div>

			<div className='account-dataset-decision-body'>
				<div className='account-dataset-decision-body--wrap'>
					<p>Let the editor know why this submission is being rejected. They will be able to create a new version and make a new submission.</p>
					<label className='black-14'>Description</label>
					<Form.Control
						data-test-id='dataset-reject-applicationStatusDesc'
						id='applicationStatusDesc'
						name='applicationStatusDesc'
						type='textarea'
						className={touched.applicationStatusDesc && errors.applicationStatusDesc && 'save-modal-input'}
						onChange={handleChange}
						value={values.applicationStatusDesc}
						onBlur={handleBlur}
					/>
					{touched.applicationStatusDesc && errors.applicationStatusDesc ? <div className='errorMessages'>{errors.applicationStatusDesc}</div> : null}
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
						data-testid="reject-button"
						className='button-secondary'
						style={{ marginLeft: 'auto' }}
						onClick={async () => {
							handleSubmit();
							closed();
						}}>
						Reject
					</Button>
					<Button
						disabled={!showGoToNext}
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
