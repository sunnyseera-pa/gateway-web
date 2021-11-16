import React, { Suspense } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';
import datasetOnboardingService from '../../../../services/dataset-onboarding/dataset-onboarding';
import './AccountDatasetDecisionModal.scss';

const AccountDatasetApproveModal = ({
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
				applicationStatus: 'approved'
			};
			datasetOnboardingService.usePutDatasetOnboarding(payload);
		},
	});

	return (
		<Suspense fallback={t('loading')}>
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
						<h4 className='black-20'>{t('dataset.approvalModal.title')}</h4>
					</div>
				</div>

				<div className='account-dataset-decision-body'>
					<div className='account-dataset-decision-body--wrap'>
						<p>{t('dataset.approvalModal.description')}</p>
						<label forHtml="applicationStatusDesc" className='black-14'>{t('dataset.approvalModal.applicationStatus')}</label>
						<Form.Control
							data-test-id='dataset-approve-applicationStatusDesc'
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
					<div data-testid='button-container'
						className='account-dataset-decision-footer--wrap'>
						<Button
							className='button-secondary'
							style={{ marginLeft: 'auto' }}
							onClick={() => {
								closed();
							}}>
							{t('dataset.approvalModal.buttons.cancel')}
						</Button>
						<Button
							data-testid='approve-button'
							className='button-secondary'
							style={{ marginLeft: 'auto' }}
							onClick={async () => {
								handleSubmit();
								closed();
							}}>
							{t('dataset.approvalModal.buttons.approve')}
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
							{t('dataset.approvalModal.buttons.approveAndGoToNext')}
						</Button>
					</div>
				</div>
			</Modal>
		</Suspense>
	);
};

export default AccountDatasetApproveModal;
