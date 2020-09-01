import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Modal, Tabs, Tab, Accordion, Card } from 'react-bootstrap';
import Winterfell from 'winterfell';
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import TypeaheadCustom from './components/TypeaheadCustom';
import TypeaheadUser from './components/TypeaheadUser';
import TypeaheadDataset from './components/TypeaheadDataset';
import DatePickerCustom from './components/DatepickerCustom';
import SearchBar from '../commonComponents/searchBar/SearchBar';
import Loading from '../commonComponents/Loading';
import NavItem from './components/NavItem';
import NavDropdown from './components/NavDropdown';
import DarValidation from '../../utils/DarValidation.util';
import DarHelper from '../../utils/DarHelper.util';
import { classSchema } from './classSchema';
import { baseURL } from '../../configs/url.config';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../commonComponents/userMessages/UserMessages';
import DataSetModal from '../commonComponents/dataSetModal/DataSetModal';
import 'react-tabs/style/react-tabs.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './DataAccessRequest.scss';
import { Link } from 'react-router-dom';
import SVGIcon from '../../images/SVGIcon';

class DataAccessRequest extends Component {
	constructor(props) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onFormUpdate = this.onFormUpdate.bind(this);
		this.onQuestionFocus = this.onQuestionFocus.bind(this);
		this.onHandleDataSetChange = this.onHandleDataSetChange.bind(this);
		this.searchBar = React.createRef();

		this.state = {
			_id: '',
			jsonSchema: {},
			questionAnswers: {},
			applicationStatus: '',
			activePanelId: '',
			activeGuidance: '',
			searchString: '',
			key: 'guidance',
			totalQuestions: '',
			validationErrors: {},
			lastSaved: '',
			lookup: ['fullname'],
			isLoading: true,
			formSubmitted: false,
			datasets: [{
				name: '',
				datasetfields: {
					publisher: ''
				}
			}],
			publisher: '',
			contactPoint: '',
			showDrawer: false,
			showModal: false,
			showMrcModal: false,
			isWideForm: false,
			is5SafesForm: false,
			activeAccordionCard: 0,
			allowedNavigation: true,
			topicContext: {},
			aboutApplication: {
				selectedDatasets: [],
				completedDatasetSelection: false,
				completedReadAdvice: false,
				completedCommunicateAdvice: false,
				completedApprovalsAdvice: false,
				completedSubmitAdvice: false,
				completedInviteCollaborators: false
			},
			context: {}
		};
	}

	aboutPageNav = {
		pageId: 'about',
		active: true,
		title: 'About this application',
		description:
			'Requesting access to data can be a lengthy process due the amount of checks needed in order to ensure the safe use of patient data. The steps below aim to clarify the process.',
	};

	aboutPanel = {
		panelId: 'about',
		index: 0,
		pageId: 'about',
	};

	async componentDidMount() {
		try {
			await this.loadData();
			// Set questions answered for entire application
			let countedQuestionAnswers = this.totalQuestionsAnswered();
			let totalQuestions = `${countedQuestionAnswers.totalAnsweredQuestions}/${countedQuestionAnswers.totalQuestions}  questions answered`;

			this.setState({
				totalQuestions
			});
		} catch (error) {
			this.setState({ isLoading: false });
			console.log(error);
		}
	}

	loadData = async () => {
		let {
			match: {
				params: { datasetId },
			},
		} = this.props;
		let response = await axios.get(
			`${baseURL}/api/v1/data-access-request/dataset/${datasetId}`
		);
		const {
			data: {
				data: { jsonSchema, questionAnswers, _id, applicationStatus },
				dataset,
			},
		} = response;

		// Get publisher generic fields from dataset
		let { datasetfields: { publisher, contactPoint }} = dataset;

		// Get publisher data for establishing modal content and messaging context
		await this.getPublisherById(publisher);

		// Check if 5 Safes form - currently based on if the publisher has a pre-submission modal
		let is5SafesForm = false
		if(this.state.topicContext.requiresModal) {
			is5SafesForm = true;
		}

		let { aboutApplication, topicContext } = this.state;

		// Set state to say about application is shown
		if(is5SafesForm) {
			// Add 'about' page nav item
			jsonSchema.pages[0].active = false;
			jsonSchema.pages.unshift(this.aboutPageNav);

			// Add form panel
			jsonSchema.formPanels.unshift(this.aboutPanel);

			// Check if a historic state has been passed through linkage from request access modal
			aboutApplication.selectedDatasets = [dataset].map(dataset => {
				let { _id, datasetid, name, description, datasetfields: { abstract, publisher }} = dataset;
				return { _id, datasetId: datasetid, name, description, abstract, publisher };
			});
			
			// Set messaging context
			topicContext = { 
				...topicContext,
				datasets: aboutApplication.selectedDatasets.map(dataset => { 
					let { datasetId, publisher } = dataset;
					return { datasetId, publisher};
				}) || [],
				tags: aboutApplication.selectedDatasets.map(dataset => dataset.name) || [],
				relatedObjectIds: aboutApplication.selectedDatasets.map(dataset => dataset._id),
				title: publisher || '', 
				subTitle: aboutApplication.selectedDatasets.map(dataset => dataset.name).join(' '),
				contactPoint
			};
		}
		
		// get the first active panel
		let {
			formPanels: [initialPanel, ...rest],
		} = jsonSchema;

		// set state
		this.setState({
			jsonSchema: { ...jsonSchema, ...classSchema },
			datasets: [dataset],
			aboutApplication,
			questionAnswers,
			_id,
			applicationStatus,
			activePanelId: initialPanel.panelId,
			isWideForm: initialPanel.panelId === 'about',
			is5SafesForm,
			isLoading: false,
			topicContext,
			publisher,
			contactPoint
		});
		
		// for local test uses formSchema.json
		//  this.setState({jsonSchema: {...formSchema}, questionAnswers: {fullname: {"id":5385077600698822,"orcid":"12345678","name":"Paul McCafferty","bio":"Developer @ PA","email":"p*************y@p**************m"}, orcid:"12345678", email:"p*************y@p**************m"}, activePanelId: 'applicant', isLoading: false, applicationStatus: 'inProgress'});
	};

	/**
	 * [getPublisherById]
	 * @desc - Gets publisher details from the publisher Id (name)
	 */

	getPublisherById = async (publisherId) => {
		await axios
			  .get(`${baseURL}/api/v1/publishers/${publisherId}`)
			  .then(response => {
				const {data: { publisher : { dataRequestModalContent = {}, allowsMessaging = false }}} = response;
				const stateObj = { 
				  requiresModal: !_.isEmpty(dataRequestModalContent) ? true : false,
				  allowNewMessage: allowsMessaging && _.isEmpty(dataRequestModalContent),
				  allowsMessaging,
				  dataRequestModalContent
				 }
				 let topicContext = {
				   ...this.state.topicContext,
				   ...stateObj
				 }
				 this.setState({ topicContext });
			  })
			  .catch(error => {
				console.log(error);
			  });
	  } 

	/**
	 * [TotalQuestionAnswered]
	 * @desc - Sets total questions answered for each section
	 */
	totalQuestionsAnswered = (panelId = '', questionAnswers = {}) => {
		let totalQuestions = 0;
		let totalAnsweredQuestions = 0;

		if (_.isEmpty(panelId)) 
		{ 
			const formPanels = [...this.state.jsonSchema.formPanels];
			let applicationQuestionAnswers = formPanels.reduce((acc, val) => {
					let countObj = this.totalQuestionsAnswered(val.panelId);
					acc[0] = acc[0] + countObj.totalAnsweredQuestions
					acc[1] = acc[1] + countObj.totalQuestions
					return acc;
				}, [0,0]);
			return { totalAnsweredQuestions: applicationQuestionAnswers[0], totalQuestions: applicationQuestionAnswers[1] };
		} else {
			if (_.isEmpty(questionAnswers)) ({ questionAnswers } = { ...this.state });
			// 1. deconstruct state
			let {
				jsonSchema: { questionSets },
			} = { ...this.state };
			// 2. omits out blank null, undefined, and [] values from this.state.answers
			questionAnswers = _.pickBy(
				{ ...questionAnswers },
				(v) => v !== null && v !== undefined && v.length != 0
			);
			// 3. find the relevant questionSet { questionSetId: applicant }
			let questionSet =
				[...questionSets].find((q) => q.questionSetId === panelId) || '';

			if (!_.isEmpty(questionSet)) {
				// 4. get questions
				let { questions } = questionSet;
				// 5. total questions in panel
				totalQuestions = questions.length;
				let totalQuestionKeys = _.map({ ...questions }, 'questionId');

				// 6. return count of how many questions completed
				if (!_.isEmpty(questionAnswers)) {
					let count = Object.keys(questionAnswers).map((value) => {
						return totalQuestionKeys.includes(value)
							? totalAnsweredQuestions++
							: totalAnsweredQuestions;
					});
				}
				return { totalAnsweredQuestions, totalQuestions };
			}
			return { totalAnsweredQuestions: 0, totalQuestions: 0 };
		}
	};

	/**
	 * [saveTime]
	 * @desc Sets the lastSaved state on a field
	 */
	saveTime = () => {
		let currentTime = moment().format('DD MMM YYYY HH:mm');
		let lastSaved = `Last saved ${currentTime}`;
		return lastSaved;
	};

	/**
	 * [getSavedAgo]
	 * @desc Returns the saved time for DAR
	 */
	getSavedAgo = () => {
		let { lastSaved } = this.state;
		if (!_.isEmpty(lastSaved)) return lastSaved;
		else return ``;
	};

	onFormRender() {
		console.log('form render');
	}

	getActiveQuestion(questionsArr, questionId) {
		let child;

		if (!questionsArr) return;

		for (const questionObj of questionsArr) {
			if (questionObj.questionId === questionId) return questionObj;

			if (
				typeof questionObj.input === 'object' &&
				typeof questionObj.input.options !== 'undefined'
			) {
				questionObj.input.options
					.filter((option) => {
						return (
							typeof option.conditionalQuestions !== 'undefined' &&
							option.conditionalQuestions.length > 0
						);
					})
					.forEach((option) => {
						child = this.getActiveQuestion(
							option.conditionalQuestions,
							questionId
						);
					});
			}

			if (child) return child;
		}
	}

	onQuestionFocus(questionId = '') {
		let questions;
		if (!_.isEmpty(questionId)) {
			let {
				jsonSchema: { questionSets },
			} = this.state;
			// 1. get active question set
			({ questions } =
				[...questionSets].find(
					(q) => q.questionSetId === this.state.activePanelId
				) || []);
			if (!_.isEmpty(questions)) {
				// 2. loop over and find active question
				let activeQuestion = this.getActiveQuestion([...questions], questionId);
				if (!_.isEmpty(activeQuestion))
					this.setState({ activeGuidance: activeQuestion.guidance });
			}
		}
	}

	/**
	 * [onFormUpdate]
	 * @param {obj: questionAnswers}
	 * @desc Callback from Winterfell sets totalQuestionsAnswered + saveTime
	 */
	onFormUpdate = _.debounce((id = '', questionAnswers = {}) => {
		if (!_.isEmpty(id) && !_.isEmpty(questionAnswers)) {
			let { applicationStatus, lookup, activePanelId } = this.state;
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

			if(activePanelId === 'about') {
				countedQuestionAnswers = this.totalQuestionsAnswered();
				totalQuestions = `${countedQuestionAnswers.totalAnsweredQuestions}/${countedQuestionAnswers.totalQuestions}  questions answered`;
			} else {
				countedQuestionAnswers = this.totalQuestionsAnswered(
					this.state.activePanelId,
					questionAnswers
				);
				totalQuestions = `${countedQuestionAnswers.totalAnsweredQuestions}/${countedQuestionAnswers.totalQuestions}  questions answered in this section`;
			}

			this.setState({ totalQuestions });

			if (applicationStatus === 'submitted')
				return alert('Your application has already been submitted.');

			// 3. remove blank vals from questionAnswers
			let data = _.pickBy(
				{ ...this.state.questionAnswers, ...questionAnswers },
				_.identity
			);
			// 4. create dataObject
			let dataObj = { key: 'questionAnswers', data };
			// 5. update application
			this.updateApplication(dataObj);
		}
	}, 500);

	/**
	 * [Form Submit]
	 * @desc Submitting data access request
	 * @params  Object{questionAnswers}
	 */
	onFormSubmit = async (questionAnswers = {}) => {
		let invalidQuestions = DarValidation.getQuestionPanelInvalidQuestions(
			Winterfell,
			this.state.jsonSchema.questionSets,
			this.state.questionAnswers
		);
		let validationSectionMessages = DarValidation.buildInvalidSectionMessages(
			Winterfell,
			invalidQuestions
		);
		let inValidMessages = DarValidation.buildInvalidMessages(
			Winterfell,
			invalidQuestions
		);
		let errors = DarValidation.formatValidationObj(inValidMessages, [
			...this.state.jsonSchema.questionPanels,
		]);
		let isValid = Object.keys(errors).length ? false : true;
		if (this.state.applicationStatus === 'submitted')
			return alert('Your application has already been submitted.');

		if (isValid) {
			try {
				let { _id } = this.state;
				// 1. POST
				const response = await axios.post(
					`${baseURL}/api/v1/data-access-request/${_id}`,
					{}
				);
				const lastSaved = this.saveTime();
				this.setState({ lastSaved });
				let message = {
					type: 'success',
					message: 'Done! Your application was submitted successfully',
				};
				window.localStorage.setItem('alert', JSON.stringify(message));
				this.props.history.push({
					pathname: '/account',
					search: '?tab=dataaccessrequests',
				});
			} catch (err) {
				console.log(err);
			}
		} else {
			let activePage = _.get(_.keys({ ...errors }), 0);
			let activePanel = _.get(_.keys({ ...errors }[activePage]), 0);
			let validationMessages = validationSectionMessages;
			alert('Please resolve the following validation issues');
			this.updateNavigation(
				{ pageId: activePage, panelId: activePanel },
				validationMessages
			);
		}
	};

	updateApplication = async (obj = {}) => {
		try {
			// 1. data = {key: jsonSchema || questionAnswers, data: { object of data}}
			let { key, data = {} } = obj;
			//2.  id of dataSet
			let { _id: id } = this.state;
			// 3. set up body params
			let params = {
				[`${key}`]: JSON.stringify(data),
			};
			// 4. PATCH the data
			const response = await axios.patch(
				`${baseURL}/api/v1/data-access-request/${id}`,
				params
			);
			// 6. get saved time
			const lastSaved = this.saveTime();
			// 5. set state
			this.setState({ [`${key}`]: { ...data }, lastSaved });
		} catch (err) {
			console.log(err);
		}
	};

	onNextClick = () => {
		// 1. If in the about panel, we go to the next step.  Otherwise next panel.
		if(this.state.activePanelId === 'about') {
			// 2. Pass no completed bool value to go to next step without modifying completed status
			this.onNextStep();
			// 3. If we have reached the end of the about accordion, reset active accordion so all are closed
			if(this.state.activeAccordionCard >= 5) {
				this.setState({
					activeAccordionCard: -1
				});
				// 4. Move to the next step
				this.onNextPanel();
			}
		} else {
			this.onNextPanel();
		}
	}

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
	}

	/**
	 * [doSearch]
	 * @desc - Injected from props, parent function callout
	 */
	doSearch = (e) => {
		//fires on enter on searchbar
		if (e.key === 'Enter')
			window.location.href = '/search?search=' + this.state.searchString;
	};

	updateSearchString = (searchString) => {
		this.setState({ searchString: searchString });
	};

	handleSelect = (key) => {
		this.setState({ key: key });
	};

	/**
	 * [UpdateNavigation]
	 * @desc - Update the navigation state sidebar
	 */
	updateNavigation = (newForm, validationErrors = {}) => {
		if(this.state.allowedNavigation) {
			// reset scroll to 0, 0
			window.scrollTo(0, 0);
			let panelId = '';
			// copy state pages
			const pages = [...this.state.jsonSchema.pages];
			// get the index of new form
			const newPageindex = pages.findIndex(
				(page) => page.pageId === newForm.pageId
			);
			// reset the current state of active to false for all pages
			const newFormState = [...this.state.jsonSchema.pages].map((item) => {
				return { ...item, active: false };
			});
			// update actual object model with propert of active true
			newFormState[newPageindex] = { ...pages[newPageindex], active: true };

			// get set the active panelId
			({ panelId } = newForm);
			if (_.isEmpty(panelId) || typeof panelId == 'undefined') {
				({ panelId } =
					[...this.state.jsonSchema.formPanels].find(
						(p) => p.pageId === newFormState[newPageindex].pageId
					) || '');
			}

			let countedQuestionAnswers = {};
			let totalQuestions = '';
			// if in the about panel, retrieve question answers count for entire application
			if(panelId === 'about') {
				countedQuestionAnswers = this.totalQuestionsAnswered();
				totalQuestions = `${countedQuestionAnswers.totalAnsweredQuestions || 0}/${countedQuestionAnswers.totalQuestions || 0}  questions answered`;
			} else {
				countedQuestionAnswers = this.totalQuestionsAnswered(panelId);
				totalQuestions = `${countedQuestionAnswers.totalAnsweredQuestions || 0}/${countedQuestionAnswers.totalQuestions || 0}  questions answered in this section`;
			}
			this.setState({
				jsonSchema: { ...this.state.jsonSchema, pages: newFormState },
				activePanelId: panelId,
				isWideForm: panelId === 'about',
				totalQuestions: totalQuestions,
				validationErrors
			});
		}
	};

	onClickSave = (e) => {
		e.preventDefault();
		const lastSaved = this.saveTime();
		this.setState({ lastSaved });
	};

	onQuestionClick = async (questionSetId = '', questionId = '') => {
		let questionSet, jsonSchema, questionAnswers, data;
		questionSet = DarHelper.findQuestionSet(questionSetId, {
			...this.state.jsonSchema,
		});

		if (!_.isEmpty(questionSet) && !_.isEmpty(questionId)) {
			let {
				input: { action },
			} = DarHelper.findQuestion(questionId, questionSet);
			switch (action) {
				case 'addApplicant':
					let duplicateQuestionSet = DarHelper.questionSetToDuplicate(
						questionSetId,
						{ ...this.state.jsonSchema }
					);
					jsonSchema = DarHelper.insertSchemaUpdates(
						questionSetId,
						duplicateQuestionSet,
						{ ...this.state.jsonSchema }
					);
					data = { key: 'jsonSchema', data: jsonSchema };
					// post to API to do of new jsonSchema
					await this.updateApplication(data);
					break;
				case 'removeApplicant':
					jsonSchema = DarHelper.removeQuestionReferences(
						questionSetId,
						questionId,
						{ ...this.state.jsonSchema }
					);
					questionAnswers = DarHelper.removeQuestionAnswers(questionId, {
						...this.state.questionAnswers,
					});
					// post to API of new jsonSchema
					await this.updateApplication({ key: 'jsonSchema', data: jsonSchema });
					await this.updateApplication({
						key: 'questionAnswers',
						data: questionAnswers,
					});
					break;
				default:
					console.log(questionSetId);
					break;
			}
		}
	};

	toggleDrawer = () => {
		this.setState((prevState) => {
			if (prevState.showDrawer === true) {
				this.searchBar.current.getNumberOfUnreadMessages();
			}
			return { showDrawer: !prevState.showDrawer };
		});
	};

	toggleModal = (showEnquiry = false, context = {}) => {
		this.setState( ( prevState ) => {
			return { showModal: !prevState.showModal, context };
		});
	
		if(showEnquiry) {
		  this.toggleDrawer();
		}
	}

	toggleMrcModal = () => {
		this.setState( ( prevState ) => {
			return { showMrcModal: !prevState.showMrcModal };
		});
	}



	onHandleDataSetChange = (e) => {
		// 1. Deconstruct current state
		let { aboutApplication, allowedNavigation, topicContext, publisher, contactPoint } = this.state;

		// 2. Update 'about application' state with selected datasets
		aboutApplication.selectedDatasets = e

		// 3. If no datasets are passed, set invalid and incomplete step, and update message context
		if(_.isEmpty(e)) {
			aboutApplication.completedDatasetSelection = false;
			allowedNavigation = false;
			topicContext = {
				...topicContext,
				datasets: [],
				tags: [],
				relatedObjectIds: [],
				subTitle: '',
				allowNewMessage: false
			};
		} else {
			allowedNavigation = true;
			topicContext = { 
				...topicContext,
				datasets: aboutApplication.selectedDatasets.map(dataset => { 
					let { datasetId, publisher } = dataset;
					return { datasetId, publisher};
				}) || [],
				tags: aboutApplication.selectedDatasets.map(dataset => dataset.name) || [],
				relatedObjectIds: aboutApplication.selectedDatasets.map(dataset => dataset._id),
				title: publisher || '', 
				subTitle: aboutApplication.selectedDatasets.map(dataset => dataset.name).join(' '),
				contactPoint,
				allowNewMessage: true
			};
		}

		// 4. Update state to reflect change
		this.setState({
			allowedNavigation,
			aboutApplication,
			topicContext
		});
	}

	onNextStep = (completed) => {
		// 1. Deconstruct current state
		let { aboutApplication, activeAccordionCard } = this.state;
		// 2. If a completed flag has been passed, update step during navigation
		if(!_.isUndefined(completed)) {
			switch(activeAccordionCard) {
				case 0:
					aboutApplication.completedDatasetSelection = completed;
					break;
				case 1:
					aboutApplication.completedReadAdvice = completed;
					break;
				case 2:
					aboutApplication.completedCommunicateAdvice = completed;
					break;
				case 3:
					aboutApplication.completedApprovalsAdvice = completed;
					break;
				case 4:
					aboutApplication.completedSubmitAdvice = completed;
					// Temporary until feature is released
					aboutApplication.completedInviteCollaborators = true;
					break;
				default:
					console.error("Invalid step passed");
					break;
			}
		}
		// 3. Set new state
		this.setState({
			activeAccordionCard: ++activeAccordionCard,
			aboutApplication
		});
	}

	toggleCard = (e, eventKey) => {
		e.preventDefault();
		// 1. Deconstruct current state
		let { aboutApplication, activeAccordionCard } = this.state;
		if(activeAccordionCard === eventKey) {
			eventKey = -1;
		}
		// 2. Mark step 6 as completed when it is toggled (coming soon feature)
		if(eventKey === 5 && !aboutApplication.completedInviteCollaborators)
			aboutApplication.completedInviteCollaborators = true;
		// 3. Set new state
		this.setState({
			activeAccordionCard: eventKey,
			aboutApplication
		});
	}

	calcAccordionClasses = (active) => {
		let classes = ['black-16'];
		if(!this.state.allowedNavigation) 
			classes = [...classes, 'disabled'];
		
		if(active)
			classes = [...classes, 'active'];

		return classes;
	}

	render() {
		const {
			searchString,
			totalQuestions,
			isLoading,
			validationErrors,
			activeGuidance,
			datasets,
			showDrawer,
			showModal,
			showMrcModal,
			isWideForm,
			activeAccordionCard,
			allowedNavigation,
			context,
			aboutApplication: { 
				selectedDatasets,
				completedDatasetSelection,
				completedReadAdvice, 
				completedCommunicateAdvice, 
				completedApprovalsAdvice, 
				completedSubmitAdvice, 
				completedInviteCollaborators 
			}
		} = this.state;
		const { userState, location } = this.props;

		const aboutForm = (
			<div className='aboutAccordion'>
				<Accordion defaultActiveKey='0' activeKey={activeAccordionCard.toString()}>
					<Card className={activeAccordionCard === 0 ? 'activeCard' : ''}>
						<Accordion.Toggle as={Card.Header} className={this.calcAccordionClasses(activeAccordionCard === 0)} eventKey='0' onClick={e => this.toggleCard(e, 0)}>
						{completedDatasetSelection ? 
							<div className='stepNumber completed'><SVGIcon name="check" width={24} height={24} fill={'#ffffff'} /></div> 
							:
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>1</div>
						}
							Select the datasets you need
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='0'>
							<Card.Body className='gray800-14'>
								<div className='margin-bottom-16'>
									If you’re not sure, <Link id='messageLink' to=' ' className={allowedNavigation ? '' : 'disabled'} onClick={this.toggleDrawer}>send a message to the data custodian</Link> to clarify. The datasets you select may impact the questions being asked in this application form. You cannot change this later.
								</div>
								<div>
									<span>Datasets</span>
									<div className='form-group'>
										<TypeaheadDataset selectedDatasets={selectedDatasets} onHandleDataSetChange={this.onHandleDataSetChange}/>
									</div>
									{ 
									_.isEmpty(selectedDatasets) ? 
										<div className='errorMessages'>
											You must select at least one dataset
										</div> 
									: null 
									}
									<div className='panConfirmDatasets'>
										<button 
											type='input' 
											className={`button-primary ${allowedNavigation ? '' : 'disabled'}`} 
											disabled={!allowedNavigation}
											onClick={ () => { this.onNextStep(allowedNavigation) }}
										>Confirm
										</button>
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card className={activeAccordionCard === 1 ? 'activeCard' : ''}>
						<Accordion.Toggle as={Card.Header} className={this.calcAccordionClasses(activeAccordionCard === 1)} eventKey='1' onClick={e => this.toggleCard(e, 1)}>
						{completedReadAdvice ? 
							<div className='stepNumber completed'><SVGIcon name="check" width={24} height={24} fill={'#ffffff'} /></div> 
							:
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>2</div>
						}
							Read the advice from the data custodian
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='1'>
							<Card.Body className='gray800-14'>
								<Fragment>
									<div className='margin-bottom-16'>
										If you haven’t already, please make sure you have read the advice provided by the data custodian on how to request access to their datasets.
									</div>
									<div className="dar-form-check-group">
										<input type="checkbox" id="chkReadAdvice" checked={completedReadAdvice} className='dar-form-check' onChange={e => {this.onNextStep(e.target.checked)}}/>
										<span className="dar-form-check-label">
											I have read <Link id='howToRequestAccessLink' to=' ' className={allowedNavigation ? '' : 'disabled'} onClick={e => this.toggleModal(false, this.state.context)}>how to request access</Link>
										</span>
									</div>
								</Fragment>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card className={activeAccordionCard === 2 ? 'activeCard' : ''}>
						<Accordion.Toggle as={Card.Header} className={this.calcAccordionClasses(activeAccordionCard === 2)} eventKey='2' onClick={e => this.toggleCard(e, 2)}>
						{completedCommunicateAdvice ? 
							<div className='stepNumber completed'><SVGIcon name="check" width={24} height={24} fill={'#ffffff'} /></div> 
							:
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>3</div>
						}
							Communicate with the data custodian
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='2'>
							<Card.Body className='gray800-14'>
								<Fragment>
									<div className='margin-bottom-16'>
										The earlier you get in touch, the better. A lot of projects are not eligible for data access, so it’s important you clarify with the custodian whether they have the data you need, and whether you have a chance of getting access. If you've not done so yet, we recommend sending a message with a brief description of your project and the data you are interested in.
									</div>
									<div className="dar-form-check-group">
										<button className="button-secondary" type='button' onClick={this.toggleDrawer}>Send message</button>
										<input type="checkbox" id="chkCommunicateAdvice" checked={completedCommunicateAdvice} className='dar-form-check' onChange={e => {this.onNextStep(e.target.checked)}}/>
										<span className="dar-form-check-label">
											I have completed this step
										</span>
									</div>
								</Fragment>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card className={activeAccordionCard === 3 ? 'activeCard' : ''}>
						<Accordion.Toggle as={Card.Header} className={this.calcAccordionClasses(activeAccordionCard === 3)} eventKey='3' onClick={e => this.toggleCard(e, 3)}>
						{completedApprovalsAdvice ? 
							<div className='stepNumber completed'><SVGIcon name="check" width={24} height={24} fill={'#ffffff'} /></div>  
							:
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>4</div>
						}
							Check what approvals you might need
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='3'>
							<Card.Body className='gray800-14'>
								<Fragment>
									<div className='margin-bottom-16'>
										The MRC Health Data Access tookit aims to help you understand what approvals might be necessary for your research. Many custodians request these approvals are in place before you start your application process.
									</div>
									<div className="dar-form-check-group">
										<button className="button-secondary" type='button' onClick={this.toggleMrcModal}>MRC Health Data Access toolkit</button>
										<input type="checkbox" id="chkApprovalAdvice" checked={completedApprovalsAdvice} className='dar-form-check' onChange={e => {this.onNextStep(e.target.checked)}}/>
										<span className="dar-form-check-label">
											I have completed this step
										</span>
									</div>
								</Fragment>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card className={activeAccordionCard === 4 ? 'activeCard' : ''}>
						<Accordion.Toggle as={Card.Header} className={this.calcAccordionClasses(activeAccordionCard === 4)} eventKey='4' onClick={e => this.toggleCard(e, 4)}>
						{completedSubmitAdvice ? 
							<div className='stepNumber completed'><SVGIcon name="check" width={24} height={24} fill={'#ffffff'} /></div>  
							:
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>5</div>
						}
							Understand what happens after you submit the application
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='4'>
							<Card.Body className='gray800-14'>
								<Fragment>
									<div className='margin-bottom-16'>
										After you have completed the form, you can submit the application.
									</div>
									<div className='margin-bottom-16'>
										<ul>
											<li>Make sure to double-check everything before submitting</li>
											<li>You will NOT be able to edit your responses via the Gateway after submission (for now)</li>
											<li>If you do need to make any amendments, get in touch with the data custodian</li>
											<li>Both you and the data custodian will receive an email with a copy of the information submitted using this form.</li>
										</ul>
									</div>
									<div className="dar-form-check-group">
										<input type="checkbox" id="chkSubmitAdvice" checked={completedSubmitAdvice} className='dar-form-check' onChange={e => {this.onNextStep(e.target.checked)}}/>
										<span className="dar-form-check-label">
											I have completed this step
										</span>
									</div>
								</Fragment>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card className={activeAccordionCard === 5 ? 'activeCard' : ''}>
						<Accordion.Toggle as={Card.Header} className={this.calcAccordionClasses(activeAccordionCard === 5)} eventKey='5' onClick={e => this.toggleCard(e, 5)}>
						{completedInviteCollaborators ? 
							<div className='stepNumber completed'><SVGIcon name="check" width={24} height={24} fill={'#ffffff'} /></div>  
							:
							<div className={`stepNumber ${activeAccordionCard === 0 ? 'active' : ''}`}>6</div>
						}
							Invite collaborators
							<div className="badge-comingSoon">Coming soon</div>
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='5'>
							<Card.Body className='gray800-14'>
								<div>
									Applications are often a team effort, so you can add others to help. Collaborators can exchange private notes, make edits, message the data custodian, invite others and submit the application. If they’re named in the application, you can fill in some of their details automatically. You can do this later too.
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			</div>
		);

		Winterfell.addInputType('typeaheadCustom', TypeaheadCustom);
		Winterfell.addInputType('datePickerCustom', DatePickerCustom);
		Winterfell.addInputType('typeaheadUser', TypeaheadUser);

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
					doSearchMethod={this.doSearch}
					doUpdateSearchString={this.updateSearchString}
					doToggleDrawer={this.toggleDrawer}
					userState={userState}
				/>
				<Row className='banner'>
					<Col sm={12} md={8} className='banner-left'>
						<span className='white-20-semibold mr-5'>Data Access Request</span>
						{this.state.is5SafesForm ? 
							<span className='white-16-semibold pr-5'>
								{datasets[0].datasetfields.publisher}
							</span> :
							<span className='white-16-semibold pr-5'>
								{datasets[0].name} | {datasets[0].datasetfields.publisher}
							</span>
					  	}
					</Col>
					<Col sm={12} md={4} className='banner-right'>
						<span className='white-14-semibold'>{this.getSavedAgo()}</span>
						{
							<a
								className={`linkButton white-14-semibold ml-2 ${allowedNavigation ? '' : 'disabled'}`}
								onClick={this.onClickSave}
								href='!#'
							>
								Save now
							</a>
						}
					</Col>
				</Row>

				<div id='darContainer' className='flex-form'>
					<div id='darLeftCol' className='scrollable-sticky-column'>
						{[...this.state.jsonSchema.pages].map((item, idx) => (
							<div
								key={`navItem-${idx}`}
								className={`${item.active ? 'active-border' : ''}`}
							>
								<div>
									<h1
										className={`black-16 ${
											item.active ? 'section-header-active' : 'section-header'
										} ${this.state.allowedNavigation ? '' : 'disabled'}`}
										onClick={(e) => this.updateNavigation(item)}
									>
										{item.title}
									</h1>
									{item.active && (
										<ul className='list-unstyled section-subheader'>
											<NavItem
												parentForm={item}
												questionPanels={this.state.jsonSchema.questionPanels}
												onFormSwitchPanel={this.updateNavigation}
												activePanelId={this.state.activePanelId}
												enabled={allowedNavigation}
											/>
										</ul>
									)}
								</div>
							</div>
						))}
					</div>
					<div id='darCenterCol' className={isWideForm ? 'extended' : ''}>
						<div id='darDropdownNav'>
							<NavDropdown
								options={{...this.state.jsonSchema, is5SafesForm: this.state.is5SafesForm}}
								onFormSwitchPanel={this.updateNavigation}
								enabled={allowedNavigation}
							/>
						</div>
						<div style={{ backgroundColor: '#ffffff' }} className='dar__header'>
							{this.state.jsonSchema.pages
								? [...this.state.jsonSchema.pages].map((item, idx) =>
										item.active ? (
											<Fragment key={`pageContent-${idx}`}>
												<p className='black-20-semibold mb-0'>
													{item.active ? item.title : ''}
												</p>
												<ReactMarkdown
													className='gray800-14'
													source={item.description}
												/>
											</Fragment>
										) : (
											''
										)
								  )
								: ''}
						</div>
						<div
							className={`dar__questions gray800-14 ${this.state.activePanelId === 'about' ? 'pad-bottom-0' : ''}`}
							style={{ backgroundColor: '#ffffff' }}
						>
							{this.state.activePanelId === 'about' ? (
								aboutForm
							) : (
								<Winterfell
									schema={this.state.jsonSchema}
									questionAnswers={this.state.questionAnswers}
									panelId={this.state.activePanelId}
									disableSubmit={true}
									validationErrors={validationErrors}
									onQuestionFocus={this.onQuestionFocus}
									onQuestionClick={this.onQuestionClick}
									onUpdate={this.onFormUpdate}
									onSubmit={this.onFormSubmit}
								/>
							)}
						</div>
					</div>
					{isWideForm ? null : (
						<div id='darRightCol' className='scrollable-sticky-column'>
							<Tabs
								className='dar-tabsBackground gray700-14'
								activeKey={this.state.key}
								onSelect={this.handleSelect}
							>
								<Tab eventKey='guidance' title='Guidance'>
									<div className='darTab'>
										<Col md={12} className='gray700-13 text-center'>
											<span>
												{activeGuidance
													? activeGuidance
													: 'Active guidance for questions'}
												.
											</span>
										</Col>
									</div>
								</Tab>
								<Tab eventKey='answers' title='Answers'>
									<div className='darTab'>
										<Col md={12} className='gray700-13 mt-2'>
											<span>
												Re-use answers from your previous applications
											</span>
											<br /> <br />
											<span className='comingSoonBadge'> Coming soon </span>
										</Col>
									</div>
								</Tab>
								<Tab eventKey='notes' title='Notes'>
									<div className='darTab'>
										<Col md={12} className='gray700-13 mt-2'>
											<span>Data custodians cannot see your notes. </span>
											<br /> <br />
											<span>
												You can use notes to capture your thoughts or
												communicate with any other applicants you invite to
												collaborate.
											</span>
											<br /> <br />
											<span className='comingSoonBadge'> Coming soon </span>
										</Col>
									</div>
								</Tab>
								<Tab eventKey='messages' title='Messages'>
									<div className='darTab'>
										<Col md={12} className='gray700-13 mt-2'>
											<span>
												Both data custodian and applicants can see messages
											</span>
											<br /> <br />
											<span>
												Use messages to seek guidance or clarify questions with
												the data custodian. You can send messages before or
												after the application is submitted. You will be notified
												of every new message, and so will the data custodian.
											</span>
											<br /> <br />
											<span className='comingSoonBadge'> Coming soon </span>
										</Col>
									</div>
								</Tab>
							</Tabs>
						</div>
					)}
				</div>

				<div className='action-bar'>
					<div className="action-bar--questions">
						<p>{totalQuestions}</p>
					</div>
					<div className="action-bar-actions">
						<button className={`button-tertiary ${allowedNavigation ? '' : 'disabled'}`} style={{width:'156px'}} onClick={this.onFormSubmit}>Submit application</button>
						<button className={`button-primary ${allowedNavigation ? '' : 'disabled'}`} style={{width:'62px'}} onClick={this.onNextClick}>Next</button>
					</div>
				</div>

				<SideDrawer open={showDrawer} closed={this.toggleDrawer}>
					<UserMessages
						closed={this.toggleDrawer}
						toggleModal={this.toggleModal}
						drawerIsOpen={this.state.showDrawer}
						topicContext={this.state.topicContext}
					/>
				</SideDrawer>

				<DataSetModal 
                    open={showModal} 
                    context={this.state.topicContext}
                    closed={this.toggleModal}
                    userState={userState[0]} 
				/>

				<Modal show={showMrcModal} onHide={this.toggleMrcModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className="darModal" >
                	<iframe src="https://hda-toolkit.org/story_html5.html" className="darIframe"> </iframe>
            	</Modal>
			</div>
		);
	}
}

export default DataAccessRequest;
