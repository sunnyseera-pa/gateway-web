import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import * as Sentry from '@sentry/react';
import { isEmpty, isNil } from 'lodash';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';

import ErrorModal from '../commonComponents/errorModal';
import Loading from '../commonComponents/Loading';
import SearchBar from '../commonComponents/searchBar/SearchBar';
import ActionBar from '../commonComponents/actionbar/ActionBar';
import SearchBarHelperUtil from '../../utils/SearchBarHelper.util';
import { baseURL } from '../../configs/url.config';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../commonComponents/userMessages/UserMessages';
import DataSetModal from '../commonComponents/dataSetModal/DataSetModal';
import { ReactComponent as CloseButtonSvg } from '../../images/close-alt.svg';
import { classSchema } from './classSchema';

import Winterfell from 'winterfell';
import TypeaheadCustom from './components/TypeaheadCustom/TypeaheadCustom';
import TypeaheadUser from './components/TypeaheadUser/TypeaheadUser';
import DatePickerCustom from './components/DatePickerCustom/DatepickerCustom';
import NavItem from './components/NavItem/NavItem';
import NavDropdown from './components/NavDropdown/NavDropdown';
import QuestionActionTabs from './components/QuestionActionTabs';
import DarHelper from '../../utils/DarHelper.util'; //Trim the fat

import { Row, Col, Tabs, Tab, Container, Alert } from 'react-bootstrap';

import 'react-tabs/style/react-tabs.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './DataAccessRequestCustomiseForm.scss';

export const DataAccessRequestCustomiseForm = props => {
	let history = useHistory();
	const [searchBar] = useState(React.createRef());

	const [id] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [searchString, setSearchString] = useState('');
	const [userState] = useState(
		props.userState || [
			{
				loggedIn: false,
				role: 'Reader',
				id: null,
				name: null,
			},
		]
	);
	const [showDrawer, setShowDrawer] = useState(false);
	const [lastSaved, setLastSaved] = useState('');
	const [isWideForm, setIsWideForm] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [userType, setUserType] = useState('');
	const [activeGuidance, setActiveGuidance] = useState('');
	const [context, setContext] = useState({});
	const [applicationStatus, setApplicationStatus] = useState('');
	const [activePanelId, setActivePanelId] = useState('');
	const [jsonSchema, setJsonSchema] = useState({});
	const [questionAnswers] = useState({});
	const [questionStatus, setQuestionStatus] = useState({});
	const [newGuidance, setNewGuidance] = useState({});
	const [countOfChanges, setCountOfChanges] = useState({});
	const [actionTabSettings, setActionTabSettings] = useState({
		key: '',
		questionSetId: '',
		questionId: '',
	});

	useEffect(() => {
		if (!!window.location.search) {
			let values = queryString.parse(window.location.search);
		}
		getMasterSchema();
	}, []);

	const getMasterSchema = async () => {
		const {
			data: {
				result: { masterSchema, questionStatus, guidance, countOfChanges },
			},
		} = await axios.get(`${baseURL}/api/v2/questionbank/6112a0c80c3d4634a85b15bd`);

		const questionActions = {
			questionActions: [
				{ key: 'guidance', icon: 'far fa-question-circle', color: '#475da7', toolTip: 'Guidance', order: 1 },
				{ key: 'guidanceLocked', icon: 'far fa-eye', color: '#475da7', toolTip: 'View locked guidance', order: 1 },
			],
		};

		setJsonSchema({ ...masterSchema, ...classSchema, ...questionActions });
		setQuestionStatus(questionStatus);
		setNewGuidance(guidance);
		setCountOfChanges(countOfChanges);
		setActivePanelId(masterSchema.formPanels[0].panelId);
		setIsLoading(false);
	};

	const onClickSave = e => {
		e.preventDefault();
		const lastSaved = DarHelper.saveTime();
		setLastSaved(lastSaved);
	};

	const redirectDashboard = e => {
		e.preventDefault();
		history.push({
			pathname: `/account`,
			search: '?tab=dataaccessrequests',
		});
	};

	const toggleDrawer = () => {
		if (showDrawer === true) {
			searchBar.current.getNumberOfUnreadMessages();
		}
		setShowDrawer(!showDrawer);
	};

	const toggleModal = (showEnquiry = false, context = {}) => {
		setShowModal(!showModal);
		setContext(context);
		setShowDrawer(showEnquiry);
	};

	const updateNavigation = newForm => {
		// reset scroll to 0, 0
		window.scrollTo(0, 0);
		// copy state pages
		const pages = [...jsonSchema.pages];
		// get the index of new form
		const newPageindex = pages.findIndex(page => page.pageId === newForm.pageId);
		// reset the current state of active to false for all pages
		const newFormState = [...jsonSchema.pages].map(item => {
			return { ...item, active: false };
		});
		// update actual object model with property of active true
		newFormState[newPageindex] = { ...pages[newPageindex], active: true };
		// get set the active panelId
		let { panelId } = newForm;
		if (isEmpty(panelId) || typeof panelId == 'undefined') {
			({ panelId } = [...jsonSchema.formPanels].find(p => p.pageId === newFormState[newPageindex].pageId) || '');
		}

		setJsonSchema({ ...jsonSchema, pages: newFormState });
		setActivePanelId(panelId);
		setIsWideForm(panelId === 'about' || panelId === 'files');
		setActiveGuidance('');
		setActionTabSettings({ key: '', questionSetId: '', questionId: '' });
	};

	const renderApp = () => {
		if (activePanelId === 'about') {
			/* return (
			<AboutApplication
				key={_id}
				activeAccordionCard={activeAccordionCard}
				allowedNavigation={allowedNavigation}
				userType={userType}
				selectedDatasets={aboutApplication.selectedDatasets}
				readOnly={readOnly || applicationStatus !== DarHelper.darStatus.inProgress}
				projectNameValid={projectNameValid}
				projectName={aboutApplication.projectName}
				nationalCoreStudiesProjects={nationalCoreStudiesProjects}
				ncsValid={ncsValid}
				completedReadAdvice={aboutApplication.completedReadAdvice}
				completedCommunicateAdvice={aboutApplication.completedCommunicateAdvice}
				completedApprovalsAdvice={aboutApplication.completedApprovalsAdvice}
				completedSubmitAdvice={aboutApplication.completedSubmitAdvice}
				completedInviteCollaborators={aboutApplication.completedInviteCollaborators}
				completedDatasetSelection={aboutApplication.completedDatasetSelection}
				isNationalCoreStudies={aboutApplication.isNationalCoreStudies}
				nationalCoreStudiesProjectId={aboutApplication.nationalCoreStudiesProjectId}
				context={context}
				toggleCard={toggleCard}
				toggleDrawer={toggleDrawer}
				onHandleDataSetChange={onHandleDataSetChange}
				onNextStep={onNextStep}
				onHandleProjectNameBlur={onHandleProjectNameBlur}
				onHandleProjectNameChange={onHandleProjectNameChange}
				onHandleProjectIsNCSToggle={onHandleProjectIsNCSToggle}
				onHandleNCSProjectChange={onHandleNCSProjectChange}
				renderTooltip={renderTooltip}
				toggleModal={toggleModal}
				toggleMrcModal={toggleMrcModal}
				toggleContributorModal={toggleContributorModal}
				areDatasetsAmended={areDatasetsAmended}
				datasetsAmendedBy={datasetsAmendedBy}
				datasetsAmendedDate={datasetsAmendedDate}
			/>
		); */
		} else if (activePanelId === 'files') {
			/* return <Uploads onFilesUpdate={onFilesUpdate} id={_id} files={files} readOnly={readOnly} />; */
		} else {
			debugger;
			return (
				<Winterfell
					schema={jsonSchema}
					questionAnswers={questionAnswers}
					questionStatus={questionStatus}
					panelId={activePanelId}
					disableSubmit={true}
					disableValidation={true}
					renderRequiredAsterisk={() => <span>{'*'}</span>}
					//readOnly={true}
					/* onQuestionClick={onQuestionSetAction}
					onQuestionAction={onQuestionAction}
					onUpdate={onFormUpdate}
					onSubmit={onFormSubmit} */
				/>
			);
		}
	};

	Winterfell.addInputType('typeaheadCustom', TypeaheadCustom);
	Winterfell.addInputType('datePickerCustom', DatePickerCustom);
	Winterfell.addInputType('typeaheadUser', TypeaheadUser);
	Winterfell.validation.default.addValidationMethods({
		isCustomDate: value => {
			if (isEmpty(value) || isNil(value) || moment(value, 'DD/MM/YYYY').isValid()) {
				return true;
			}
			return false;
		},
	});

	if (isLoading) {
		return (
			<Container>
				<Loading />
			</Container>
		);
	}

	return (
		<Sentry.ErrorBoundary fallback={<ErrorModal />}>
			<div>
				<SearchBar
					ref={searchBar}
					searchString={searchString}
					doSearchMethod={e => {
						SearchBarHelperUtil.doSearch(e, this);
					}}
					doUpdateSearchString={e => {
						SearchBarHelperUtil.updateSearchString(e, this);
					}}
					doToggleDrawer={e => toggleDrawer()}
					userState={userState}
				/>
				<Row className='banner'>
					<Col sm={12} md={8} className='banner-left'>
						<span className='white-20-semibold mr-5'>Customise Data Access Request Form</span>
						{/* {allowsMultipleDatasets ? (
							<span className='white-16-semibold pr-5'>{datasets[0].datasetfields.publisher}</span>
						) : (
							<span className='white-16-semibold pr-5'>
								{datasets[0].name} | {datasets[0].datasetfields.publisher}
							</span>
						)} */}
					</Col>
					<Col sm={12} md={4} className='d-flex justify-content-end align-items-center banner-right'>
						{/* <span className='white-14-semibold'>{DarHelper.getSavedAgo(lastSaved)}</span> */}
						{
							<a className={`linkButton white-14-semibold ml-2`} onClick={onClickSave} href='javascript:void(0)'>
								Save now
							</a>
						}
						<CloseButtonSvg width='16px' height='16px' fill='#fff' onClick={e => redirectDashboard(e)} />
					</Col>
				</Row>

				<div id='darContainer' className='flex-form'>
					<div id='darLeftCol' className='scrollable-sticky-column'>
						{[...jsonSchema.pages].map((item, idx) => (
							<div key={`navItem-${idx}`} className={`${item.active ? 'active-border' : ''}`}>
								<div>
									<h3
										className={`black-16 ${item.active ? 'section-header-active' : 'section-header'} `}
										onClick={e => updateNavigation(item)}>
										<span>{item.title}</span>
									</h3>
									{item.active && (
										<ul className='list-unstyled section-subheader'>
											<NavItem
												parentForm={item}
												questionPanels={jsonSchema.questionPanels}
												onFormSwitchPanel={updateNavigation}
												activePanelId={activePanelId}
												enabled={true}
												notForReview={false}
											/>
										</ul>
									)}
								</div>
							</div>
						))}
					</div>
					<div id='darCenterCol' className={isWideForm ? 'extended' : ''}>
						{/* 
						{isEmpty(alert) && (
							<Alert variant={'success'} className='main-alert'>
								<SVGIcon name='check' width={24} height={24} fill={'#2C8267'} /> {alert.message}
							</Alert>
						)} */}
						<div id='darDropdownNav'>
							<NavDropdown
								options={{
									...jsonSchema,
								}}
								onFormSwitchPanel={updateNavigation}
								enabled={true}
							/>
						</div>
						<div style={{ backgroundColor: '#ffffff' }} className='dar__header'>
							{jsonSchema.pages
								? [...jsonSchema.pages].map((item, idx) =>
										item.active ? (
											<Fragment key={`pageContent-${idx}`}>
												<p className='black-20-semibold mb-0'>{item.active ? item.title : ''}</p>
												<ReactMarkdown className='gray800-14' source={item.description} />
											</Fragment>
										) : (
											''
										)
								  )
								: ''}
						</div>
						<div className={`dar__questions ${activePanelId === 'about' ? 'pad-bottom-0' : ''}`} style={{ backgroundColor: '#ffffff' }}>
							{renderApp()}
						</div>
					</div>
					{isWideForm ? null : (
						<div id='darRightCol' className='scrollable-sticky-column'>
							<div className='darTab'>
								<QuestionActionTabs
								/* applicationId={''}
									userState={userState}
									settings={actionTabSettings}
									activeGuidance={activeGuidance}
									onHandleActionTabChange={onHandleActionTabChange}
									toggleDrawer={toggleDrawer}
									setMessageDescription={setMessageDescription}
									userType={userType}
									messagesCount={messagesCount}
									notesCount={notesCount}
									isShared={isShared}
									updateCount={updateCount}
									publisher={''}
									applicationStatus={applicationStatus} */
								/>
							</div>
						</div>
					)}
				</div>

				<ActionBar userState={userState}>
					{/* <div className='action-bar'>
						<div className='action-bar--questions'>
							{applicationStatus === 'inProgress' ? (
								''
							) : (
								<SLA classProperty={DarHelper.darStatusColours[applicationStatus]} text={DarHelper.darSLAText[applicationStatus]} />
							)}
							<div className='action-bar-status'>
								{totalQuestions} &nbsp;|&nbsp; {projectId}
							</div>
						</div>
						<div className='action-bar-actions'>
							<AmendmentCount answeredAmendments={answeredAmendments} unansweredAmendments={unansweredAmendments} />
							{userType.toUpperCase() === 'APPLICANT' ? (
								<ApplicantActionButtons
									allowedNavigation={allowedNavigation}
									isCloneable={isCloneable}
									onNextClick={onNextClick}
									onSubmitClick={onSubmitClick}
									onShowContributorModal={toggleContributorModal}
									onEditForm={onEditForm}
									showSubmit={showSubmit}
									submitButtonText={submitButtonText}
									onDeleteDraftClick={toggleDeleteDraftModal}
									applicationStatus={applicationStatus}
									onDuplicateClick={toggleDuplicateApplicationModal}
									onShowAmendApplicationModal={toggleAmendApplicationModal}
								/>
							) : (
								<CustodianActionButtons
									activeParty={activeParty}
									allowedNavigation={allowedNavigation}
									unansweredAmendments={unansweredAmendments}
									onUpdateRequest={onUpdateRequest}
									onActionClick={onCustodianAction}
									onWorkflowReview={toggleWorkflowReviewModal}
									onWorkflowReviewDecisionClick={toggleWorkflowReviewDecisionModal}
									onNextClick={onNextClick}
									workflowEnabled={workflowEnabled}
									workflowAssigned={workflowAssigned}
									inReviewMode={inReviewMode}
									hasRecommended={hasRecommended}
									applicationStatus={applicationStatus}
									roles={roles}
								/>
							)}
						</div>
					</div> */}
				</ActionBar>

				<SideDrawer open={showDrawer} closed={toggleDrawer}>
					<UserMessages userState={userState[0]} closed={toggleDrawer} toggleModal={toggleModal} drawerIsOpen={showDrawer} />
				</SideDrawer>

				<DataSetModal open={showModal} context={context} closed={toggleModal} userState={userState[0]} />

				{/* <ActionBar userState={userState}>
					<ResourcePageButtons data={toolData} userState={userState} />
				</ActionBar> */}

				{/* <ActionModal
					open={showActionModal}
					context={actionModalConfig}
					updateApplicationStatus={updateApplicationStatus}
					close={toggleActionModal}
				/> */}
			</div>
		</Sentry.ErrorBoundary>
	);
};

export default DataAccessRequestCustomiseForm;
