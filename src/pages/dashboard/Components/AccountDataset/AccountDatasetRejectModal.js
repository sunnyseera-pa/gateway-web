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
			className='decisionModal'
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<div className='decisionModal-header'>
				<div className='decisionModal-header--wrap'>
					<div className='decisionModal-head'>
						<h1 className='black-20-semibold'>{t('dataset.rejectModal.title')}</h1>
						<CloseButtonSvg data-testid="close-modal" className='decisionModal-head--close' onClick={closed} />
					</div>
				</div>
			</div>

			<form onsubmit={handleSubmit}>
			<div className='decisionModal-body'>
				<div className='decisionModal-body--wrap'>
					<p>{t('dataset.rejectModal.description')}</p>
					<label forHtml="applicationStatusDesc" className='black-14'>{t('dataset.rejectModal.applicationStatus')}</label>
					<Form.Control
						data-testid='dataset-reject-applicationStatusDesc'
						id='applicationStatusDesc'
						name='applicationStatusDesc'
						type='textarea'
						onChange={handleChange}
						value={values.applicationStatusDesc}
						onBlur={handleBlur}
						role="textarea"
					/>
					{touched.applicationStatusDesc && errors.applicationStatusDesc ? <div className='errorMessages'>{errors.applicationStatusDesc}</div> : null}
				</div>
			</div>
			<div className='decisionModal-footer'>
				<div data-testid='button-container'
					className='decisionModal-footer--wrap'>
					<Button
						className='button-secondary'
						onClick={() => {
							closed();
						}}>
						{t('dataset.rejectModal.buttons.cancel')}
					</Button>
					<Button
						type="submit"
						data-testid="reject-button"
						className='button-secondary'
						style={{ marginLeft: '10px' }}
						onClick={async () => {
							handleSubmit();
							closed();
						}}>
						{t('dataset.rejectModal.buttons.reject')}
					</Button>
					<Button
						disabled={!showGoToNext}
						className='button-secondary'
						style={{ marginLeft: '10px' }}
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
