import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { TEXTAREA_ROWS } from '../../../../configs/constants';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';
import datasetOnboardingService from '../../../../services/dataset-onboarding/dataset-onboarding';
import './AccountDatasetDecisionModal.scss';

const AccountDatasetRejectModal = ({ id, open, closed, goToNext, handleReject, showGoToNext }) => {
	const { t } = useTranslation();

	const rejectDataset = async values => {
		const payload = {
			...values,
			id,
			applicationStatus: 'rejected',
		};

		await datasetOnboardingService.putDatasetOnboarding(id, payload);
	};

	return (
		<Modal show={open} onHide={closed} className='decisionModal' size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<div className='decisionModal-header'>
				<div className='decisionModal-header--wrap'>
					<div className='decisionModal-head'>
						<h1 className='black-20-semibold'>{t('dataset.rejectModal.title')}</h1>
						<CloseButtonSvg data-testid='close-modal' className='decisionModal-head--close' onClick={closed} />
					</div>
				</div>
			</div>
			<Formik
				initialValues={{
					applicationStatusDesc: '',
				}}
				validationSchema={Yup.object({
					applicationStatusDesc: Yup.string()
						.max(1500, 'Description must be less than 1500 characters')
						.required('Description should not be empty'),
				})}
				onSubmit={async values => {
					await rejectDataset(values);

					handleReject({
						publisher: '',
						tab: 'inReview',
						message: `You have rejected the dataset`,
					});
				}}>
				{({ values, errors, isValid, dirty, handleChange, handleBlur, handleSubmit }) => (
					<Form onSubmit={handleSubmit} onBlur={handleBlur}>
						<div className='decisionModal-body'>
							<div className='decisionModal-body--wrap'>
								<p data-testid='description'>{t('dataset.rejectModal.description')}</p>
								<Form.Group>
									<label for='applicationStatusDesc' className='black-14'>
										{t('dataset.rejectModal.applicationStatus')}
										<span>{values.applicationStatusDesc.length}/1500</span>
									</label>
									<Form.Control
										as='textarea'
										data-testid='dataset-reject-applicationStatusDesc'
										id='applicationStatusDesc'
										name='applicationStatusDesc'
										type='text'
										onChange={handleChange}
										value={values.applicationStatusDesc}
										onBlur={handleBlur}
										rows={TEXTAREA_ROWS}
									/>
									{errors.applicationStatusDesc ? <div className='errorMessages'>{errors.applicationStatusDesc}</div> : null}
								</Form.Group>
							</div>
						</div>
						<div className='decisionModal-footer'>
							<div data-testid='button-container' className='decisionModal-footer--wrap'>
								<Button
									className='button-secondary'
									onClick={() => {
										closed();
									}}>
									{t('dataset.rejectModal.buttons.cancel')}
								</Button>
								<Button
									disabled={!isValid || !dirty}
									type='submit'
									data-testid='reject-button'
									className='button-secondary'
									style={{ marginLeft: '10px' }}>
									{t('dataset.rejectModal.buttons.reject')}
								</Button>
								<Button
									disabled={!showGoToNext || !isValid || !dirty}
									className='button-secondary'
									style={{ marginLeft: '10px' }}
									onClick={async () => {
										await rejectDataset(values);
										goToNext();
									}}>
									{t('dataset.rejectModal.buttons.rejectAndGoToNext')}
								</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default AccountDatasetRejectModal;
