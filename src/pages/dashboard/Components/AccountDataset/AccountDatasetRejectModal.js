import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();

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
			applicationStatusDesc: Yup.string(),
		}),
		onSubmit: values => {
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
					<h4 className='black-20'>{t('dataset.rejectModal.title')}</h4>
				</div>
			</div>

			<form onsubmit={handleSubmit}>
			<div className='account-dataset-decision-body'>
				<div className='account-dataset-decision-body--wrap'>
					<p>{t('dataset.rejectModal.description')}</p>
					<label forHtml="applicationStatusDesc" className='black-14'>{t('dataset.rejectModal.applicationStatus')}</label>
					<Form.Control
						data-testid='dataset-reject-applicationStatusDesc'
						id='applicationStatusDesc'
						name='applicationStatusDesc'
						type='textarea'
						className={touched.applicationStatusDesc && errors.applicationStatusDesc && 'save-modal-input'}
						onChange={handleChange}
						value={values.applicationStatusDesc}
						onBlur={handleBlur}
						role="textarea"
					/>
					{touched.applicationStatusDesc && errors.applicationStatusDesc ? <div className='errorMessages'>{errors.applicationStatusDesc}</div> : null}
				</div>
			</div>
			<div className='account-dataset-decision-footer'>
				<div data-testid='button-container'
					className='account-dataset-decision-footer--wrap'>
					<Button
						className='button-secondary'
						style={{ marginLeft: 'auto' }}
						onClick={() => {
							closed();
						}}>
						{t('dataset.rejectModal.buttons.cancel')}
					</Button>
					<Button
						type="submit"
						data-testid="reject-button"
						className='button-secondary'
						style={{ marginLeft: 'auto' }}
						onClick={async () => {
							handleSubmit();
							closed();
						}}>
						{t('dataset.rejectModal.buttons.reject')}
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
						{t('dataset.rejectModal.buttons.rejectAndGoToNext')}
					</Button>
				</div>
			</div>
			</form>
		</Modal>
	);
};

export default AccountDatasetRejectModal;
