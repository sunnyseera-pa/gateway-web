import React, { Component, Fragment, useState } from 'react';
import { History } from 'react-router';
import { OverlayTrigger, Tooltip, Container, Row, Col, Alert } from 'react-bootstrap';
import Winterfell from 'winterfell';
import _ from 'lodash';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import TypeaheadCustom from './components/TypeaheadCustom/TypeaheadCustom';
import TypeaheadCustomKeyValue from './components/TypeaheadCustom/TypeaheadCustomKeyValue';
import TypeaheadKeywords from './components/TypeaheadKeywords/TypeaheadKeywords';
import TextareaInputCustom from './components/TextareaInputCustom/TextareaInputCustom';
import TypeaheadUser from './components/TypeaheadUser/TypeaheadUser';
import DatePickerCustom from './components/DatePickerCustom/DatepickerCustom';
import MultiField from './components/MultiField/MultiField';
import SearchBar from '../commonComponents/searchBar/SearchBar';
import Loading from '../commonComponents/Loading';
import NavItem from './components/NavItem/NavItem';
import DarValidation from '../../utils/DarValidation.util';
import DarHelper from '../../utils/DarHelper.util';
import DatasetOnboardingHelper from '../../utils/DatasetOnboardingHelper.util';
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
import StatusDisplay from '../commonComponents/StatusDisplay';



import ActionModal from './components/ActionModal/ActionModal';




import Dropdown from 'react-bootstrap/Dropdown';

import { formSchema } from './formSchema';
import DatasetOnboardingHelperUtil from '../../utils/DatasetOnboardingHelper.util';

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
			showActionModal: false,
			actionModalConfig: {},
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
			userType = 'CUSTODIAN',
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

		this.setState({roles: this.getUserRoles()});
		if (this.state.roles.includes('admin') && applicationStatus === DarHelper.darStatus.inReview) userType = 'ADMIN';

		jsonSchema = this.injectStaticContent(jsonSchema, inReviewMode, reviewSections);
		jsonSchema = this.injectObservations(jsonSchema, questionAnswers);     

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
	 * injectObservations
	 * @desc Function to inject observation questions into schema
	 * @returns {jsonSchmea} object
	 */
	injectObservations(jsonSchema = {}, questionAnswers = {}) {
		let {questions} = DatasetOnboardingHelperUtil.findQuestionSet('observations', { ...jsonSchema });
		let listOfObservationFields = questions.map(x => x.questionId).flat()
		
		let listOfObservationUniqueIds = [];
		listOfObservationFields.forEach(field => {
			Object.keys(questionAnswers).some(function(key) {
				var regex = new RegExp(field.toLowerCase().replace(/\//g, '\\/')+'_', 'g');
				if (key.match(regex)) {
					let [, uniqueId] = key.split('_');
					if(!_.find(listOfObservationUniqueIds, uniqueId)) {
						listOfObservationUniqueIds.push(uniqueId)
					  }
				}
			});
		})

		listOfObservationUniqueIds.forEach(uniqueId => {
			let duplicateQuestionSet = DatasetOnboardingHelperUtil.questionSetToDuplicate('add-observations', { ...jsonSchema }, uniqueId);
			jsonSchema = DatasetOnboardingHelperUtil.insertSchemaUpdates('add-observations', duplicateQuestionSet, { ...jsonSchema });
		});
		
		return jsonSchema;
	}	
	
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
			this.toggleActionModal('SUBMITFORREVIEW');
		} else {
			let activePage = _.get(_.keys({ ...errors }), 0);
			let activePanel = _.get(_.keys({ ...errors }[activePage]), 0);
			let validationMessages = validationSectionMessages;
			
			this.toggleActionModal('VALIDATIONERRORS');
			
			//alert('Some validation issues have been found. Please see all items highlighted in red on this page.');
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
			const response = await axios.patch(`${baseURL}/api/v1/dataset-onboarding/${id}`, params);
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

		questionSet = DatasetOnboardingHelperUtil.findQuestionSet(questionSetId, { ...this.state.jsonSchema });

		if (!_.isEmpty(questionSet) && !_.isEmpty(questionId)) {
			// remove about and files from pages to stop duplicate, about / files added to DAR on init
			schema = DatasetOnboardingHelperUtil.removeStaticPages({ ...this.state.jsonSchema });

			let {
				input: { action },
			} = DatasetOnboardingHelperUtil.findQuestion(questionId, questionSet);
			switch (action) {
				case 'addObservation':
					let duplicateQuestionSet = DatasetOnboardingHelperUtil.questionSetToDuplicate(questionSetId, { ...schema });
					jsonSchema = DatasetOnboardingHelperUtil.insertSchemaUpdates(questionSetId, duplicateQuestionSet, { ...schema });
					this.setState({
						jsonSchema
					})
					break;
				case 'removeObservation':
					jsonSchema = DatasetOnboardingHelperUtil.removeQuestionReferences(questionSetId, questionId, { ...schema });
					questionAnswers = DatasetOnboardingHelperUtil.removeQuestionAnswers(questionId, { ...this.state.questionAnswers });
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
			let questionList = [...questionSets].filter(q => q.questionSetId.includes(this.state.activePanelId)) || [];
			questions = questionList.map(({questions}) => questions).flat();
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

	onCustodianAction = value => {
		this.toggleActionModal(value);
	};

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

	toggleCreateNewVersionModal = () => {
		this.toggleActionModal('CREATENEWVERSION');
	};

	toggleActionModal = (type = '') => {
		let actionModalConfig = {};
		// 1. get basic modal config
		if (!_.isEmpty(type)) actionModalConfig = DatasetOnboardingHelper.configActionModal(type);
		// 2. set state for hide/show/config modal
		this.setState(prevState => {
			return {
				showActionModal: !prevState.showActionModal,
				actionModalConfig,
			};
		});
	};

	redirectDashboard = e => {
		e.preventDefault();
		this.props.history.push({
			pathname: `/account`,
			search: '?tab=datasets',
			state: { team: this.state.publisher },
		});
	};

	datasetVersionAction = async (action = {}) => {
		let { type, statusDesc } = action;

		switch (type) {
			case 'CONFIRMNEWVERSION' :
				try {
					if (!_.isEmpty(this.state.dataset.pid) && !_.isEmpty(this.state.publisher)) {
						axios.post(baseURL + '/api/v1/dataset-onboarding', { publisherID: this.state.publisher, pid: this.state.dataset.pid, currentVersionId: this.state._id }).then(res => {
							let { id } = res.data.data;
							this.props.history.push({ pathname: `/dataset-onboarding/${id}` });
							
							//history.push({ pathname: `/dataset-onboarding/${id}` });
							this.toggleActionModal();
						});
					}
				} catch (err) {
					console.log(err);
				}
				break;
			case 'CONFIRMSUBMISSION':
				try {
					let { _id } = this.state;
					// 1. POST
					await axios.post(`${baseURL}/api/v1/dataset-onboarding/${_id}`, {});
					const lastSaved = DatasetOnboardingHelper.saveTime();
					this.setState({ lastSaved });

					let alert = {
						tab: 'inReview',
						message:
							this.state.applicationStatus === 'inReview'
								? 'You have successfully submitted your dataset for review. You will be notified when a decision has been made.'
								: `You have successfully saved updates to '${this.state.projectName || this.state.datasets[0].name}' application`,
					};
					this.props.history.push({
						pathname: '/account',
						search: '?tab=datasets',
						state: { alert, team: this.state.publisher,},
					});
				} catch (err) {
					console.log(err);
				}
				break;
			case 'CONFIRMAPPROVALCONDITIONS':
			case 'CONFIRMREJECTION':
			case 'CONFIRMAPPROVAL':
				let { _id } = this.state;
				const body = {
					applicationStatus: this.applicationState[type],
					applicationStatusDesc: statusDesc,
				};
				// 1. Update action status
				const response = await axios.put(`${baseURL}/api/v1/dataset-onboarding/${_id}`, body);
				
				/* let alert = {
					tab: 'inReview',
					message:
						this.state.applicationStatus === 'inReview'
							? 'You have successfully submitted your dataset for review. You will be notified when a decision has been made.'
							: `You have successfully saved updates to '${this.state.projectName || this.state.datasets[0].name}' application`,
				}; */
				
				this.props.history.push({
					pathname: '/account',
					search: '?tab=datasets',
					state: { team: 'admin',},
				});

				// 2. set alert object for screen
				/* let alert = {
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
				});  */
				break;
			default:
				this.toggleActionModal();
		}

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
				
				
				/* // 1. Update action status
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
				}); */
				break;
			default:
				this.toggleActionModal();
		}
	};

	getUserRoles() {
		let { teams } = this.props.userState[0];

		let foundAdmin = teams.filter(x => x.type === 'admin');
		if (!_.isEmpty(foundAdmin)) {
			return ['admin'];
		}

		let foundTeam = teams.filter(team => team.name === this.state.publisher);
		if (_.isEmpty(teams) || _.isEmpty(foundTeam)) {
			return ['applicant'];
		}
		




		/* let { teams } = props.userState[0];
		let foundAdmin = teams.filter(x => x.type === team);
		if (!_.isEmpty(foundAdmin)) {
			return 'admin';
		}
		let foundTeam = teams.filter(x => x.name === team);
		if (_.isEmpty(teams) || _.isEmpty(foundTeam)) {
			return ['applicant']; //pass back to user
		}

		return foundTeam[0]._id; */
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
					readOnly={this.state.readOnly}
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
			showCreateNewVersionModal,
			showActionModal,
			actionModalConfig,
			isWideForm,
			isTableForm,
			allowedNavigation,
			applicationStatus,
			userType,
			roles,
		} = this.state;
		const { userState, location } = this.props;

		Winterfell.addInputType('typeaheadCustom', TypeaheadCustom);
		Winterfell.addInputType('typeaheadCustomKeyValue', TypeaheadCustomKeyValue);
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
					if (!_.isEmpty(url) && !url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)) isNoError = false;
				});
				return isNoError;
			},
			isAgeRangeValid: value => {
				return _.isEmpty(value) || !!value.match(/^[^\D-_](?!.*?[-_]{2,})([0-9-]{1,2})[^\D]*[^-_\D]$/);
			},
			isSelectedRequired: value => {
				return !_.isEmpty(value) && value !== 'undefined';
			},
			isTitleUnique: value => {
				
				
				
				
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


		let completion = {
			Summary: 'partial',
			Documentation: 'partial',
			Coverage: 'empty',
			Provenance: 'partial',
			Accessibility: 'empty',
			'Enrichment and Linkage': 'partial',
			Observations: 'partial',
			'Structural metadata': 'partial',
		};

		
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
										{datasetVersion}
										{activeflag === 'draft' ? ' (Draft)' : ''}
										{activeflag === 'active' ? ' (Live)' : ''}
										{activeflag === 'rejected' ? ' (Rejected)' : ''}
										{activeflag === 'inReview' ? ' (Pending)' : ''}
									</span>
								</Dropdown.Toggle>
								<Dropdown.Menu as={CustomMenu} className='listOfVersionsDropdown'>
									{listOfDatasets.map(dat => {
										return (
											<Dropdown.Item href={`/dataset-onboarding/${dat._id}`} className='black-14'>
												{dat.datasetVersion}
												{dat.activeflag === 'draft' ? ' (Draft)' : ''}
												{dat.activeflag === 'active' ? ' (Live)' : ''}
												{dat.activeflag === 'rejected' ? ' (Rejected)' : ''}
												{dat.activeflag === 'inReview' ? ' (Pending)' : ''}

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
								<div >
									<span
										className={`${!this.state.inReviewMode ? 'black-16' : item.inReview ? 'black-16' : 'section-not-inreview'}
										${item.active ? 'section-header-active' : 'section-header'} 
										${this.state.allowedNavigation ? '' : 'disabled'}`}
										onClick={e => this.updateNavigation(item)}>
																
										<div>
											<div className='completionIconHolder'>
												{item.title === 'Before you begin' ? <div className='completionIconGap'></div> :
													<OverlayTrigger
														key={item.title}
														placement='top'
														overlay={
															<Tooltip id={`tooltip-top`}>
																{item.title}: {completion[item.title]}
															</Tooltip>
														}>
														<div>
															<StatusDisplay section={item.title} status={completion[item.title]} />
														</div>
													</OverlayTrigger>
												}
											</div>
											<div className='titleHolder'>{item.title}</div>
											<div> {item.flag && <i className={DarHelper.flagIcons[item.flag]} />}</div>
										</div>
									</span>
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

				<div className='action-bar'>
					<div className='action-bar--questions'>
						<SLA classProperty={DarHelper.darStatusColours[applicationStatus]} text={DarHelper.darSLAText[applicationStatus]} />
						<div className='action-bar-status'>
							{applicationStatus === 'draft' ? totalQuestions : ''}
							{applicationStatus === 'active' ? 'This version was published on 12 Feb 2021' : ''}
							{applicationStatus === 'inReview' ? 'Submitted for review on 12 Feb 2021' : ''}
							{applicationStatus === 'rejected' ? 'This version was rejected on 12 Feb 2021' : ''}
							{applicationStatus === 'archived' ? 'This version was published on 2 Feb 2021 and archived on 12 Feb 2021' : ''}
							{/* Status updated here */}
						</div>
					</div>
					<div className='action-bar-actions'>
						<AmendmentCount answeredAmendments={this.state.answeredAmendments} unansweredAmendments={this.state.unansweredAmendments} />
						{userType.toUpperCase() === 'CUSTODIAN'  ? (
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
								allowedNavigation={allowedNavigation}
								onActionClick={this.onCustodianAction}
								onNextClick={this.onNextClick}
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

				<ActionModal
					open={showActionModal}
					context={actionModalConfig}
					datasetVersionAction={this.datasetVersionAction}
					close={this.toggleActionModal}
				/>

			</div>
		);
	}
}

export default DatasetOnboarding;
