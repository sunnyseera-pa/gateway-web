import React, { Component, Fragment, useState } from 'react';
import { History } from 'react-router';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Winterfell from 'winterfell';
import _ from 'lodash';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import TypeaheadCustom from './components/TypeaheadCustom/TypeaheadCustom';
import TypeaheadKeywords from './components/TypeaheadKeywords/TypeaheadKeywords';
import TextareaInputCustom from './components/TextareaInputCustom/TextareaInputCustom';
import TypeaheadUser from './components/TypeaheadUser/TypeaheadUser';
import DatePickerCustom from './components/DatePickerCustom/DatepickerCustom';
import MultiField from './components/MultiField/MultiField';
import SearchBar from '../commonComponents/searchBar/SearchBar';
import Loading from '../commonComponents/Loading';
import NavItem from './components/NavItem/NavItem';
import NavDropdown from './components/NavDropdown/NavDropdown';
import DarValidation from '../../utils/DarValidation.util';
import DarHelper from '../../utils/DarHelper.util';
import SearchBarHelperUtil from '../../utils/SearchBarHelper.util';
import { classSchema } from './classSchema';
import { baseURL } from '../../configs/url.config';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../commonComponents/userMessages/UserMessages';
import 'react-tabs/style/react-tabs.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './DatasetOnboarding.scss';
import SVGIcon from '../../images/SVGIcon';
import { ReactComponent as CloseButtonSvg } from '../../images/close-alt.svg';
import moment from 'moment';
import AmendmentCount from './components/AmendmentCount/AmendmentCount';
import ApplicantActionButtons from './components/ApplicantActionButtons/ApplicantActionButtons';
import CustodianActionButtons from './components/CustodianActionButtons/CustodianActionButtons';
import SLA from '../commonComponents/sla/SLA';
import BeforeYouBegin from './components/BeforeYouBegin/BeforeYouBegin';
import Guidance from './components/Guidance/Guidance';
import StructuralMetadata from './components/StructuralMetadata/StructuralMetadata';
import CreateNewVersionModal from './components/CreateNewVersionModal/CreateNewVersionModal';
import Dropdown from 'react-bootstrap/Dropdown';

import { formSchema } from './formSchema';

/* export const DatasetOnboarding = props => {
    const [id] = useState('');
    


} */

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	<a
		href=''
		ref={ref}
		onClick={e => {
			e.preventDefault();
			onClick(e);
		}}>
		{children}
	</a>
));

const CustomMenu = React.forwardRef(({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
	const [value] = useState('');

	return (
		<div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
			<ul className='list-unstyled margin-bottom-0'>
				{React.Children.toArray(children).filter(child => !value || child.props.children.toLowerCase().startsWith(value))}
			</ul>
		</div>
	);
});

class DatasetOnboarding extends Component {
	constructor(props) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onFormUpdate = this.onFormUpdate.bind(this);
		//this.onHandleDataSetChange = this.onHandleDataSetChange.bind(this);
		this.searchBar = React.createRef();

		this.state = {
			_id: '',
			activeParty: '',
			activePanelId: '',
			activeGuidance: '',
			amendmentIterations: [],
			fullAmendments: {},
			jsonSchema: {},
			questionAnswers: {},
			structuralMetadataErrors: [],
			structuralMetadata: [],
			listOfDatasets: [],
			hasRecommended: false,
			applicationStatus: '',
			searchString: '',
			key: 'beforeYouBegin',
			totalQuestions: '',
			validationErrors: {},
			lastSaved: '',
			lookup: ['fullname'],
			isLoading: true,
			formSubmitted: false,
			datasets: [
				{
					name: '',
					datasetfields: {
						publisher: '',
					},
				},
			],
			name: '',
			datasetVersion: '',
			activeflag: '',
			publisher: '',
			showDrawer: false,
			showArchiveModal: false,
			showUnArchiveModal: false,
			showCreateNewVersionModal: false,
			readOnly: false,
			userType: '',
			answeredAmendments: 0,
			unansweredAmendments: 0,
			isWideForm: false,
			isTableForm: false,
			allowsMultipleDatasets: false,
			activeAccordionCard: 0,
			allowedNavigation: true,
			topicContext: {},
			authorIds: [],
			reviewSections: [],
			roles: [],
			inReviewMode: false,
			updateRequestModal: false,
		};

		this.onChangeDebounced = _.debounce(this.onChangeDebounced, 300);
	}

	applicationState = {
		CONFIRMAPPROVALCONDITIONS: 'approved with conditions',
		CONFIRMREJECTION: 'rejected',
		CONFIRMAPPROVAL: 'approved',
	};

	tabState = {
		CONFIRMAPPROVALCONDITIONS: 'approved',
		CONFIRMREJECTION: 'rejected',
		CONFIRMAPPROVAL: 'approved',
	};

	async componentDidMount() {
		await this.initPage();
	}

	async componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			await this.initPage();
		}
	}

	async initPage() {
		try {
			// 1. Determine the entry point to the Data Access Request
			//  a) Dataset - route will contain only the 'datasetId' from the dataset page from which they came
			//	b) Message Panel - route will contain only the 'publisherId' with historic state passed from the message panel component which includes datasetId(s)
			// 	c/d) Data Access Request User Area / Direct Link - route will contain a data access request 'accessId' which specifically links all associated data to one application
			const { id: _id } = this.props.match.params;
			let countedQuestionAnswers = {},
				totalQuestions = '';

			try {
				// 1. Make API call to find and return the application form schema and answers matching this Id
				let response = await axios.get(`${baseURL}/api/v1/dataset-onboarding/${_id}`);
				// 2. Destructure backend response for this context containing details of DAR including question set and current progress
				let {
					data: {
						data,
						data: {
							dataset: { questionAnswers, structuralMetadata },
						},
						listOfDatasets,
					},
				} = response;
				// 3. Set up the DAR
				this.setScreenData({
					...data,
					_id,
					questionAnswers,
					structuralMetadata,
					listOfDatasets,
					jsonSchema: { ...formSchema },
					applicationStatus: data.dataset.activeflag,
				});
			} catch (error) {
				this.setState({ isLoading: false });
				console.error(error);
			}

			countedQuestionAnswers = DarHelper.totalQuestionsAnswered(this);
			totalQuestions = `${countedQuestionAnswers.totalAnsweredQuestions}/${countedQuestionAnswers.totalQuestions}  questions answered`;

			/*if (datasetId) {
				// a) Dataset
				await this.loadSingleDatasetMode(datasetId);
				// Populate the question/answers count
				countedQuestionAnswers = DarHelper.totalQuestionsAnswered(this);
				totalQuestions = `${countedQuestionAnswers.totalAnsweredQuestions}/${countedQuestionAnswers.totalQuestions}  questions answered`;
			} else if (publisherId) {
				// b) Message Panel/Modal
				// Extract datasets passed from history (provided via request access click from modal)
				const { datasets: datasetIds } = this.props.location.state;
				const datasetIdsConcat = datasetIds.map(ds => ds.datasetId).join(',');
				await this.loadMultipleDatasetMode(datasetIdsConcat);
				// Populate the question/answers count
				countedQuestionAnswers = DarHelper.totalQuestionsAnswered(this);
				totalQuestions = `${countedQuestionAnswers.totalAnsweredQuestions}/${countedQuestionAnswers.totalQuestions}  questions answered`;
			} else if (accessId) {
				// c/d) Data Access Request/Direct Link (To be extended for readonly mode)
				await this.loadDataAccessRequest(accessId);
				// Populate the question/answers count if still in progress, otherwise display project status and date last updated
				const { applicationStatus, updatedAt } = this.state;
				if (applicationStatus === 'inProgress') {
					countedQuestionAnswers = DarHelper.totalQuestionsAnswered(this);
					totalQuestions = `${countedQuestionAnswers.totalAnsweredQuestions}/${countedQuestionAnswers.totalQuestions}  questions answered`;
				} else {
					totalQuestions = `Application ${DarHelper.darSLAText[applicationStatus]} on ${moment(updatedAt).format('DD MMM YYYY HH:mm')}`;
				}
			} */

			//this.setState({jsonSchema: {...formSchema}, questionAnswers: {}, activePanelId: 'beforeYouBegin', isLoading: false, applicationStatus: 'inProgress'});

			// Update state to display question answer count
			this.setState({
				totalQuestions,
			});
		} catch (error) {
			this.setState({ isLoading: false });
			console.error(error);
		} finally {
			this.setState({
				roles: this.getUserRoles(),
			});
		}
	}

	//builder for the data for the form

	setScreenData = async context => {
		// 1. Destructure DAR context containing questions and any application progress
		let {
			jsonSchema,
			activeParty = '',
			questionAnswers = {},
			structuralMetadata = [],
			listOfDatasets = [],
			_id,
			hasRecommended,
			amendmentIterations = [],
			applicationStatus,
			dataset,
			readOnly = false,
			userType = 'APPLICANT',
			unansweredAmendments = 0,
			answeredAmendments = 0,
			userId,
			authorIds,
			inReviewMode = false,
			reviewSections = [],
		} = context;

		let {
			name,
			datasetVersion,
			activeflag,
			datasetfields: { publisher },
		} = dataset;

		let showSubmit = false;
		let submitButtonText = 'Submit for review';
		let showCreateNewVersion = false;
		let showArchive = false;
		let showUnArchive = false;

		let publisherId = '';
		if (dataset.publisher) {
			({ _id: publisherId } = dataset.publisher);
		}

		jsonSchema = this.injectStaticContent(jsonSchema, inReviewMode, reviewSections);

		// 6. Hide show submit application
		if (applicationStatus === DarHelper.darStatus.draft) {
			showSubmit = true;
			showArchive = true;
		} else if (applicationStatus === DarHelper.darStatus.rejected) {
			showCreateNewVersion = true;
			readOnly = true;
		} else if (applicationStatus === DarHelper.darStatus.archive) {
			showUnArchive = true;
			readOnly = true;
		} else if (applicationStatus !== DarHelper.darStatus.inReview) {
			showCreateNewVersion = true;
			showArchive = true;
			readOnly = true;
		}

		let initialPanel = jsonSchema.formPanels[0].panelId;

		// 9. Set state
		this.setState({
			jsonSchema: { ...jsonSchema, ...classSchema },
			activeParty,
			dataset,
			questionAnswers,
			structuralMetadata,
			listOfDatasets,
			_id,
			hasRecommended,
			amendmentIterations,
			applicationStatus,
			activePanelId: initialPanel,
			isWideForm: initialPanel === DarHelper.darStaticPageIds.BEFOREYOUBEGIN,
			isTableForm: initialPanel === DarHelper.darStaticPageIds.STRUCTURAL,
			isLoading: false,
			name,
			datasetVersion,
			activeflag,
			publisher,
			readOnly,
			answeredAmendments,
			unansweredAmendments,
			userType,
			userId,
			authorIds,
			showSubmit,
			submitButtonText,
			showCreateNewVersion,
			showArchive,
			showUnArchive,
			//publisherId,
			inReviewMode,
			reviewSections,
		});
	};

	/**
	 * InjectStaticContent
	 * @desc Function to inject static 'about' and 'files' pages and panels into schema
	 * @returns {jsonSchmea} object
	 */
	injectStaticContent(jsonSchema = {}, inReviewMode = false, reviewSections = []) {
		let { pages, formPanels } = { ...jsonSchema };
		// formPanel {pageId: 'safePeople', panelId:'applicant'}
		let formPanel = {};
		let currentPageIdx = 0;
		// check if About page has been injected
		let navElementsExist = [...pages].find(page => page.pageId === DarHelper.darStaticPageIds.BEFOREYOUBEGIN) || false;
		// 2. About page does not exist
		if (!navElementsExist) {
			// Append 'about' & 'files' panel and nav item
			jsonSchema.pages.unshift(DarHelper.staticContent.beforeYouBeginPageNav);
			jsonSchema.pages.push(DarHelper.staticContent.structuralPageNav);
			// Add form panel for 'about' & 'files'
			jsonSchema.formPanels.unshift(DarHelper.staticContent.beforeYouBeginPanel);
			jsonSchema.formPanels.push(DarHelper.staticContent.structuralPanel);
		}
		// if activePanel, find active formPanel from formPanels, find pageId index from pages array
		if (!_.isEmpty(this.state.activePanelId)) {
			formPanel = [...formPanels].find(p => p.panelId === this.state.activePanelId);
			currentPageIdx = [...pages].findIndex(page => page.pageId === formPanel.pageId);
		}
		// set active page
		jsonSchema.pages.forEach(element => (element.active = false));
		jsonSchema.pages[currentPageIdx].active = true;

		// 7. Append review sections to jsonSchema if in review mode
		jsonSchema.pages = [...jsonSchema.pages].map(page => {
			let inReview =
				[...reviewSections].includes(page.pageId.toLowerCase()) ||
				page.pageId === DarHelper.darStaticPageIds.BEFOREYOUBEGIN ||
				page.pageId === DarHelper.darStaticPageIds.STRUCTURAL;

			return { ...page, inReview: inReviewMode && inReview };
		});
		// add in the classes for winterfell, important
		jsonSchema = { ...jsonSchema, ...classSchema };

		return jsonSchema;
	}

	/**
	 * [onFormUpdate]
	 * @param {obj: questionAnswers}
	 * @desc Callback from Winterfell sets totalQuestionsAnswered + saveTime
	 */
	onFormUpdate = (id = '', questionAnswers = {}) => {
		if (!_.isEmpty(id) && !_.isEmpty(questionAnswers)) {
			let { lookup, activePanelId } = this.state;
			// 1. check for auto complete
			if (typeof id === 'string') {
				let [questionId, uniqueId] = id.split('_');
				let qId = questionId.toLowerCase();
				let lookupAutoComplete = [...lookup].includes(qId);
				if (lookupAutoComplete)
					questionAnswers = DarHelper.autoComplete(qId, uniqueId, {
						...questionAnswers,
					});
			}
			// 2. get totalQuestionAnswered
			let countedQuestionAnswers = {};
			let totalQuestions = '';
			// 3. total questions answered
			if (activePanelId === 'beforeYouBegin' || activePanelId === 'structural') {
				countedQuestionAnswers = DarHelper.totalQuestionsAnswered(this);
				totalQuestions = `${countedQuestionAnswers.totalAnsweredQuestions}/${countedQuestionAnswers.totalQuestions}  questions answered`;
			} else {
				countedQuestionAnswers = DarHelper.totalQuestionsAnswered(this, this.state.activePanelId, questionAnswers);
				totalQuestions = `${countedQuestionAnswers.totalAnsweredQuestions}/${countedQuestionAnswers.totalQuestions}  questions answered in this section`;
			}
			// 4. set totalQuestionAnswered
			this.setState({ totalQuestions });
			// 5. remove blank vals from questionAnswers
			let data = _.pickBy({ ...this.state.questionAnswers, ...questionAnswers }, _.identity);
			const lastSaved = DarHelper.saveTime();
			// 6. create dataObject
			let dataObj = { key: 'questionAnswers', data };
			// 7. Immediately update the state
			this.setState({ [`${dataObj.key}`]: { ...dataObj.data }, lastSaved });
			// 8. Execute the debounced onChange method API CALL
			this.onChangeDebounced(dataObj, id);
		}
	};

	onChangeDebounced = (obj = {}, updatedQuestionId) => {
		try {
			let { _id: id } = this.state;
			// 1. deconstruct
			let { key, data = {} } = obj;
			// 2. set body params
			let params = {
				[`${key}`]: JSON.stringify(data),
				updatedQuestionId,
			};
			// 3. API Patch call
			//axios.patch(`${baseURL}/api/v1/dataset-onboarding/${pid}/${datasetId}`, params).then(response => {
			axios.patch(`${baseURL}/api/v1/dataset-onboarding/${id}`, params).then(response => {
				if (response.data.name) this.setState({ name: response.data.name });
				/* let {
					data: { unansweredAmendments = 0, answeredAmendments = 0, jsonSchema = null },
				} = response;
				let { applicationStatus } = this.state;
				// 4. remove blank values from schema updates - omit values if they are blank, important for jsonSchema
				if(!_.isNil(jsonSchema))
					jsonSchema = this.injectStaticContent(jsonSchema, false, this.state.reviewSections);

				let schemaUpdates = 	_.omitBy({
					unansweredAmendments,
					answeredAmendments,
					showSubmit: applicationStatus === DarHelper.darStatus.inProgress || answeredAmendments > 0,
					jsonSchema
				}, _.isNil);

				this.setState({
					...schemaUpdates
				}); */
			});
		} catch (error) {
			console.log(`API PUT ERROR ${error}`);
		}
	};

	/**
	 * [Form Submit]
	 * @desc Submitting data access request
	 * @params  Object{questionAnswers}
	 */
	onFormSubmit = async () => {
		let invalidQuestions = DarValidation.getQuestionPanelInvalidQuestions(
			Winterfell,
			this.state.jsonSchema.questionSets,
			this.state.questionAnswers
		);
		let validationSectionMessages = DarValidation.buildInvalidSectionMessages(Winterfell, invalidQuestions);
		let inValidMessages = DarValidation.buildInvalidMessages(Winterfell, invalidQuestions);
		let errors = DarValidation.formatValidationObj(inValidMessages, [...this.state.jsonSchema.questionPanels]);
		let isValid = Object.keys(errors).length ? false : true;

		if (isValid) {
			try {
				let { _id } = this.state;
				// 1. POST
				await axios.post(`${baseURL}/api/v1/dataset-onboarding/${_id}`, {});
				const lastSaved = DarHelper.saveTime();
				this.setState({ lastSaved });

				let alert = {
					tab: 'submitted',
					message:
						this.state.applicationStatus === 'inProgress'
							? 'Your application was submitted successfully'
							: `You have successfully saved updates to '${this.state.projectName || this.state.datasets[0].name}' application`,
					publisher: 'user',
				};
				this.props.history.push({
					pathname: '/account',
					search: '?tab=datasets',
					state: { alert },
				});
			} catch (err) {
				console.log(err);
			}
		} else {
			let activePage = _.get(_.keys({ ...errors }), 0);
			let activePanel = _.get(_.keys({ ...errors }[activePage]), 0);
			let validationMessages = validationSectionMessages;
			alert('Some validation issues have been found. Please see all items highlighted in red on this page.');
			this.updateNavigation({ pageId: activePage, panelId: activePanel }, validationMessages);
		}
	};

	updateApplication = async (obj = {}) => {
		try {
			// 1. Data = {key: jsonSchema || questionAnswers, data: { object of data}}
			let { key, data = {} } = obj;
			// 2. Id of data access request
			let { _id: id } = this.state;
			// 3. Set up body params
			let params = {
				[`${key}`]: JSON.stringify(data),
			};
			// 4. PATCH the data
			//const response = await axios.patch(`${baseURL}/api/v1/data-access-request/${id}`, params);
			// 6. Get saved time
			const lastSaved = DarHelper.saveTime();
			// 5. Set state
			this.setState({ [`${key}`]: { ...data }, lastSaved });
		} catch (err) {
			console.log(err);
		}
	};

	onNextClick = () => {
		// 1. If in the about panel, we go to the next step.  Otherwise next panel.
		if (this.state.activePanelId === 'beforeYouBegin') {
			// 2. Set new state
			this.setState({
				activeAccordionCard: ++this.state.activeAccordionCard,
			});

			// 3. If we have reached the end of the about accordion, reset active accordion so all are closed
			if (this.state.activeAccordionCard >= 4) {
				this.setState({
					activeAccordionCard: -1,
				});
				// 4. Move to the next step
				this.onNextPanel();
			}
		} else {
			this.onNextPanel();
		}
	};

	onNextPanel = () => {
		// 1. Copy formpanels
		let formPanels = [...this.state.jsonSchema.formPanels];
		// 2. Get activeIdx
		let activeIdx = formPanels.findIndex(p => p.panelId === this.state.activePanelId);
		// 3. Increment idx
		let nextIdx = ++activeIdx;
		// 4. Get activePanel - make sure newIdx doesnt exceed panels length
		let { panelId, pageId } = formPanels[nextIdx > formPanels.length - 1 ? 0 : nextIdx];
		// 5. Update the navigationState
		this.updateNavigation({ panelId, pageId });
	};

	/**
	 * [UpdateNavigation]
	 * @desc - Update the navigation state sidebar
	 */
	updateNavigation = (newForm, validationErrors = {}) => {
		if (this.state.allowedNavigation) {
			let reviewWarning = false;
			// reset scroll to 0, 0
			window.scrollTo(0, 0);
			let panelId = '';
			// copy state pages
			const pages = [...this.state.jsonSchema.pages];
			// get the index of new form
			const newPageindex = pages.findIndex(page => page.pageId === newForm.pageId);
			reviewWarning = !pages[newPageindex].inReview && this.state.inReviewMode;
			// reset the current state of active to false for all pages
			const newFormState = [...this.state.jsonSchema.pages].map(item => {
				return { ...item, active: false };
			});
			// update actual object model with property of active true
			newFormState[newPageindex] = { ...pages[newPageindex], active: true };

			// get set the active panelId
			({ panelId } = newForm);
			if (_.isEmpty(panelId) || typeof panelId == 'undefined') {
				({ panelId } = [...this.state.jsonSchema.formPanels].find(p => p.pageId === newFormState[newPageindex].pageId) || '');
			}

			let countedQuestionAnswers = {};
			let totalQuestions = '';
			// if in the about panel, retrieve question answers count for entire application
			if (panelId === 'beforeYouBegin' || panelId === 'structural') {
				countedQuestionAnswers = DarHelper.totalQuestionsAnswered(this);
				totalQuestions = `${countedQuestionAnswers.totalAnsweredQuestions || 0}/${
					countedQuestionAnswers.totalQuestions || 0
				}  questions answered`;
			} else {
				countedQuestionAnswers = DarHelper.totalQuestionsAnswered(this, panelId);
				totalQuestions = `${countedQuestionAnswers.totalAnsweredQuestions || 0}/${
					countedQuestionAnswers.totalQuestions || 0
				}  questions answered in this section`;
			}

			// reset guidance - due to on change of panel
			this.setState({
				jsonSchema: { ...this.state.jsonSchema, pages: newFormState },
				activePanelId: panelId,
				isWideForm: panelId === 'beforeYouBegin',
				isTableForm: panelId === 'structural',
				totalQuestions: totalQuestions,
				validationErrors,
				reviewWarning,
				activeGuidance: '',
			});
		}
	};

	onClickSave = e => {
		e.preventDefault();
		const lastSaved = DarHelper.saveTime();
		this.setState({ lastSaved });
	};

	/**
	 * [onQuestionClick]
	 * @desc Add's or Removes applicants dynamically
	 *
	 * @param   {string}  questionSetId  [questionSetId]
	 * @param   {string}  questionId     [questionId]
	 */
	onQuestionClick = async (questionSetId = '', questionId = '') => {
		let questionSet, jsonSchema, questionAnswers, data, schema;

		questionSet = DarHelper.findQuestionSet(questionSetId, { ...this.state.jsonSchema });

		if (!_.isEmpty(questionSet) && !_.isEmpty(questionId)) {
			// remove about and files from pages to stop duplicate, about / files added to DAR on init
			schema = DarHelper.removeStaticPages({ ...this.state.jsonSchema });

			let {
				input: { action },
			} = DarHelper.findQuestion(questionId, questionSet);
			switch (action) {
				case 'addApplicant':
					let duplicateQuestionSet = DarHelper.questionSetToDuplicate(questionSetId, { ...schema });
					jsonSchema = DarHelper.insertSchemaUpdates(questionSetId, duplicateQuestionSet, { ...schema });
					data = { key: 'jsonSchema', data: jsonSchema };
					// post to API to do of new jsonSchema
					await this.updateApplication(data);
					break;
				case 'removeApplicant':
					jsonSchema = DarHelper.removeQuestionReferences(questionSetId, questionId, { ...schema });
					questionAnswers = DarHelper.removeQuestionAnswers(questionId, { ...this.state.questionAnswers });
					// post to API of new jsonSchema
					await this.updateApplication({ key: 'jsonSchema', data: jsonSchema });
					await this.updateApplication({ key: 'questionAnswers', data: questionAnswers });
					break;
				default:
					console.log(questionSetId);
					break;
			}
		}
	};

	/**
	 * onQuestionAction
	 * @desc 	Event raised from Winterfell for secondary question events
	 * @params {event, questionSetId, questionId, key}
	 */
	onQuestionAction = async (e = '', questionSetId = '', questionId = '', key = '') => {
		let mode, stateObj;
		switch (key) {
			case DarHelper.actionKeys.GUIDANCE:
				const activeGuidance = this.getActiveQuestionGuidance(questionId);
				if (!_.isEmpty(e)) {
					this.removeActiveQuestionClass();
					this.addActiveQuestionClass(e);
				}
				this.setState({ activeGuidance });
				break;
			case DarHelper.actionKeys.REQUESTAMENDMENT:
				mode = DarHelper.amendmentModes.ADDED;
				stateObj = await this.postQuestionAction(questionSetId, questionId, mode);
				this.setState({ ...stateObj });
				break;
			case DarHelper.actionKeys.CANCELREQUEST:
				mode = DarHelper.amendmentModes.REMOVED;
				stateObj = await this.postQuestionAction(questionSetId, questionId, mode);
				this.setState({ ...stateObj });
				break;
			case DarHelper.actionKeys.REVERTTOPREVIOUSANSWER:
				mode = DarHelper.amendmentModes.REVERTED;
				stateObj = await this.postQuestionAction(questionSetId, questionId, mode);
				this.setState({ ...stateObj });
				break;
			default:
				console.log(questionId);
				break;
		}
	};

	/**
	 * getActiveQuestionGuidance
	 * @desc - Returns the guidance based on the active question
	 * @param   {string}  questionId
	 * @return  {string} guidance
	 */
	getActiveQuestionGuidance(questionId = '') {
		let questions;
		if (!_.isEmpty(questionId)) {
			let {
				jsonSchema: { questionSets },
			} = this.state;
			// 1. get active question set
			({ questions } = [...questionSets].find(q => q.questionSetId === this.state.activePanelId) || []);
			if (!_.isEmpty(questions)) {
				// 2. loop over and find active question
				let activeQuestion = DarHelper.getActiveQuestion([...questions], questionId);
				if (!_.isEmpty(activeQuestion)) {
					const { guidance } = activeQuestion;
					return guidance;
				}
				return '';
			}
		}
	}

	postQuestionAction = async (questionSetId, questionId, mode) => {
		let response = await axios.post(`${baseURL}/api/v1/data-access-request/${this.state._id}/amendments`, {
			questionSetId,
			questionId,
			mode,
		});
		let {
			accessRecord: { jsonSchema, questionAnswers = null, answeredAmendments, unansweredAmendments, amendmentIterations },
		} = response.data;
		jsonSchema = this.injectStaticContent(jsonSchema, this.state.inReviewMode, this.state.reviewSections);

		let stateObj = _.omitBy(
			{
				jsonSchema,
				questionAnswers,
				answeredAmendments,
				unansweredAmendments,
				amendmentIterations,
			},
			_.isNil
		);

		return stateObj;
	};

	/**
	 * removeActiveQuestionClass
	 * @desc Removes active class on a single question
	 */
	removeActiveQuestionClass = () => {
		let fGroups = document.querySelectorAll('.question-wrap');
		fGroups.forEach(key => key.classList.remove('active-group'));
	};

	/**
	 * addActiveQuestionClass
	 * @desc Adds active border to question clicked upon
	 * @param - (e) eventObject
	 */
	addActiveQuestionClass = e => {
		if (!_.isEmpty(e)) {
			let fGroup = e.target.closest('.question-wrap');
			fGroup.classList.add('active-group');
		}
	};

	resetGuidance = () => {
		// remove active question class
		this.removeActiveQuestionClass();
		// reset guidance state
		this.setState({ activeGuidance: '' });
	};

	/* onCustodianAction = value => {
		value === 'AssignWorkflow' ? this.toggleAssignWorkflowModal() : this.toggleActionModal(value);
	}; */

	onStructuralMetaDataUpdate = (structuralMetadata, structuralMetadataErrors) => {
		this.setState({ structuralMetadata, structuralMetadataErrors });
	};

	toggleCard = (e, eventKey) => {
		e.preventDefault();
		// 1. Deconstruct current state
		let { activeAccordionCard } = this.state;
		if (activeAccordionCard === eventKey) {
			eventKey = -1;
		}
		// 2. Set new state
		this.setState({
			activeAccordionCard: eventKey,
		});
	};

	toggleDrawer = () => {
		this.setState(prevState => {
			if (prevState.showDrawer === true) {
				this.searchBar.current.getNumberOfUnreadMessages();
			}
			return { showDrawer: !prevState.showDrawer };
		});
	};

	onEditForm = async () => {
		this.setState({
			readOnly: false,
			showSubmit: false,
			submitButtonText: 'Submit updates',
		});
	};

	toggleArchiveModal = () => {
		this.setState(prevState => {
			return {
				showArchiveModal: !prevState.showArchiveModal,
			};
		});
	};

	toggleUnArchiveModal = () => {
		this.setState(prevState => {
			return {
				showUnArchiveModal: !prevState.showUnArchiveModal,
			};
		});
	};

	toggleCreateNewVersionModal = () => {
		this.setState(prevState => {
			return {
				showCreateNewVersionModal: !prevState.showCreateNewVersionModal,
			};
		});
	};

	redirectDashboard = e => {
		e.preventDefault();
		this.props.history.push({
			pathname: `/account`,
			search: '?tab=datasets',
		});
	};

	updateApplicationStatus = async (action = {}) => {
		let { type, statusDesc } = action;
		switch (type) {
			case 'CONFIRMAPPROVALCONDITIONS':
			case 'CONFIRMREJECTION':
			case 'CONFIRMAPPROVAL':
				let { _id } = this.state;
				const body = {
					applicationStatus: this.applicationState[type],
					applicationStatusDesc: statusDesc,
				};
				// 1. Update action status
				const response = await axios.put(`${baseURL}/api/v1/data-access-request/${_id}`, body);
				// 2. set alert object for screen
				let alert = {
					publisher: this.state.publisher || '',
					nav: `dataaccessrequests&team=${this.state.publisher}`,
					tab: this.tabState[type],
					message: `You have ${this.tabState[type]} the data access request for ${this.state.publisher}`,
				};
				// 3. hide screen modal for approve, reject, approve with comments
				this.toggleActionModal();
				// 4. redirect with Publisher name, Status: reject, approved, key of tab: presubmission, inreview, approved, rejected
				this.props.history.push({
					pathname: `/account`,
					search: '?tab=dataaccessrequests',
					state: { alert },
				});
				break;
			default:
				this.toggleActionModal();
		}
	};

	getUserRoles() {
		let { teams } = this.props.userState[0];
		let foundTeam = teams.filter(team => team.name === this.state.datasets[0].datasetfields.publisher);
		if (_.isEmpty(teams) || _.isEmpty(foundTeam)) {
			return ['applicant'];
		}
		return foundTeam[0].roles;
	}

	/* renderTooltip = props => (
		<Tooltip className='tool-tip' style={{ width: '240px' }}>
			{props}
		</Tooltip>
	); */

	/**
	 * OnUpdateRequest
	 * @desc When Custodian clicks Submit update request
	 * 			 will open a modal
	 */
	onUpdateRequest = e => {
		let fullAmendments = {};
		let updateRequestModal = this.state.updateRequestModal;
		let { pages, questionPanels, questionSets } = { ...this.state.jsonSchema };
		// Get the last amendmentIteration in the array
		let amendmentsIterations = _.last([...this.state.amendmentIterations]);
		if (!_.isEmpty(amendmentsIterations)) {
			// get the questionAnswers object {role: {}, lastName: {}}
			let { questionAnswers } = { ...amendmentsIterations };
			// get all the questionIds into a iterable array from questionAnswers
			if (!_.isEmpty(questionAnswers)) {
				// set up default variables
				let questionSetId,
					answer,
					section,
					pageId,
					page,
					questions,
					question = '';
				// reduce over questionanswers object using lodash
				fullAmendments = _.reduce(
					questionAnswers,
					(obj, value, key) => {
						// currentItem {questionSetId, answer}
						({ questionSetId, answer } = questionAnswers[key]);
						// find the active questionPanel ie questionPanels: [{navHeader, pageId, panelId, questionSets:[]}]
						let activeQuestionPanel = [...questionPanels].find(panel => panel.panelId === questionSetId);
						// Get the section {navHeader: panelHeader: 'Applicant', pageId: 'safePeople'}
						({ navHeader: section, pageId } = activeQuestionPanel);
						// find the active page ie pages: [{pageId: 'safepeople', title: pageTitle: 'Safe People'}]
						let activePage = [...pages].find(pageItem => pageItem.pageId === pageId);
						// Get the page title from page item
						({ title: page } = activePage);
						// Get the list of questions for questionPanelId from questionSets
						({ questions } = [...questionSets].find(questionSet => questionSet.questionSetId === questionSetId));
						// Get question checks for nested questions also
						({ question } = DarHelper.getActiveQuestion(questions, key));
						// Safe People | Applicant
						let location = `${page} | ${section}`;
						// build up our object of data for display
						if (!obj[location]) {
							obj = { ...obj, [location]: [{ question, answer }] };
						} else if (obj[location]) {
							let arr = [...obj[location], { question, answer }];
							obj[location] = arr;
						}
						return obj;
					},
					{}
				);
			}
		}
		this.setState({ updateRequestModal: !updateRequestModal, fullAmendments });
	};

	toggleUpdateRequestModal = () => {
		this.setState(prevState => {
			return {
				updateRequestModal: !prevState.updateRequestModal,
			};
		});
	};

	renderApp = () => {
		let { activePanelId } = this.state;
		if (activePanelId === 'beforeYouBegin') {
			return (
				<BeforeYouBegin
					activeAccordionCard={this.state.activeAccordionCard}
					allowedNavigation={this.state.allowedNavigation}
					toggleCard={this.toggleCard}
				/>
			);
		} else if (activePanelId === 'structural') {
			return (
				//Structural
				<StructuralMetadata
					onStructuralMetaDataUpdate={this.onStructuralMetaDataUpdate}
					structuralMetadata={this.state.structuralMetadata}
					structuralMetadataErrors={this.state.structuralMetadataErrors}
					currentVersionId={this.state._id}
				/>
			);
		} else {
			return (
				<Winterfell
					schema={this.state.jsonSchema}
					questionAnswers={this.state.questionAnswers}
					panelId={this.state.activePanelId}
					disableSubmit={true}
					readOnly={this.state.readOnly}
					validationErrors={this.state.validationErrors}
					renderRequiredAsterisk={() => <span>{'*'}</span>}
					onQuestionClick={this.onQuestionClick}
					onQuestionAction={this.onQuestionAction}
					onUpdate={this.onFormUpdate}
					onSubmit={this.onFormSubmit}
				/>
			);
		}
	};

	render() {
		const {
			lastSaved,
			searchString,
			totalQuestions,
			isLoading,
			activeGuidance,
			name,
			datasetVersion,
			activeflag,
			listOfDatasets,
			showDrawer,
			showArchiveModal,
			showUnArchiveModal,
			showCreateNewVersionModal,
			isWideForm,
			isTableForm,
			allowedNavigation,
			applicationStatus,
			userType,
			roles,
		} = this.state;
		const { userState, location } = this.props;

		/* Paul - new inputs and validation here */

		Winterfell.addInputType('typeaheadCustom', TypeaheadCustom);
		Winterfell.addInputType('typeaheadKeywords', TypeaheadKeywords);
		Winterfell.addInputType('datePickerCustom', DatePickerCustom);
		Winterfell.addInputType('typeaheadUser', TypeaheadUser);
		Winterfell.addInputType('multiField', MultiField);
		Winterfell.addInputType('textareaInputCustom', TextareaInputCustom);

		Winterfell.validation.default.addValidationMethods({
			isCustomDate: value => {
				if (_.isEmpty(value) || value === 'Invalid date') return true;
				return moment(value, 'DD/MM/YYYY').isValid();
			},
			isCustomDateRequired: value => {
				return moment(value, 'DD/MM/YYYY').isValid();
			},
			isValidDoiName: value => {
				return _.isEmpty(value) || !!value.match(/\b(10[.][0-9]{4,}(?:[.][0-9]+)*\/(?:(?!["&\'<>])\S)+)\b/gm);
			},
			isAtLeastOneKeywordSelected: value => {
				return !_.isEmpty(value);
			},
			isAtLeastOneSelected: value => {
				return !_.isEmpty(value);
			},
			isURLValid: value => {
				if (_.isEmpty(value)) return true;
				return !!value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
			},
			isMultiFieldRequired: value => {
				if (!_.isArray(value)) return !_.isEmpty(value);
				else {
					let isNoError = true;
					value.forEach(entry => {
						if (_.isEmpty(entry)) isNoError = false;
					});
					return isNoError;
				}
			},
			isMultiFieldURLRequired: value => {
				if (!_.isArray(value))
					return !_.isEmpty(value) && !!value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);

				let isNoError = true;
				value.forEach(url => {
					if (!url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)) isNoError = false;
				});
				return isNoError;
			},
			isMultiFieldURL: value => {
				if (!_.isArray(value))
					return _.isEmpty(value) || !!value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);

				let isNoError = true;
				value.forEach(url => {
					if (!url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)) isNoError = false;
				});
				return isNoError;
			},
			isAgeRangeValid: value => {
				return _.isEmpty(value) || !!value.match(/^[^\D-_](?!.*?[-_]{2,})([0-9-]{1,2})[^\D]*[^-_\D]$/);
			},
			isSelectedRequired: value => {
				return !_.isEmpty(value) && value !== 'undefined';
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
			<div>
				<SearchBar
					ref={this.searchBar}
					searchString={searchString}
					doSearchMethod={e => {
						SearchBarHelperUtil.doSearch(e, this);
					}}
					doUpdateSearchString={e => {
						SearchBarHelperUtil.updateSearchString(e, this);
					}}
					doToggleDrawer={e => this.toggleDrawer()}
					userState={userState}
				/>
				<Row className='banner'>
					<Col sm={12} md={8} className='banner-left'>
						<span className='white-20-semibold mr-5'>Dataset</span>
						<span className='white-16-semibold pr-5'>{name}</span>
						<span className='white-16-semibold pr-5' style={{ display: 'inline-block' }}>
							<Dropdown>
								<Dropdown.Toggle as={CustomToggle}>
									<span className='listOfVersionsButton'>
										{activeflag === 'draft' ? <>{datasetVersion} (Draft)</> : ''}
										{activeflag === 'active' ? <>{datasetVersion} (Live)</> : ''}
										{activeflag === 'rejected' ? <>{datasetVersion} (Rejected)</> : ''}
										{activeflag !== 'draft' && activeflag !== 'active' && activeflag !== 'rejected' ? <>{datasetVersion}</> : ''}
									</span>
								</Dropdown.Toggle>
								<Dropdown.Menu as={CustomMenu} className='listOfVersionsDropdown'>
									{listOfDatasets.map(dat => {
										return (
											<Dropdown.Item href={`/dataset-onboarding/${dat._id}`} className='black-14'>
												{dat.activeflag === 'draft' ? <>{dat.datasetVersion} (Draft)</> : ''}
												{dat.activeflag === 'active' ? <>{dat.datasetVersion} (Live)</> : ''}
												{dat.activeflag === 'rejected' ? <>{dat.datasetVersion} (Rejected)</> : ''}
												{dat.activeflag !== 'draft' && dat.activeflag !== 'active' && dat.activeflag !== 'rejected' ? (
													<>{dat.datasetVersion}</>
												) : (
													''
												)}

												{this.state._id === dat._id ? (
													<SVGIcon
														className='collectionCheckSvg'
														name='checkicon'
														width={16}
														height={16}
														viewbox='0 0 16 16'
														fill={'#2c8267'}
													/>
												) : (
													''
												)}
											</Dropdown.Item>
										);
									})}
								</Dropdown.Menu>
							</Dropdown>
						</span>
					</Col>
					<Col sm={12} md={4} className='d-flex justify-content-end align-items-center banner-right'>
						<span className='white-14-semibold'>{DarHelper.getSavedAgo(lastSaved)}</span>
						{
							<a
								className={`linkButton white-14-semibold ml-2 ${allowedNavigation ? '' : 'disabled'}`}
								onClick={this.onClickSave}
								href='!#'>
								Save now
							</a>
						}
						<CloseButtonSvg width='16px' height='16px' fill='#fff' onClick={e => this.redirectDashboard(e)} />
					</Col>
				</Row>

				<div id='darContainer' className='flex-form'>
					<div id='darLeftCol' className='scrollable-sticky-column'>
						{[...this.state.jsonSchema.pages].map((item, idx) => (
							<div key={`navItem-${idx}`} className={`${item.active ? 'active-border' : ''}`}>
								<div>
									<h3
										className={`${!this.state.inReviewMode ? 'black-16' : item.inReview ? 'black-16' : 'section-not-inreview'}
										${item.active ? 'section-header-active' : 'section-header'} 
										${this.state.allowedNavigation ? '' : 'disabled'}`}
										onClick={e => this.updateNavigation(item)}>
										<span>{item.title}</span>
										<span>{item.flag && <i className={DarHelper.flagIcons[item.flag]} />}</span>
									</h3>
									{item.active && (
										<ul className='list-unstyled section-subheader'>
											<NavItem
												parentForm={item}
												questionPanels={this.state.jsonSchema.questionPanels}
												onFormSwitchPanel={this.updateNavigation}
												activePanelId={this.state.activePanelId}
												enabled={allowedNavigation}
												notForReview={!item.inReview && this.state.inReviewMode}
											/>
										</ul>
									)}
								</div>
							</div>
						))}
					</div>

					<div id='darCenterCol' className={isWideForm ? 'extended' : '' || isTableForm ? 'table' : ''}>
						{/* Paul - Warnings go here */}

						{this.state.reviewWarning ? (
							<Alert variant='warning' className=''>
								<SVGIcon name='attention' width={24} height={24} fill={'#f0bb24'} viewBox='2 -9 22 22'></SVGIcon>
								You are not assigned to this section but can still view the form
							</Alert>
						) : (
							''
						)}

						<div style={{ backgroundColor: '#ffffff' }} className='dar__header'>
							{this.state.jsonSchema.pages
								? [...this.state.jsonSchema.pages].map((item, idx) =>
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
						<div
							className={`dar__questions ${this.state.activePanelId === 'beforeYouBegin' ? 'pad-bottom-0' : ''}
														${this.state.activePanelId === 'structural' ? 'margin-top-0 noPadding' : ''}`}
							style={{ backgroundColor: '#ffffff' }}>
							{this.renderApp()}
						</div>
					</div>
					{isWideForm || isTableForm ? null : (
						<div id='darRightCol' className='scrollable-sticky-column'>
							<div className='darTab'>
								<Guidance activeGuidance={activeGuidance} resetGuidance={this.resetGuidance} />
							</div>
						</div>
					)}
				</div>

				{/* Paul - Action bar here */}

				<div className='action-bar'>
					<div className='action-bar--questions'>
						<SLA classProperty={DarHelper.darStatusColours[applicationStatus]} text={DarHelper.darSLAText[applicationStatus]} />
						<div className='action-bar-status'>
							{applicationStatus === 'draft' ? totalQuestions : 'This version was published on 2 Jan 2021'}
						</div>
					</div>
					<div className='action-bar-actions'>
						<AmendmentCount answeredAmendments={this.state.answeredAmendments} unansweredAmendments={this.state.unansweredAmendments} />
						{userType.toUpperCase() === 'APPLICANT' ? (
							<ApplicantActionButtons
								allowedNavigation={allowedNavigation}
								onNextClick={this.onNextClick}
								onFormSubmit={this.onFormSubmit}
								onShowArchiveModal={this.toggleArchiveModal}
								onShowUnArchiveModal={this.toggleUnArchiveModal}
								onShowCreateNewVersionModal={this.toggleCreateNewVersionModal}
								showSubmit={this.state.showSubmit}
								submitButtonText={this.state.submitButtonText}
								showCreateNewVersion={this.state.showCreateNewVersion}
								showArchive={this.state.showArchive}
								showUnArchive={this.state.showUnArchive}
							/>
						) : (
							<CustodianActionButtons
								activeParty={this.state.activeParty}
								allowedNavigation={allowedNavigation}
								unansweredAmendments={this.state.unansweredAmendments}
								onUpdateRequest={this.onUpdateRequest}
								onActionClick={this.onCustodianAction}
								onNextClick={this.onNextClick}
								inReviewMode={this.state.inReviewMode}
								hasRecommended={this.state.hasRecommended}
								applicationStatus={applicationStatus}
								roles={roles}
							/>
						)}
					</div>
				</div>

				<SideDrawer open={showDrawer} closed={e => this.toggleDrawer()}>
					<UserMessages
						userState={userState[0]}
						closed={e => this.toggleDrawer()}
						toggleModal={this.toggleModal}
						drawerIsOpen={this.state.showDrawer}
						topicContext={this.state.topicContext}
					/>
				</SideDrawer>

				<CreateNewVersionModal
					open={showCreateNewVersionModal}
					close={this.toggleCreateNewVersionModal}
					pid={this.state.dataset.pid}
					currentVersionId={this.state._id}
					publisher={this.state.publisher}
				/>

				{/* Use Chris modal creator ????? */}
				{/* Submit for review modal */}
				{/* Approve modal */}
				{/* Reject modal */}
				{/* Archive modal */}
				{/* Unarchive modal */}

				{/* <Archive
					open={showArchiveModal}
					close={this.toggleArchiveModal}
					mainApplicant={this.state.mainApplicant}
					handleOnSaveChanges={this.submitContributors}></Archive> */}

				{/* <UnArchive
					open={showUnArchiveModal}
					close={this.toggleUnArchiveModal}
					mainApplicant={this.state.mainApplicant}
					handleOnSaveChanges={this.submitContributors}></UnArchive> */}

				{/* <UpdateRequestModal
					open={this.state.updateRequestModal}
					close={this.toggleUpdateRequestModal}
					publisher={this.state.publisher}
					projectName={projectName}
					applicationId={this.state._id}
					fullAmendments={this.state.fullAmendments}
					amendmentIterations={this.state.amendmentIterations}
				/> */}
			</div>
		);
	}
}

export default DatasetOnboarding;
