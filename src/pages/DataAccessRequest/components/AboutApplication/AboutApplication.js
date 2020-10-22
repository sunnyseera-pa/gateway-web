import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Accordion, Card, Overlay, OverlayTrigger } from 'react-bootstrap';
import DarHelper from '../../../../utils/DarHelper.util';
import SVGIcon from '../../../../images/SVGIcon';
import { ReactComponent as InfoSVG } from '../../../../images/info.svg';
import TypeaheadDataset from '../TypeaheadDataset/TypeaheadDataset';

const AboutApplication = (props) => {
	let {
		activeAccordionCard,
		allowedNavigation,
		userType,
		toggleCard,
		toggleDrawer,
		onHandleDataSetChange,
		selectedDatasets,
		readOnly,
		onNextStep,
		projectNameValid,
		projectName,
		onHandleProjectNameBlur,
		onHandleProjectNameChange,
		onHandleProjectIsNCSToggle,
		onHandleNCSProjectChange,
		renderTooltip,
		nationalCoreStudiesProjects,
		ncsValid,
		toggleModal,
		completedReadAdvice,
		completedCommunicateAdvice,
		completedApprovalsAdvice,
		completedSubmitAdvice,
		completedInviteCollaborators,
		completedDatasetSelection,
		isNationalCoreStudies,
		nationalCoreStudiesProjectId,
		toggleMrcModal,
		toggleContributorModal
	} = props;

	return (
		<div className='aboutAccordion'>
			<Accordion defaultActiveKey='0' activeKey={activeAccordionCard.toString()}>
				<Card className={activeAccordionCard === 0 ? 'activeCard' : ''}>
					<Accordion.Toggle
						as={Card.Header}
						className={DarHelper.calcAccordionClasses(activeAccordionCard === 0, allowedNavigation)}
						eventKey='0'
						onClick={(e) => toggleCard(e, 0)}
					>
						{completedDatasetSelection ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>1</div>
						)}
						Select the datasets you need
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='0'>
						<Card.Body className='gray800-14'>
							<div className='margin-bottom-16'>
								If you’re not sure,{' '}
								<Link
									id='messageLink'
									className={allowedNavigation && userType.toUpperCase() !== 'CUSTODIAN' ? '' : 'disabled'}
									onClick={(e) => toggleDrawer()}
								>
									send a message to the data custodian
								</Link>{' '}
								to clarify. The datasets you select may impact the questions being asked in this application form. You cannot change this
								later.
							</div>
							<div>
								<span>Datasets</span>
								<div className='form-group'>
									<TypeaheadDataset
										selectedDatasets={selectedDatasets}
										onHandleDataSetChange={(e) => onHandleDataSetChange()}
										readOnly={readOnly}
									/>
								</div>
								{_.isEmpty(selectedDatasets) ? <div className='errorMessages'>You must select at least one dataset</div> : null}
								<div className='panConfirm'>
									{userType.toUpperCase() === 'APPLICANT' ? (
										<button
											type='input'
											className={`button-primary ${allowedNavigation ? '' : 'disabled'}`}
											disabled={!allowedNavigation}
											onClick={(e) => {
												onNextStep(allowedNavigation);
											}}
										>
											Confirm
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
						onClick={(e) => toggleCard(e, 1)}
					>
						{projectNameValid && ncsValid && !_.isEmpty(projectName.trim()) ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>2</div>
						)}
						Name your application
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='1'>
						<Card.Body className='gray800-14'>
							<div className='margin-bottom-16'>
								This can be your project name or anything that helps the custodian identify your application.
							</div>
							<div>
								<span>Application title</span>
								<div className='form-group'>
									<input
										className={`form-control ${!projectNameValid && _.isEmpty(projectName) ? 'emptyFormInput' : ''}`}
										name='projectName'
										onBlur={(e) => onHandleProjectNameBlur()}
										onChange={(e) => onHandleProjectNameChange(e.target.value)}
										value={projectName}
										disabled={readOnly}
									/>
									{!projectNameValid && _.isEmpty(projectName) ? <div className='errorMessages'>This cannot be empty</div> : null}
								</div>
								<div className='dar-form-check-group margin-top-8'>
									<input
										type='checkbox'
										id='chkNationalCoreStudies'
										checked={isNationalCoreStudies}
										className='dar-form-check'
										disabled={readOnly}
										onChange={(e) => onHandleProjectIsNCSToggle(e)}
									/>
									<span className='dar-form-check-label'>This application is part of a National Core Studies project</span>

									<OverlayTrigger
										placement='top'
										delay={{ show: 250, hide: 400 }}
										overlay={renderTooltip('We use this information for overall reporting on the efficiency of the programme.')}
									>
										<InfoSVG className='margin-left-8 pointer' />
									</OverlayTrigger>
								</div>
								{isNationalCoreStudies ? (
									<Fragment>
										<div className='margin-top-24'>
											<span>National Core Studies project</span>
											<OverlayTrigger
												placement='top'
												delay={{ show: 250, hide: 400 }}
												overlay={renderTooltip(
													'Projects must be added to the Gateway first using the appropriate tags associated with the National Core Studies.'
												)}
											>
												<InfoSVG className='margin-left-8 pointer' viewBox='0 0 24 16' />
											</OverlayTrigger>
										</div>
										<div className='form-group'>
											<select
												id='ddlNationalCoreStudiesProject'
												className='form-input-dropdown'
												value={nationalCoreStudiesProjectId}
												onChange={(e) => onHandleNCSProjectChange(e.target.value)}
												disabled={readOnly}
											>
												<option key='' value=''>
													Select a project
												</option>
												{nationalCoreStudiesProjects.map((item) => (
													<option key={item._id} value={item._id}>
														{item.name}
													</option>
												))}
											</select>
											{!ncsValid ? <div className='errorMessages'>You must indicate a project or untick the option above</div> : null}
										</div>
									</Fragment>
								) : null}
								<div className='panConfirm'>
									{userType.toUpperCase() === 'APPLICANT' ? (
										<button
											type='input'
											className={`button-primary ${allowedNavigation ? '' : 'disabled'}`}
											disabled={!allowedNavigation}
											onClick={(e) => onNextStep(allowedNavigation)}
										>
											Confirm
										</button>
									) : (
										''
									)}
								</div>
							</div>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card className={activeAccordionCard === 2 ? 'activeCard' : ''}>
					<Accordion.Toggle
						as={Card.Header}
						className={DarHelper.calcAccordionClasses(activeAccordionCard === 2, allowedNavigation)}
						eventKey='2'
						onClick={(e) => toggleCard(e, 2)}
					>
						{completedReadAdvice ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>3</div>
						)}
						Read the advice from the data custodian
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='2'>
						<Card.Body className='gray800-14'>
							<Fragment>
								<div className='margin-bottom-16'>
									If you haven’t already, please make sure you have read the advice provided by the data custodian on how to request access
									to their datasets.
								</div>
								<div className='dar-form-check-group'>
									<input
										type='checkbox'
										id='chkReadAdvice'
										checked={completedReadAdvice}
										className='dar-form-check'
										disabled={readOnly}
										onChange={(e) => onNextStep(e.target.checked)}
									/>
									<span className='dar-form-check-label'>
										I have read{' '}
										<Link
											id='howToRequestAccessLink'
											className={allowedNavigation && userType.toUpperCase() !== 'CUSTODIAN' ? '' : 'disabled'}
											onClick={(e) =>
												toggleModal(false, {
													...this.state.context,
													showActionButtons: false
												})
											}
										>
											how to request access
										</Link>
									</span>
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
						onClick={(e) => toggleCard(e, 3)}
					>
						{completedCommunicateAdvice ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>4</div>
						)}
						Communicate with the data custodian
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='3'>
						<Card.Body className='gray800-14'>
							<Fragment>
								<div className='margin-bottom-16'>
									The earlier you get in touch, the better. A lot of projects are not eligible for data access, so it’s important you
									clarify with the custodian whether they have the data you need, and whether you have a chance of getting access. If you've
									not done so yet, we recommend sending a message with a brief description of your project and the data you are interested
									in.
								</div>
								<div className='dar-form-check-group'>
									{userType.toUpperCase() !== 'CUSTODIAN' ? (
										<button className='button-secondary' type='button' onClick={(e) => toggleDrawer()}>
											Send message
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
										onChange={(e) => onNextStep(e.target.checked)}
									/>
									<span className='dar-form-check-label'>I have completed this step</span>
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
						onClick={(e) => toggleCard(e, 4)}
					>
						{completedApprovalsAdvice ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>5</div>
						)}
						Check what approvals you might need
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='4'>
						<Card.Body className='gray800-14'>
							<Fragment>
								<div className='margin-bottom-16'>
									The MRC Health Data Access tookit aims to help you understand what approvals might be necessary for your research. Many
									custodians request these approvals are in place before you start your application process.
								</div>
								<div className='dar-form-check-group'>
									<button className='button-secondary' type='button' onClick={(e) => toggleMrcModal()}>
										MRC Health Data Access toolkit
									</button>
									<input
										type='checkbox'
										id='chkApprovalAdvice'
										checked={completedApprovalsAdvice}
										className='dar-form-check'
										disabled={readOnly ? true : false}
										onChange={(e) => onNextStep(e.target.checked)}
									/>
									<span className='dar-form-check-label'>I have completed this step</span>
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
						onClick={(e) => toggleCard(e, 5)}
					>
						{completedSubmitAdvice ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>6</div>
						)}
						Understand what happens after you submit the application
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='5'>
						<Card.Body className='gray800-14'>
							<Fragment>
								<div className='margin-bottom-16'>After you have completed the form, you can submit the application.</div>
								<div className='margin-bottom-16'>
									<ul>
										<li>Make sure to double-check everything before submitting</li>
										<li>You will NOT be able to edit your responses via the Gateway after submission (for now)</li>
										<li>If you do need to make any amendments, get in touch with the data custodian</li>
										<li>Both you and the data custodian will receive an email with a copy of the information submitted using this form.</li>
									</ul>
								</div>
								<div className='dar-form-check-group'>
									<input
										type='checkbox'
										id='chkSubmitAdvice'
										checked={completedSubmitAdvice}
										className='dar-form-check'
										disabled={readOnly ? true : false}
										onChange={(e) => onNextStep(e.target.checked)}
									/>
									<span className='dar-form-check-label'>I have completed this step</span>
								</div>
							</Fragment>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card className={activeAccordionCard === 6 ? 'activeCard' : ''}>
					<Accordion.Toggle
						as={Card.Header}
						className={DarHelper.calcAccordionClasses(activeAccordionCard === 6, allowedNavigation)}
						eventKey='6'
						onClick={(e) => toggleCard(e, 6)}
					>
						{completedInviteCollaborators ? (
							<div className='stepNumber completed'>
								<SVGIcon name='check' width={24} height={24} fill={'#ffffff'} />
							</div>
						) : (
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>7</div>
						)}
						Invite contributors
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='6'>
						<Card.Body className='gray800-14'>
							<Fragment>
								<div className='margin-bottom-16'>
									Applications are often a team effort, so you can add others to help. Contributors can exchange private notes, make edits,
									message the data custodian, invite others and submit the application. If they’re named in the application, you can fill in
									some of their details automatically. You can do this later too.
								</div>
								<div className='dar-form-check-group'>
									{userType.toUpperCase() !== 'CUSTODIAN' ? (
										<button className='button-secondary' type='button' onClick={(e) => toggleContributorModal()}>
											Add contributors
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
										onChange={(e) => onNextStep(e.target.checked)}
									/>
									<span className='dar-form-check-label'>I have completed this step</span>
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
