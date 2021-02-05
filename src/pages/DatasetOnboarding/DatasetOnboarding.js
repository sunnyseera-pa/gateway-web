import React, { Component, Fragment, useState } from 'react';
import { History } from 'react-router';
import { Container, Row, Col, Modal, Tabs, Tab, Alert, Tooltip, Button } from 'react-bootstrap';
import Winterfell from 'winterfell';
import _ from 'lodash';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import TypeaheadCustom from './components/TypeaheadCustom/TypeaheadCustom';
import TypeaheadKeywords from './components/TypeaheadKeywords/TypeaheadKeywords';
import TextareaInputCustom from './components/TextareaInputCustom/TextareaInputCustom';
import TypeaheadUser from './components/TypeaheadUser/TypeaheadUser';
import TypeaheadMultiUser from './components/TypeaheadUser/TypeaheadMultiUser';
import DatePickerCustom from './components/DatePickerCustom/DatepickerCustom';
import MultiField from './components/MultiField/MultiField';
import SearchBar from '../commonComponents/searchBar/SearchBar';
import Loading from '../commonComponents/Loading';
import NavItem from './components/NavItem/NavItem';
import NavDropdown from './components/NavDropdown/NavDropdown';
import WorkflowReviewStepsModal from '../commonComponents/workflowReviewStepsModal/WorkflowReviewStepsModal';
import ActivePhaseModal from '../commonComponents/workflowActivePhase/ActivePhaseModal';
import WorkflowReviewDecisionModal from '../commonComponents/workflowReviewDecision/WorkflowReviewDecisionModal';
import DarValidation from '../../utils/DarValidation.util';
import DarHelper from '../../utils/DarHelper.util';
import SearchBarHelperUtil from '../../utils/SearchBarHelper.util';
import { classSchema } from './classSchema';
import { baseURL } from '../../configs/url.config';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../commonComponents/userMessages/UserMessages';
import DataSetModal from '../commonComponents/dataSetModal/DataSetModal';
import 'react-tabs/style/react-tabs.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './DatasetOnboarding.scss';
import SVGIcon from '../../images/SVGIcon';
import { ReactComponent as CloseButtonSvg } from '../../images/close-alt.svg';
import moment from 'moment';
import AmendmentCount from './components/AmendmentCount/AmendmentCount';
import ApplicantActionButtons from './components/ApplicantActionButtons/ApplicantActionButtons';
import CustodianActionButtons from './components/CustodianActionButtons/CustodianActionButtons';
import ActionModal from './components/ActionModal/ActionModal';
import ContributorModal from './components/ContributorModal/ContributorModal';
import AssignWorkflowModal from './components/AssignWorkflowModal/AssignWorkflowModal';
import SLA from '../commonComponents/sla/SLA';
import BeforeYouBegin from './components/BeforeYouBegin/BeforeYouBegin';
import Guidance from './components/Guidance/Guidance';
import StructuralMetadata from './components/StructuralMetadata/StructuralMetadata';
import UpdateRequestModal from './components/UpdateRequestModal/UpdateRequestModal';
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
            workflow: {},
            activeWorkflow: {},
            files: [],
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
            mainApplicant: '',
            showDrawer: false,
            showModal: false,
            //showMrcModal: false,
            showActionModal: false,
            showWorkflowReviewModal: false,
            showWorkflowReviewDecisionModal: false,
            workflowReviewDecisionType: false,
            showActivePhaseModal: false,
            showArchiveModal: false,
            showUnArchiveModal: false,
            showCreateNewVersionModal: false,
            showAssignWorkflowModal: false,
            readOnly: false,
            userType: '',
            answeredAmendments: 0,
            unansweredAmendments: 0,
            isWideForm: false,
            isTableForm: false,
            allowsMultipleDatasets: false,
            activeAccordionCard: 0,
            allowedNavigation: true,
            projectNameValid: true,
            ncsValid: true,
            topicContext: {},
            authorIds: [],
            projectId: '',
            aboutApplication: {
                projectName: '',
                isNationalCoreStudies: false,
                nationalCoreStudiesProjectId: '',
                selectedDatasets: [],
                completedDatasetSelection: false,
                completedReadAdvice: false,
                completedCommunicateAdvice: false,
                completedApprovalsAdvice: false,
                completedSubmitAdvice: false,
                completedInviteCollaborators: false,
            },
            reviewSections: [],
            context: {},
            actionModalConfig: {},
            workflows: [],
            workflowAssigned: false,
            roles: [],
            nationalCoreStudiesProjects: [],
            inReviewMode: false,
            updateRequestModal: false
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
            let countedQuestionAnswers = {}, totalQuestions = '';

            try {
                // 1. Make API call to find and return the application form schema and answers matching this Id
                let response = await axios.get(`${baseURL}/api/v1/dataset-onboarding/${_id}`);
                // 2. Destructure backend response for this context containing details of DAR including question set and current progress
                let {
                    data: { data, data: { dataset: { questionAnswers, structuralMetadata } }, listOfDatasets }
                } = response;
                // 3. Set up the DAR
                this.setScreenData({ ...data, _id, questionAnswers, structuralMetadata, listOfDatasets, jsonSchema: { ...formSchema }, applicationStatus: data.dataset.activeflag });
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
            questionAnswers,
            structuralMetadata = [],
            listOfDatasets = [],
            _id,
            hasRecommended,
            amendmentIterations = [],
            applicationStatus,
            aboutApplication = {},
            dataset,
            readOnly = false,
            userType = 'APPLICANT',
            unansweredAmendments = 0,
            answeredAmendments = 0,
            mainApplicant,
            userId,
            authorIds,
            projectId,
            inReviewMode = false,
            reviewSections = [],
            workflow,
            files,
        } = context;

        let {
            name,
            datasetVersion,
            activeflag,
            datasetfields: { publisher },
        } = dataset;



        ///let { firstname, lastname } = mainApplicant;
        let showSubmit = false;
        let submitButtonText = 'Submit for review';
        let showCreateNewVersion = false;
        let showArchive = false;
        let showUnArchive = false;

        let publisherId = '',
            workflowEnabled = false;
        if (dataset.publisher) {
            ({ _id: publisherId, workflowEnabled } = dataset.publisher);
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
            //topicContext,
            name,
            datasetVersion,
            activeflag,
            publisher,
            aboutApplication,
            //allowsMultipleDatasets,
            //context: modalContext,
            readOnly,
            answeredAmendments,
            unansweredAmendments,
            userType,
            userId,
            //mainApplicant: `${firstname} ${lastname}${this.checkCurrentUser(userId) ? ' (you)' : ''}`,
            authorIds,
            projectId,
            showSubmit,
            submitButtonText,
            showCreateNewVersion,
            showArchive,
            showUnArchive,
            //publisherId,
            //workflowEnabled,
            inReviewMode,
            reviewSections,
            workflow,
            workflowAssigned: !_.isEmpty(workflow) ? true : false,
            files,
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
        jsonSchema.pages.forEach(element => element.active = false);
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
                if (response.data.name)
                    this.setState({ name: response.data.name });
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
            // 2. Pass no completed bool value to go to next step without modifying completed status
            this.onNextStep();
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
                activeGuidance: ''
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
        let response = await axios.post(`${baseURL}/api/v1/data-access-request/${this.state._id}/amendments`, { questionSetId, questionId, mode });
        let { accessRecord: { jsonSchema, questionAnswers = null, answeredAmendments, unansweredAmendments, amendmentIterations } } = response.data;
        jsonSchema = this.injectStaticContent(jsonSchema, this.state.inReviewMode, this.state.reviewSections);

        let stateObj = _.omitBy({
            jsonSchema,
            questionAnswers,
            answeredAmendments,
            unansweredAmendments,
            amendmentIterations
        }, _.isNil);

        return stateObj;
    }

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

	/* onHandleDataSetChange = (value = []) => {
		// 1. Deconstruct current state
		let { aboutApplication, allowedNavigation, topicContext } = { ...this.state };

		aboutApplication.selectedDatasets = [...value];

		// 3. If no datasets are passed, set invalid and incomplete step, and update message context
		if (_.isEmpty(value)) {
			let emptyTopicContext = DarHelper.createTopicContext();
			aboutApplication.completedDatasetSelection = false;
			allowedNavigation = false;
			topicContext = {
				...topicContext,
				...emptyTopicContext,
			};
		} else {
			let updatedTopicContext = DarHelper.createTopicContext(aboutApplication.selectedDatasets);
			allowedNavigation = true;
			topicContext = {
				...topicContext,
				...updatedTopicContext,
			};
			// 4. Create data object to save
			let dataObj = { key: 'aboutApplication', data: aboutApplication };
			// 5. Update application
			this.updateApplication(dataObj);
		}

		// 6. Update state to reflect change
		this.setState({
			allowedNavigation,
			aboutApplication,
			topicContext,
		});
	}; */

	/* onHandleProjectNameBlur = () => {
		// 1. Deconstruct current state
		let { aboutApplication, projectNameValid, ncsValid } = this.state;
		// 2. Save updates if entire step is valid
		if (projectNameValid && ncsValid) {
			// 3. Set up aboutApplication object for saving
			let dataObj = { key: 'aboutApplication', data: aboutApplication };
			// 4. Update application
			this.updateApplication(dataObj);
		}
	}; */

	/* onHandleProjectNameChange = projectName => {
		// 1. Deconstruct current state
		let { aboutApplication } = this.state;
		// 2. Update 'about application' state with project name
		aboutApplication.projectName = projectName;
		// 3. Update state to reflect change
		this.setState({
			allowedNavigation: this.isAboutApplicationValid(aboutApplication),
			aboutApplication,
		});
	}; */

	/* isAboutApplicationValid = aboutApplication => {
		let isValid = false;
		// 1. Desconstruct aboutApplication object to validate
		let { projectName = '', isNationalCoreStudies = false, nationalCoreStudiesProjectId = '' } = aboutApplication;
		// 2. Check valid state of NCS project selection
		let projectNameValid = !_.isEmpty(projectName.trim());
		let ncsValid = isNationalCoreStudies === false || (isNationalCoreStudies && !_.isEmpty(nationalCoreStudiesProjectId));
		// 3. Set individaul validation states
		this.setState({
			projectNameValid,
			ncsValid,
		});
		// 4. Determine overall valid state
		if (projectNameValid && ncsValid) {
			isValid = true;
		}
		// 5. Return result
		return isValid;
	}; */

	/* onHandleProjectIsNCSToggle = async e => {
		// 1. Deconstruct aboutApplication from state
		let { aboutApplication } = this.state;
		// 2. Update about application object
		aboutApplication.isNationalCoreStudies = e.target.checked;
		aboutApplication.nationalCoreStudiesProjectId = '';
		// 3. If toggle is checked, get NCS tagged projects
		this.getNationalCoreStudiesProjects();
		// 4. Save validation state, disable navigation if toggle was checked until project is selected, remove previous selected project
		this.setState({
			aboutApplication,
			allowedNavigation: this.isAboutApplicationValid(aboutApplication),
		});
	}; */

	/* onHandleNCSProjectChange = e => {
		// 1. Deconstruct aboutApplication from state
		let { aboutApplication } = this.state;
		// 2. Update about application object
		aboutApplication.nationalCoreStudiesProjectId = e;
		// 3. Set state updating validation
		this.setState({
			aboutApplication,
			allowedNavigation: this.isAboutApplicationValid(aboutApplication),
		});
	}; */

	/* getNationalCoreStudiesProjects = async () => {
		try {
			// 1. Call endpoint to retrieve NCS projects
			let response = await axios.get(`${baseURL}/api/v1/tools/project/tag/NCS`);
			const {
				data: { entities },
			} = response;
			// 2. Store found projects in state
			this.setState({
				nationalCoreStudiesProjects: entities,
			});
		} catch (err) {
			console.error(err);
			return [];
		}
	}; */

    onNextStep = async completed => {
        // 1. Deconstruct current state
        let { aboutApplication, activeAccordionCard } = this.state;
        // 2. If a completed flag has been passed, update step during navigation
        if (!_.isUndefined(completed)) {
            switch (activeAccordionCard) {
                case 0:
                    aboutApplication.completedDatasetSelection = completed;
                    break;
                case 1:
                    // Do nothing, valid state for project name step handled by existence of text
                    break;
                case 2:
                    aboutApplication.completedInviteCollaborators = completed;
                    break;
                case 3:
                    aboutApplication.completedReadAdvice = completed;
                    break;
                case 4:
                    aboutApplication.completedCommunicateAdvice = completed;
                    break;
                default:
                    console.error('Invalid step passed');
                    break;
            }
        }
        // 3. Update application
        let dataObj = { key: 'beforeYouBegin', data: aboutApplication };
        await this.updateApplication(dataObj);

        // 4. Set new state
        this.setState({
            activeAccordionCard: ++activeAccordionCard,
            aboutApplication,
        });
    };

    onCustodianAction = value => {
        value === 'AssignWorkflow' ? this.toggleAssignWorkflowModal() : this.toggleActionModal(value);
    };

	/* completeActivePhase = async () => {
		await axios
			.put(`${baseURL}/api/v1/data-access-request/${this.state._id}/stepoverride`)
			.then(response => {
				this.loadDataAccessRequest(this.state._id);
				this.toggleWorkflowReviewModal();
			})
			.catch(error => {
				console.log(error);
			});
	}; */

	/* onDecisionReview = async (approved, comments) => {
		let params = {
			approved,
			comments,
		};
		await axios
			.put(`${baseURL}/api/v1/data-access-request/${this.state._id}/vote`, params)
			.then(response => {
				this.loadDataAccessRequest(this.state._id);
				this.toggleWorkflowReviewDecisionModal();
				// redirect to dashboard with message
				let alert = {
					publisher: this.state.publisher || '',
					nav: `dataaccessrequests&team=${this.state.publisher}`,
					tab: 'inReview',
					message: `You have successfully sent your recommendation for your assigned phase of ${this.state.aboutApplication.projectName} project`,
				};
				// 4. redirect with Publisher name, Status: reject, approved, key of tab: presubmission, inreview, approved, rejected
				this.props.history.push({
					pathname: `/account`,
					search: '?tab=dataaccessrequests',
					state: { alert },
				});
			})
			.catch(error => {
				alert(error.message);
			});
	}; */

    onStructuralMetaDataUpdate = (structuralMetadata, structuralMetadataErrors) => {
        this.setState({ structuralMetadata, structuralMetadataErrors });
    };



    toggleCard = (e, eventKey) => {
        e.preventDefault();
        // 1. Deconstruct current state
        let { aboutApplication, activeAccordionCard } = this.state;
        if (activeAccordionCard === eventKey) {
            eventKey = -1;
        }
        // 2. Set new state
        this.setState({
            activeAccordionCard: eventKey,
            aboutApplication,
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

    toggleModal = (showEnquiry = false, modalContext) => {
        this.setState(prevState => {
            return {
                showModal: !prevState.showModal,
                context: modalContext,
            };
        });

        if (showEnquiry) {
            this.toggleDrawer();
        }
    };

	/* toggleMrcModal = () => {
		this.setState(prevState => {
			return { showMrcModal: !prevState.showMrcModal };
		});
	}; */

    toggleActionModal = (type = '') => {
        let actionModalConfig = {};
        // 1. get basic modal config
        if (!_.isEmpty(type)) actionModalConfig = DarHelper.configActionModal(type);
        // 2. set state for hide/show/config modal
        this.setState(prevState => {
            return {
                showActionModal: !prevState.showActionModal,
                actionModalConfig,
            };
        });
    };

	/* toggleAssignWorkflowModal = async () => {
		let response = await axios.get(`${baseURL}/api/v1/publishers/${this.state.publisherId}/workflows`);
		let { workflows } = response.data;
		this.setState(prevState => {
			return {
				workflows,
				showAssignWorkflowModal: !prevState.showAssignWorkflowModal,
			};
		});
	}; */

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

	/* toggleActivePhaseModal = () => {
		this.setState(prevState => {
			return {
				showActivePhaseModal: !prevState.showActivePhaseModal,
			};
		});
	}; */

    toggleWorkflowReviewModal = (e, activePhase = false) => {
        this.setState(prevState => {
            return {
                showWorkflowReviewModal: !prevState.showWorkflowReviewModal,
                showActivePhaseModal: activePhase,
            };
        });
    };

    toggleWorkflowReviewDecisionModal = (type = false) => {
        this.setState(prevState => {
            return {
                showWorkflowReviewDecisionModal: !prevState.showWorkflowReviewDecisionModal,
                workflowReviewDecisionType: type,
            };
        });
    };

	/* updateContributors = contributors => {
		let updatedAuthorIds = [...contributors].map(user => user.id);
		this.setState({ updatedAuthorIds });
	}; */

	/* submitContributors = async () => {
		let { updatedAuthorIds: authorIds, _id } = this.state;
		const body = {
			authorIds,
		};
		// 1. Update action status
		await axios.put(`${baseURL}/api/v1/data-access-request/${_id}`, body);
		this.setState({ authorIds });
	}; */

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
                let questionSetId, answer, section, pageId, page, questions, question = '';
                // reduce over questionanswers object using lodash
                fullAmendments = _.reduce(questionAnswers, (obj, value, key) => {
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
                        obj = { ...obj, [location]: [{ question, answer }] }
                    } else if (obj[location]) {
                        let arr = [...obj[location], { question, answer }];
                        obj[location] = arr;
                    }
                    return obj;
                }, {});
            }
        }
        this.setState({ updateRequestModal: !updateRequestModal, fullAmendments });
    }

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
            datasets,
            showDrawer,
            showModal,
            //showMrcModal,
            showActionModal,
            showArchiveModal,
            showUnArchiveModal,
            showCreateNewVersionModal,
            showAssignWorkflowModal,
            isWideForm,
            isTableForm,
            allowedNavigation,
            applicationStatus,
            aboutApplication: { projectName = '', selectedDatasets },
            context,
            projectId,
            userType,
            actionModalConfig,
            roles,
        } = this.state;
        const { userState, location } = this.props;

        /* Paul - new inputs and validation here */

        Winterfell.addInputType('typeaheadKeywords', TypeaheadKeywords);
        Winterfell.addInputType('datePickerCustom', DatePickerCustom);
        Winterfell.addInputType('typeaheadUser', TypeaheadUser);
        Winterfell.addInputType('multiField', MultiField);
        Winterfell.addInputType('textareaInputCustom', TextareaInputCustom);




        Winterfell.validation.default.addValidationMethods({



            'isCustomDate': value => {
                if (_.isEmpty(value) || _.isNil(value) || moment(value, 'DD/MM/YYYY').isValid()) {
                    return true;
                }
                return false;
            },


            'isValidDoiName': value => {
                return !_.isEmpty(value) && !!value.match(/\b(10[.][0-9]{4,}(?:[.][0-9]+)*\/(?:(?!["&\'<>])\S)+)\b/gm);
            },
            'isAtLeastOneKeywordSelected': value => {
                return !_.isEmpty(value);
            },
            'isMultiFieldURL': value => {
                if (_.isEmpty(value)) return true;




                /* imageLink: Yup.string().matches(/^(http|https){1}:\/\/[A-Za-z0-9-\/\._~:\?#\[\]@!\$&'\(\)\*\+,;%=]+$/, {
				message: 'Invalid URL: should start with http:// or https://',
			}), */

            }


            //isSlug for age range
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
                        <span className='white-16-semibold pr-5'>
                            {name}
                        </span>
                        <span className='white-16-semibold pr-5' style={{ 'display': 'inline-block' }}>
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
                                                {dat.activeflag !== 'draft' && dat.activeflag !== 'active' && dat.activeflag !== 'rejected' ? <>{dat.datasetVersion}</> : ''}

                                                {this.state._id === dat._id ?
                                                    <SVGIcon
                                                        className='collectionCheckSvg'
                                                        name='checkicon'
                                                        width={16}
                                                        height={16}
                                                        viewbox='0 0 16 16'
                                                        fill={'#2c8267'}
                                                    />
                                                    : ''
                                                }
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
                        {this.state.reviewWarning ? (
                            <Alert variant='warning' className=''>
                                <SVGIcon name='attention' width={24} height={24} fill={'#f0bb24'} viewBox='2 -9 22 22'></SVGIcon>
                                You are not assigned to this section but can still view the form
							</Alert>
                        ) : (
                                ''
                            )}
                        <div id='darDropdownNav'>
                            <NavDropdown
                                options={{
                                    ...this.state.jsonSchema,
                                    allowsMultipleDatasets: this.state.allowsMultipleDatasets,
                                }}
                                onFormSwitchPanel={this.updateNavigation}
                                enabled={allowedNavigation}
                            />
                        </div>
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
                                <Guidance
                                    activeGuidance={activeGuidance}
                                    resetGuidance={this.resetGuidance}
                                />
                            </div>
                        </div>
                    )}
                </div>


                {/* Paul - Action bar here */}


                <div className='action-bar'>
                    <div className='action-bar--questions'>
                        <SLA classProperty={DarHelper.darStatusColours[applicationStatus]} text={DarHelper.darSLAText[applicationStatus]} />
                        <div className='action-bar-status'>
                            {applicationStatus === 'draft' ? (
                                totalQuestions
                            ) :
                                'This version was published on 2 Jan 2021'}

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
                                    onWorkflowReview={this.toggleWorkflowReviewModal}
                                    onWorkflowReviewDecisionClick={this.toggleWorkflowReviewDecisionModal}
                                    onNextClick={this.onNextClick}
                                    workflowEnabled={this.state.workflowEnabled}
                                    workflowAssigned={this.state.workflowAssigned}
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








                {/* <DataSetModal open={showModal} context={context} closed={this.toggleModal} userState={userState[0]} /> */}

                <ActionModal
                    open={showActionModal}
                    context={actionModalConfig}
                    updateApplicationStatus={this.updateApplicationStatus}
                    close={this.toggleActionModal}
                />

                {/* <WorkflowReviewStepsModal
					open={this.state.showWorkflowReviewModal}
					close={this.toggleWorkflowReviewModal}
					workflow={this.state.workflow}
				/> */}

                {/* <ActivePhaseModal
					open={this.state.showActivePhaseModal}
					close={this.toggleActivePhaseModal}
					workflow={this.state.workflow}
					projectName={projectName}
					dataSets={selectedDatasets}
					completeActivePhase={this.completeActivePhase}
				/> */}

                {/* <WorkflowReviewDecisionModal
					open={this.state.showWorkflowReviewDecisionModal}
					close={this.toggleWorkflowReviewDecisionModal}
					onDecisionReview={this.onDecisionReview}
					approved={this.state.workflowReviewDecisionType}
					workflow={this.state.workflow}
					projectName={projectName}
					dataSets={selectedDatasets}
				/> */}

                <ContributorModal
                    open={showArchiveModal}
                    close={this.toggleArchiveModal}
                    mainApplicant={this.state.mainApplicant}
                    handleOnSaveChanges={this.submitContributors}>

                </ContributorModal>

                <ContributorModal
                    open={showUnArchiveModal}
                    close={this.toggleUnArchiveModal}
                    mainApplicant={this.state.mainApplicant}
                    handleOnSaveChanges={this.submitContributors}>
                </ContributorModal>

                <CreateNewVersionModal
                    open={showCreateNewVersionModal}
                    close={this.toggleCreateNewVersionModal}
                    pid={this.state.dataset.pid}
                    currentVersionId={this.state._id}
                    publisher={this.state.publisher} />

                {/* <AssignWorkflowModal
					open={showAssignWorkflowModal}
					close={this.toggleAssignWorkflowModal}
					applicationId={this.state._id}
					publisher={datasets[0].datasetfields.publisher}
					workflows={this.state.workflows}
				/> */}

                <UpdateRequestModal
                    open={this.state.updateRequestModal}
                    close={this.toggleUpdateRequestModal}
                    publisher={this.state.publisher}
                    projectName={projectName}
                    applicationId={this.state._id}
                    fullAmendments={this.state.fullAmendments}
                    amendmentIterations={this.state.amendmentIterations} />

                {/* <Modal
					show={showMrcModal}
					onHide={e => this.toggleMrcModal()}
					size='lg'
					aria-labelledby='contained-modal-title-vcenter'
					centered
					className='darModal'>
					<iframe src='https://hda-toolkit.org/story_html5.html' className='darIframe'>
						{' '}
					</iframe>
				</Modal> */}
            </div >
        );
    }
}

export default DatasetOnboarding;
