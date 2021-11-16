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
				className='decisionModal'
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<div className='decisionModal-header'>
					<div className='decisionModal-header--wrap'>
						<div className='decisionModal-head'>
							<h1 className='black-20-semibold'>{t('dataset.approvalModal.title')}</h1>
							<CloseButtonSvg className='decisionModal-head--close' onClick={closed} />
						</div>
					</div>
				</div>

				<div className='decisionModal-body'>
					<div className='decisionModal-body--wrap'>
						<p>{t('dataset.approvalModal.description')}</p>
						<label forHtml="applicationStatusDesc" className='black-14'>{t('dataset.approvalModal.applicationStatus')}</label>
						<Form.Control
							data-test-id='dataset-approve-applicationStatusDesc'
							id='applicationStatusDesc'
							name='applicationStatusDesc'
							type='textarea'
							onChange={handleChange}
							value={values.applicationStatusDesc}
							onBlur={handleBlur}
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
							{t('dataset.approvalModal.buttons.cancel')}
						</Button>
						<Button
							data-testid='approve-button'
							className='button-secondary'
							style={{ marginLeft: '10px' }}
							onClick={async () => {
								handleSubmit();
								closed();
							}}>
							{t('dataset.approvalModal.buttons.approve')}
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
							{t('dataset.approvalModal.buttons.approveAndGoToNext')}
						</Button>
					</div>
				</div>
			</Modal>
		</Suspense>
	);
};

export default AccountDatasetApproveModal;
