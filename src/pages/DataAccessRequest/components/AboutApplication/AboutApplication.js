import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Accordion, Card, Overlay, OverlayTrigger } from 'react-bootstrap';
import DarHelper from '../../../../utils/DarHelper.util';
import SVGIcon from '../../../../images/SVGIcon';
import { ReactComponent as InfoSVG } from '../../../../images/info.svg';
import TypeaheadDataset from '../TypeaheadDataset/TypeaheadDataset';

import { useTranslation } from 'react-i18next';

const AboutApplication = props => {
	let {
		key,
		activeAccordionCard,
		allowedNavigation,
		userType,
		toggleCard,
		toggleDrawer,
		onHandleDataSetChange,
		selectedDatasets,
		readOnly = false,
		onNextStep,
		projectNameValid = true,
		projectName = '',
		onHandleProjectNameBlur,
		onHandleProjectNameChange,
		onHandleProjectIsNCSToggle,
		onHandleNCSProjectChange,
		renderTooltip,
		nationalCoreStudiesProjects,
		ncsValid = true,
		toggleModal,
		completedReadAdvice = false,
		completedCommunicateAdvice = false,
		completedApprovalsAdvice = false,
		completedSubmitAdvice: isCheckboxMarked,
		completedInviteCollaborators = false,
		completedDatasetSelection = false,
		isNationalCoreStudies = false,
		nationalCoreStudiesProjectId,
		toggleMrcModal,
		toggleContributorModal,
		context,
	} = props;

	const { t } = useTranslation('common');

	return (
		<div className='aboutAccordion'>
			<Accordion defaultActiveKey='0' activeKey={activeAccordionCard.toString()}>
				<Card className={activeAccordionCard === 0 ? 'activeCard' : ''}>
					<Accordion.Toggle
						as={Card.Header}
						className={DarHelper.calcAccordionClasses(activeAccordionCard === 0, allowedNavigation)}
						eventKey='0'
						onClick={e => toggleCard(e, 0)}>
						{completedDatasetSelection ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>1</div>
						)}
						{t('dataAccessRequestForm.aboutThisApplicationSection.datasets.title')}
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='0'>
						<Card.Body className='gray800-14'>
							<div style={{ whiteSpace: 'pre-line' }} className='margin-bottom-16'>
								{t('dataAccessRequestForm.aboutThisApplicationSection.datasets.paragraphOne')}{' '}
								<Link
									id='messageLink'
									className={allowedNavigation && userType.toUpperCase() !== 'CUSTODIAN' ? '' : 'disabled'}
									onClick={e => toggleDrawer()}>
									{t('dataAccessRequestForm.aboutThisApplicationSection.datasets.paragraphTwo')}
								</Link>{' '}
							</div>
							<div>
								<span>{t('dataAccessRequestForm.aboutThisApplicationSection.datasets.paragraphThree')}</span>
								<div className='form-group'>
									<TypeaheadDataset
										key={key}
										selectedDatasets={selectedDatasets}
										onHandleDataSetChange={e => onHandleDataSetChange(e)}
										readOnly={readOnly}
										allowAllCustodians={false}
									/>
								</div>
								{_.isEmpty(selectedDatasets) ? (
									<div className='errorMessages'>{t('dataAccessRequestForm.aboutThisApplicationSection.datasets.errorOne')}</div>
								) : null}
								<div className='panConfirm'>
									{userType.toUpperCase() === 'APPLICANT' ? (
										<button
											type='input'
											className={`button-primary ${allowedNavigation ? '' : 'disabled'}`}
											disabled={!allowedNavigation}
											onClick={e => {
												onNextStep(allowedNavigation);
											}}>
											{t('button.confirm')}
										</button>
									) : (
										''
									)}
								</div>
							</div>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card className={activeAccordionCard === 1 ? 'activeCard' : ''}>
					<Accordion.Toggle
						as={Card.Header}
						className={DarHelper.calcAccordionClasses(activeAccordionCard === 1, allowedNavigation)}
						eventKey='1'
						onClick={e => toggleCard(e, 1)}>
						{projectNameValid && ncsValid && !_.isEmpty(projectName) ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>2</div>
						)}
						{t('dataAccessRequestForm.aboutThisApplicationSection.applicationName.title')}
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='1'>
						<Card.Body className='gray800-14'>
							<div className='margin-bottom-16'>{t('dataAccessRequestForm.aboutThisApplicationSection.applicationName.paragraphOne')}</div>
							<div>
								<span>{t('dataAccessRequestForm.aboutThisApplicationSection.applicationName.paragraphTwo')}</span>
								<div className='form-group'>
									<input
										className={`form-control ${!projectNameValid && _.isEmpty(projectName) ? 'emptyFormInput' : ''}`}
										name='projectName'
										onBlur={e => onHandleProjectNameBlur()}
										onChange={e => onHandleProjectNameChange(e.target.value)}
										value={projectName}
										disabled={readOnly}
									/>
									{!projectNameValid && _.isEmpty(projectName) ? (
										<div className='errorMessages'>{t('dataAccessRequestForm.aboutThisApplicationSection.applicationName.errorOne')}</div>
									) : null}
								</div>
								<div className='panConfirm'>
									{userType.toUpperCase() === 'APPLICANT' ? (
										<button
											type='input'
											className={`button-primary ${allowedNavigation ? '' : 'disabled'}`}
											disabled={!allowedNavigation}
											onClick={e => onNextStep(allowedNavigation)}>
											{t('button.confirm')}
										</button>
									) : (
										''
									)}
								</div>
							</div>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				{/* <Card className={activeAccordionCard === 2 ? 'activeCard' : ''}>
					<Accordion.Toggle
						as={Card.Header}
						className={DarHelper.calcAccordionClasses(activeAccordionCard === 2, allowedNavigation)}
						eventKey='2'
						onClick={e => toggleCard(e, 2)}>
						{completedInviteCollaborators ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>3</div>
						)}
						{t('dataAccessRequestForm.aboutThisApplicationSection.contributors.title')}
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='2'>
						<Card.Body className='gray800-14'>
							<Fragment>
								<div className='margin-bottom-16'>
								{t('dataAccessRequestForm.aboutThisApplicationSection.contributors.paragraphOne')}
								</div>
								<div className='dar-form-check-group'>
									{userType.toUpperCase() !== 'CUSTODIAN' ? (
										<button className='button-secondary' type='button' onClick={(e) => toggleContributorModal()}>
											{t('dataAccessRequestForm.aboutThisApplicationSection.contributors.addContributorsButton')}
										</button>
									) : (
										''
									)}
									<input
										type='checkbox'
										id='chkInviteContributors'
										checked={completedInviteCollaborators}
										className='dar-form-check'
										disabled={readOnly}
										onChange={e => onNextStep(e.target.checked)}
									/>
									<span className='dar-form-check-label'>	{t('dataAccessRequestForm.stepCompleted')}</span>
								</div>
							</Fragment>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card className={activeAccordionCard === 3 ? 'activeCard' : ''}>
					<Accordion.Toggle
						as={Card.Header}
						className={DarHelper.calcAccordionClasses(activeAccordionCard === 3, allowedNavigation)}
						eventKey='3'
						onClick={e => toggleCard(e, 3)}>
						{completedReadAdvice ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>4</div>
						)}
						{t('dataAccessRequestForm.aboutThisApplicationSection.dataCustodianAdvice.title')}
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='3'>
						<Card.Body className='gray800-14'>
							<Fragment>
								<div className='margin-bottom-16'>
								{t('dataAccessRequestForm.aboutThisApplicationSection.dataCustodianAdvice.paragraphOne')}
								</div>
								<div className='dar-form-check-group'>
									<input
										type='checkbox'
										id='chkReadAdvice'
										checked={completedReadAdvice}
										className='dar-form-check'
										disabled={readOnly}
										onChange={e => onNextStep(e.target.checked)}
									/>
									<span className='dar-form-check-label'>
									{t('dataAccessRequestForm.aboutThisApplicationSection.dataCustodianAdvice.paragraphTwo')}{' '}
										<Link
											id='howToRequestAccessLink'
											className={allowedNavigation && userType.toUpperCase() !== 'CUSTODIAN' ? '' : 'disabled'}
											onClick={e =>
												toggleModal(false, {
													...context,
													showActionButtons: false,
												})
											}
										>
											{t('dataAccessRequestForm.aboutThisApplicationSection.dataCustodianAdvice.paragraphThree')}
										</Link>
									</span>
								</div>
							</Fragment>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card className={activeAccordionCard === 4 ? 'activeCard' : ''}>
					<Accordion.Toggle
						as={Card.Header}
						className={DarHelper.calcAccordionClasses(activeAccordionCard === 4, allowedNavigation)}
						eventKey='4'
						onClick={e => toggleCard(e, 4)}>
						{completedCommunicateAdvice ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>5</div>
						)}
				{t('dataAccessRequestForm.aboutThisApplicationSection.dataCustodianCommunication.title')}
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='4'>
						<Card.Body className='gray800-14'>
							<Fragment>
								<div className='margin-bottom-16'>
								{t('dataAccessRequestForm.aboutThisApplicationSection.dataCustodianCommunication.paragraphOne')}
								</div>
								<div className='dar-form-check-group'>
									{userType.toUpperCase() !== 'CUSTODIAN' ? (
										<button className='button-secondary' type='button' onClick={(e) => toggleDrawer()}>
											{t('button.sendMessage')}
										</button>
									) : (
										''
									)}
									<input
										type='checkbox'
										id='chkCommunicateAdvice'
										checked={completedCommunicateAdvice}
										className='dar-form-check'
										disabled={readOnly ? true : false}
										onChange={e => onNextStep(e.target.checked)}
									/>
									<span className='dar-form-check-label'>	{t('dataAccessRequestForm.stepCompleted')}</span>
								</div>
							</Fragment>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card className={activeAccordionCard === 5 ? 'activeCard' : ''}>
					<Accordion.Toggle
						as={Card.Header}
						className={DarHelper.calcAccordionClasses(activeAccordionCard === 5, allowedNavigation)}
						eventKey='5'
						onClick={e => toggleCard(e, 5)}>
						{completedApprovalsAdvice ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>6</div>
						)}
						{t('dataAccessRequestForm.aboutThisApplicationSection.approvalsCheck.title')}
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='5'>
						<Card.Body className='gray800-14'>
							<Fragment>
								<div className='margin-bottom-16'>
									<p>{t('dataAccessRequestForm.aboutThisApplicationSection.approvalsCheck.paragraphOne')}</p>
									<p>{t('dataAccessRequestForm.aboutThisApplicationSection.approvalsCheck.paragraphTwo')}</p>
									<p>{t('dataAccessRequestForm.aboutThisApplicationSection.approvalsCheck.paragraphThree')}</p>
									<p><a
										id='approvedResearcherLink'
										target='_blank'
										rel='noopener noreferrer'
										href='https://www.ons.gov.uk/aboutus/whatwedo/statistics/requestingstatistics/approvedresearcherscheme#becoming-an-approved-researcher-through-the-ons-approved-researcher-scheme'
									>
									{t('dataAccessRequestForm.aboutThisApplicationSection.approvalsCheck.paragraphFour')}
									</a></p>
									<p><a
										id='infoGovernanceLink'
										target='_blank'
										rel='noopener noreferrer'
										href='https://web.www.healthdatagateway.org/collection/4782731178031727'
									>
										{t('dataAccessRequestForm.aboutThisApplicationSection.approvalsCheck.paragraphFive')}
									</a></p>
									<h2>{t('dataAccessRequestForm.aboutThisApplicationSection.approvalsCheck.paragraphSix')}</h2>
									<p>{t('dataAccessRequestForm.aboutThisApplicationSection.approvalsCheck.paragraphSeven')}</p>
									<p><a
										id='dsptLink'
										target="_blank"
										rel='noopener noreferrer'
										href='https://www.dsptoolkit.nhs.uk/Account/Register'
									>
										{t('dataAccessRequestForm.aboutThisApplicationSection.approvalsCheck.paragraphEight')}
									</a></p>
									<p>{t('dataAccessRequestForm.aboutThisApplicationSection.approvalsCheck.paragraphNine')}</p>
								</div>
								<div className='dar-form-check-group'>
									<button className='button-secondary' type='button' onClick={(e) => toggleMrcModal()}>
									{t('dataAccessRequestForm.aboutThisApplicationSection.approvalsCheck.buttonOne')}
									</button>
									<input
										type='checkbox'
										id='chkApprovalAdvice'
										checked={completedApprovalsAdvice}
										className='dar-form-check'
										disabled={readOnly ? true : false}
										onChange={e => onNextStep(e.target.checked)}
									/>
									<span className='dar-form-check-label'>{t('dataAccessRequestForm.stepCompleted')}</span>
								</div>
							</Fragment>
						</Card.Body>
					</Accordion.Collapse>
				</Card> */}
				<Card className={activeAccordionCard === 2 ? 'activeCard' : ''}>
					<Accordion.Toggle
						as={Card.Header}
						className={DarHelper.calcAccordionClasses(activeAccordionCard === 2, allowedNavigation)}
						eventKey='2'
						onClick={e => toggleCard(e, 2)}>
						{isCheckboxMarked ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>3</div>							
						)}
						{t('dataAccessRequestForm.aboutThisApplicationSection.AfterYourSubmission.title')}
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='2'>
						<Card.Body className='gray800-14'>
							<Fragment>
								<div className='margin-bottom-16'>
									{t('dataAccessRequestForm.aboutThisApplicationSection.AfterYourSubmission.paragraphOne')}
								</div>
								<div className='margin-bottom-16'>
									<ul>
										<li>{t('dataAccessRequestForm.aboutThisApplicationSection.AfterYourSubmission.paragraphTwo')}</li>
										<li>{t('dataAccessRequestForm.aboutThisApplicationSection.AfterYourSubmission.paragraphThree')}</li>
										<li>{t('dataAccessRequestForm.aboutThisApplicationSection.AfterYourSubmission.paragraphFour')}</li>
									</ul>
								</div>
								<div className='margin-bottom-16'>
									{t('dataAccessRequestForm.aboutThisApplicationSection.AfterYourSubmission.paragraphFive')}
								</div>
								<div className='dar-form-check-group'>
									<input
										type='checkbox'
										id='chkSubmitAdvice'
										checked={isCheckboxMarked}
										className='dar-form-check'
										disabled={readOnly ? true : false}
										onChange={e => onNextStep(e.target.checked)}
									/>
									<span className='dar-form-check-label'>{t('dataAccessRequestForm.informationRead')}</span>
								</div>
								{(!isCheckboxMarked) ? (
									<div className='errorMessages'>{t('dataAccessRequestForm.aboutThisApplicationSection.AfterYourSubmission.errorOne')}</div>
								) : null}
							</Fragment>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</div>
	);
};

export default AboutApplication;
