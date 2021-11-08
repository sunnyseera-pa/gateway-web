import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Accordion, Card, Overlay, OverlayTrigger } from 'react-bootstrap';
import DarHelper from '../../../../utils/DarHelper.util';
import SVGIcon from '../../../../images/SVGIcon';
import { ReactComponent as InfoSVG } from '../../../../images/info.svg';
import TypeaheadDataset from '../TypeaheadDataset/TypeaheadDataset';
import AlertBox from '../AlertBox/AlertBox';
import moment from 'moment';
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
		completedSubmitAdvice = false,
		completedInviteCollaborators = false,
		completedDatasetSelection = false,
		isNationalCoreStudies = false,
		nationalCoreStudiesProjectId,
		toggleMrcModal,
		toggleContributorModal,
		context,
		areDatasetsAmended = false,
		datasetsAmendedDate = '',
	} = props;

	const datasetsAmendedMessage = `Applicant has requested this as an amendment to the approved application on ${moment(
		datasetsAmendedDate
	).format('Do MMM YYYY')}`;

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
								<a
									id='messageLink'
									className={allowedNavigation && userType.toUpperCase() !== 'CUSTODIAN' ? '' : 'disabled'}
									onClick={e => toggleDrawer()}>
									{t('dataAccessRequestForm.aboutThisApplicationSection.datasets.paragraphTwo')}
								</a>{' '}
								to clarify. The custodian will help you understand if the data you would like to access can be used to answer your research
								question. Below you can include datasets that are listed in the Gateway. Please note that you will be able to add datasets
								not currently listed in the Gateway under the ‘Safe people’ section of this form. If you need to request access to datasets
								from multiple data custodians please contact the custodians using the messaging function before completing the application
								form.
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
								{_.isEmpty(selectedDatasets) ? <div className='errorMessages'>{t('dataAccessRequestForm.aboutThisApplicationSection.datasets.errorOne')}</div> : null}
								<div className='panConfirm d-flex justify-content-end'>
									{userType.toUpperCase() === 'APPLICANT' && !readOnly && (
										<button
											type='input'
											className={`button-primary ${allowedNavigation ? '' : 'disabled'}`}
											disabled={!allowedNavigation}
											onClick={e => {
												onNextStep(allowedNavigation);
											}}>
											{t('button.confirm')}
										</button>
									)}
								</div>
							</div>
							{areDatasetsAmended && <AlertBox text={datasetsAmendedMessage} status='WARNING' />}
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
									{!projectNameValid && _.isEmpty(projectName) ? <div className='errorMessages'>{t('dataAccessRequestForm.aboutThisApplicationSection.applicationName.errorOne')}</div> : null}
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
									<p>
										Before requesting access to health data, you might need to demonstrate that everyone involved in the project has
										appropriate information governance training and / or seek approvals for research projects (e.g. ethics). For example, to
										access administrative data from custodians such as the Office for National Statistics you need to be an accredited
										researcher under the Digital Economy Act.
									</p>
									<p>
										Alternatively you might be asked to demonstrate that you have or are planning to attend recognised Information
										Governance training.
									</p>
									<p>Contact the data custodian to know more about recognised training and accreditation.</p>
									<p>
										<a
											id='approvedResearcherLink'
											target='_blank'
											rel='noopener noreferrer'
											href='https://www.ons.gov.uk/aboutus/whatwedo/statistics/requestingstatistics/approvedresearcherscheme#becoming-an-approved-researcher-through-the-ons-approved-researcher-scheme'>
											Becoming an approved researcher through the ONS approved researcher scheme
										</a>
									</p>
									<p>
										<a
											id='infoGovernanceLink'
											target='_blank'
											rel='noopener noreferrer'
											href='https://web.www.healthdatagateway.org/collection/4782731178031727'>
											Information governance training recognised by some data custodians
										</a>
									</p>
									<h2>Data Security</h2>
									<p>
										Data custodians require you to provide assurance that your organisation has appropriate data security processes in
										place. For example, use of NHS England data has to meet the standards set out in the Data Security Protection Toolkit.
										We encourage you to contact the data custodian for more information.
									</p>
									<p>
										<a id='dsptLink' target='_blank' rel='noopener noreferrer' href='https://www.dsptoolkit.nhs.uk/Account/Register'>
											DSPT
										</a>
									</p>
									<p>
										The MRC Health Data Access toolkit aims to help you understand some of the approvals required for your research project.
										Data custodians request that these approvals are in place before you gain access to data.
									</p>
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
						{completedSubmitAdvice ? (
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

								{(!completedSubmitAdvice) ? (
										<div className='errorMessages'>{t('dataAccessRequestForm.aboutThisApplicationSection.applicationName.errorOne')}</div>
									) : null}
								<div className='dar-form-check-group'>
									<input
										type='checkbox'
										id='chkSubmitAdvice'
										checked={completedSubmitAdvice}
										className='dar-form-check'
										disabled={readOnly ? true : false}
										onChange={e => onNextStep(e.target.checked)}
									/>
									<span className='dar-form-check-label'>{t('dataAccessRequestForm.informationRead')}</span>
								</div>
							</Fragment>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</div>
	);
};

export default AboutApplication;
