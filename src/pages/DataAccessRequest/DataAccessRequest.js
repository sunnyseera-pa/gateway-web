

import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import Winterfell from 'winterfell';
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import TypeaheadCustom from './components/TypeaheadCustom'
import DatePickerCustom from './components/DatepickerCustom';
import SearchBar from '../commonComponents/SearchBar';
import Loading from '../commonComponents/Loading';
import ToolKit from './components/Toolkit';
import NavItem from './components/NavItem';
import NavDropdown from './components/NavDropdown';
import DarValidation from '../../utils/DarValidation.util';
import {formSchema} from './formSchema';
import {classSchema} from './classSchema';
import { baseURL } from '../../configs/url.config';
import 'react-tabs/style/react-tabs.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import SVGIcon from "../../images/SVGIcon"
import ReactMarkdown from 'react-markdown';

class DataAccessRequest extends Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onFormUpdate = this.onFormUpdate.bind(this);
        this.onQuestionFocus = this.onQuestionFocus.bind(this);
    }
    
    state = {
        _id: '',
        schema: {},
        questionAnswers: {},
        applicationStatus: '',
        activePanelId: '',
        activeGuidance: '',
        searchString: '',
        key: 'guidance',
        totalQuestions: '',
        validationErrors: {},
        lastSaved: '',
        isLoading: true,
        formSubmitted: false,
        dataset: {}
    }

    async componentDidMount() {
        try {
            let { match: { params: { datasetId }}} = this.props;
            let response = await axios.get(`${baseURL}/api/v1/data-access-request/dataset/${datasetId}`);
            const { data: { data: { jsonSchema, questionAnswers, _id, applicationStatus }}} = response;
            this.setState({ dataset: response.data.dataset});
            // 1. get the first active panel
            let  { formPanels: [ initialPanel, ...rest ]}= jsonSchema;
            // 2. set state
            this.setState({schema: {...jsonSchema, ...classSchema}, questionAnswers, _id, applicationStatus, activePanelId: initialPanel.panelId, isLoading: false});
        }
        catch (error) {
            this.setState({isLoading: false});
            console.log(error);
        }
    }
    /**
     * [TotalQuestionAnswered]
     * @desc - Sets total questions answered for each section
     */
    totalQuestionsAnswered = (panelId = '', questionAnswers = {}) => {
        let totalQuestions = 0;
        let totalAnsweredQuestions = 0;
        if(!_.isEmpty(panelId)) {
            if(_.isEmpty(questionAnswers))
                ({questionAnswers} = {...this.state})
            // 1. deconstruct state
            let {schema: {questionSets}} = {...this.state};
            // 2. omits out blank null, undefined, and [] values from this.state.answers
            questionAnswers = _.pickBy({...questionAnswers}, v => v !== null && v !== undefined && v.length != 0);
            // 3. find the relevant questionSet { questionSetId: applicant }
            let questionSet = [...questionSets].find(q => q.questionSetId === panelId) || '';
            if(!_.isEmpty(questionSet)) {
                // 4. get questions
                let { questions } = questionSet;
                // 5. total questions in panel 
                totalQuestions = questions.length;
                let totalQuestionKeys = _.map({...questions}, 'questionId');
                // 6. return count of how many questions completed 
                if(!_.isEmpty(questionAnswers)){
                    let count = Object.keys(questionAnswers).map((value) => { 
                        return totalQuestionKeys.includes(value) ? totalAnsweredQuestions++ : totalAnsweredQuestions;
                    });
                }        
                // this.setState({ totalQuestionsAnswered: `${totalAnsweredQuestions}/${totalQuestions}  questions answered in this section`});    
                return `${totalAnsweredQuestions}/${totalQuestions}  questions answered in this section`;
            }
        }
    }

    /**
     * [saveTime]
     * @desc Sets the lastSaved state on a field
     */
    saveTime = () => {
        let currentTime = moment().format('DD MMM YYYY HH:mm');
        let lastSaved = `Last saved ${currentTime}`;
        return lastSaved;
    }

    /**
     * [getSavedAgo]
     * @desc Returns the saved time for DAR
     */
    getSavedAgo = () => {
        let { lastSaved } = this.state;
        if(!_.isEmpty(lastSaved))
            return lastSaved;
        else
            return ``;
    }

    onFormRender() {
        console.log('form render');
    }

    
    getActiveQuestion(questionsArr, questionId) {
        let child;
        
        if (!questionsArr) 
            return; 
        
        for (const questionObj of questionsArr) {
            if (questionObj.questionId === questionId) 
                return questionObj; 

            if(typeof questionObj.input === 'object' && typeof questionObj.input.options !== 'undefined') {
                questionObj.input.options
                    .filter(option => {
                        return typeof option.conditionalQuestions !== 'undefined' &&  option.conditionalQuestions.length > 0;
                    })
                    .forEach(option => {         
                        child = this.getActiveQuestion(option.conditionalQuestions, questionId);
                    });
            }

            if (child) 
                return child; 
        }
     }

    onQuestionFocus(questionId = '') {
        let questions;
        if(!_.isEmpty(questionId)) {
            let {schema: { questionSets } } = this.state;
            // 1. get active question set
            ({questions} = [...questionSets].find(q => q.questionSetId === this.state.activePanelId) || []);
            if(!_.isEmpty(questions)) {
                // 2. loop over and find active question 
                let activeQuestion = this.getActiveQuestion([...questions], questionId);
                if(!_.isEmpty(activeQuestion))
                    this.setState({activeGuidance: activeQuestion.guidance});
            }
        }
    }
    
    /**
     * [onFormUpdate]
     * @param {obj: questionAnswers}
     * @desc Callback from Winterfell sets totalQuestionsAnswered + saveTime
     */
    onFormUpdate = _.debounce((questionAnswers) => {
        const { applicationStatus } = this.state;
        let totalQuestionsAnswered = this.totalQuestionsAnswered(this.state.activePanelId, questionAnswers);
        this.setState({totalQuestions: totalQuestionsAnswered});
        if(applicationStatus === 'submitted')
            return alert('Your application has already been submitted.');

        this.onApplicationUpdate(questionAnswers);
    }, 500);

    /**
     * [Form Submit]
     * @desc Submitting data access request
     * @params  Object{questionAnswers}
     */
    onFormSubmit = async (questionAnswers = {}) => {
        let invalidQuestions = DarValidation.getQuestionPanelInvalidQuestions(Winterfell, this.state.schema.questionSets, this.state.questionAnswers);
        let validationSectionMessages = DarValidation.buildInvalidSectionMessages(Winterfell, invalidQuestions);
        let inValidMessages = DarValidation.buildInvalidMessages(Winterfell, invalidQuestions);
        let errors = DarValidation.formatValidationObj(inValidMessages, [...this.state.schema.questionPanels]);
        let isValid = Object.keys(errors).length ? false : true;
        if(this.state.applicationStatus === 'submitted')
            return alert('Your application has already been submitted.');

        if(isValid) {
            try {
                // 1. POST 
                const response = await axios.post(`${baseURL}/api/v1/data-access-request/${this.state.dataset.datasetid}`, {});
                const lastSaved = this.saveTime();
                this.setState({ lastSaved });
                // 2. Add success banner to local storage
                let message = {"type":"success", "message":"Done! Your application was submitted successfully"};
                window.localStorage.setItem('alert', JSON.stringify(message));
                this.props.history.push({pathname: "/account", search:"?tab=dataaccessrequests"});
            } catch (err) {
                console.log(err);
            }
        } else {
            let activePage               =  _.get(_.keys({...errors}), 0);
            let activePanel              =  _.get(_.keys({...errors}[activePage]), 0);
            let validationMessages       = validationSectionMessages;
            alert('Please resolve the following validation issues');
            this.updateNavigation({pageId: activePage, panelId: activePanel}, validationMessages);
        }
    }

    /**
     * [onApplicationUpdate]
     * @desc Updates answers to the questions PATCH
     * @method PATCH
     * @param {obj: questionAnswers}
     */
    onApplicationUpdate = async (questionAnswers) => {
        try {
            // 1. spread copy of data, and remove blank null undefined values
            const data = _.pickBy({...this.state.questionAnswers, ...questionAnswers}, _.identity);
            // 2. get id
            let {_id: id} = this.state;
            // 3. set up body params
            let params = {
                questionAnswers: JSON.stringify(data)
            }
            // 4. PATCH the data
            const response = await axios.patch(`${baseURL}/api/v1/data-access-request/${this.state.dataset.datasetid}`, params);
            // 6. get saved time
            const lastSaved = this.saveTime();
            // 5. set state
            this.setState({ questionAnswers: {...data}, lastSaved});
        } catch(err) {
            console.log(err);
        }
    }

    onNextPanel(activePanelId){
        if (activePanelId === "mrcHealthDataToolkit" || activePanelId === "adviceFromPublisher"){
            // 1. filter for the first section safePeople and get the first obj
            let {panelId, pageId} = _.head([...this.state.schema.formPanels].filter(p => {
                                        return p.pageId === 'safePeople' || p.pageId === 'safepeople'
                                    }));
            this.updateNavigation({panelId, pageId});
        }
        else {
            const formPanels = [...this.state.schema.formPanels];
            const currentPanelIndex = formPanels.findIndex(panel => panel.panelId === activePanelId);
            const newPanelIndex = currentPanelIndex + 2;
            const nextPanelIndex = formPanels.findIndex(panel => panel.index === newPanelIndex);
            if(nextPanelIndex === -1){
                console.log("at the end!")
            }
            else {
                const { panelId, pageId } = formPanels.find(panel => panel.index === newPanelIndex);;
                this.updateNavigation({panelId, pageId });
            }
        }
    }

    /**
     * [doSearch]
     * @desc - Injected from props, parent function callout
     */
    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') window.location.href = "/search?search=" + this.state.searchString;
    }
    
    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
    }

    handleSelect = (key) => {
        this.setState({ key: key });
        // this.props.history.push(window.location.pathname + '?tab=' + key);
    }

       /**
     * [UpdateNavigation]
     * @desc - Update the navigation state sidebar
     */
    updateNavigation = (newForm, validationErrors = {}) => {
        // reset scroll to 0, 0
        window.scrollTo(0, 0);
        let panelId = '';
        const currentActivePage = [...this.state.schema.pages].find(p => p.active === true);
        // copy state pages
        const pages = [...this.state.schema.pages];
        // get the index of new form
        const newPageindex = pages.findIndex(page => page.pageId === newForm.pageId);
        // reset the current state of active to false for all pages
        const newFormState = [...this.state.schema.pages].map((item) => {
            return {...item, active: false}
        });
        // update actual object model with propert of active true
        newFormState[newPageindex] = {...pages[newPageindex], active: true};

        // get set the active panelId 
        ({ panelId } = newForm);
        if (_.isEmpty(panelId) || typeof panelId == 'undefined') {
            ({panelId} = [...this.state.schema.formPanels].find(p => p.pageId === newFormState[newPageindex].pageId) || '');
        } 
        let totaltotalQuestionsAnswered = this.totalQuestionsAnswered(panelId);
        this.setState({ schema: {...this.state.schema, pages: newFormState}, activePanelId: panelId, totalQuestions:totaltotalQuestionsAnswered, validationErrors});
    }

    onClickSave = (e) =>{
        e.preventDefault();
        const lastSaved = this.saveTime();
        this.setState({ lastSaved });
    }
    
    render() {
        const { searchString, activePanelId, totalQuestions, isLoading, validationErrors, activeGuidance, dataset} = this.state;
        const { userState, location} = this.props;

        Winterfell.addInputType('typeaheadCustom', TypeaheadCustom);
        Winterfell.addInputType('datePickerCustom', DatePickerCustom);

        if (isLoading) {
            return (
                <Container>
                    <Loading />
                </Container>
            );
        } 
        
        return (
            <div>
                <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
                <Row className="banner">
                    <Col sm={12} md={8} className="banner-left">
                            <span className="white-20-semibold mr-5">Data Access Request</span>
                            <span className="white-16-semibold pr-5">{dataset.name} | {dataset.datasetfields.publisher}</span>
                    </Col>
                    <Col sm={12} md={4} className="banner-right">
                            <span className="white-14-semibold">{this.getSavedAgo()}</span>
                            {<a className="linkButton white-14-semibold ml-2" onClick={this.onClickSave} href="!#">Save now</a>}
                    </Col>
                </Row>

                <div id="darContainer" className="flex-form">
                    <div id="darLeftCol" className="scrollable-sticky-column">
                        {[...this.state.schema.pages].map((item, idx) => (
                            <div key={item.index} className={`${item.active ? "active-border" : ''}`}>
                                <div>
                                    <h1 className="black-16 section-header" onClick={e => this.updateNavigation(item)}>{item.title}</h1>
                                    { item.active &&
                                        <ul className="list-unstyled section-subheader">
                                            <NavItem
                                                parentForm={item}
                                                questionPanels={this.state.schema.questionPanels}
                                                onFormSwitchPanel={this.updateNavigation}
                                                activePanelId={this.state.activePanelId}
                                            />
                                        </ul>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id="darCenterCol">
                                <div id="darDropdownNav">
                                    <NavDropdown options={this.state.schema} onFormSwitchPanel={this.updateNavigation} />
                                </div>
                                <div style={{ backgroundColor: "#ffffff" }} className="dar__header">
                                    {[...this.state.schema.pages].map((item) => (
                                        item.active ?
                                            <Fragment>
                                                <p className="black-20-semibold mb-0">{item.active ? item.title : ""}</p>
                                                <p><ReactMarkdown className="gray800-14" source={item.description} /></p>
                                            </Fragment>
                                        : ''
                                    ))}
                                </div>
                                <div className="dar__questions gray800-14" style={{ backgroundColor: "#ffffff" }} >
                                            <Col md={12}>
                                                <Winterfell
                                                    schema={this.state.schema}
                                                    questionAnswers={this.state.questionAnswers}
                                                    panelId={this.state.activePanelId}
                                                    disableSubmit={true}
                                                    validationErrors={validationErrors}
                                                    onQuestionFocus={this.onQuestionFocus}
                                                    onUpdate={this.onFormUpdate}
                                                    onSubmit={this.onFormSubmit}
                                                    onRender={this.onFormRender}
                                                />
                                            </Col>
                                        </div>
                                
                            </div>
                    <div id="darRightCol" className="scrollable-sticky-column">
                            <Tabs className='dar-tabsBackground gray700-14' activeKey={this.state.key} onSelect={this.handleSelect}>
                                <Tab eventKey="guidance" title="Guidance">
                                    <div className="darTab">
                                        <Col md={12} className="gray700-13 text-center">
                                            <span>{activeGuidance ? activeGuidance : 'Active guidance for questions'}.</span>
                                        </Col>
                                    </div>
                                </Tab>
                                <Tab eventKey="answers" title="Answers">
                                    <div className="darTab">
                                        <Col md={12} className="gray700-13 mt-2">
                                            <span>Re-use answers from your previous applications</span>
                                            <br /> <br />
                                            <span className="comingSoonBadge"> Coming soon </span>
                                        </Col>
                                    </div>
                                </Tab>
                                <Tab eventKey="notes" title="Notes">
                                    <div className="darTab">
                                        <Col md={12} className="gray700-13 mt-2">
                                            <span>Data custodians cannot see your notes. </span>
                                            <br /> <br />
                                            <span>You can use notes to capture your thoughts or communicate with any other applicants you invite to collaborate.</span>
                                            <br /> <br />
                                            <span className="comingSoonBadge"> Coming soon </span>
                                        </Col>
                                    </div>
                                </Tab>
                                <Tab eventKey="messages" title="Messages">
                                    <div className="darTab">
                                        <Col md={12} className="gray700-13 mt-2">
                                            <span>Both data custodian and applicants can see messages</span>
                                            <br /> <br />
                                            <span>Use messages to seek guidance or clarify questions with the data custodian. You can send messages before or after the application is submitted. You will be notified of every new message, and so will the data custodian.</span>
                                            <br /> <br />
                                            <span className="comingSoonBadge"> Coming soon </span>
                                        </Col>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                </div>

                <div className="action-bar">
                        <Col md={6} className="mt-4">
                            <span className="gray800-14">{totalQuestions}</span>
                        </Col>
                        <Col md={6} className="mt-3 text-right">
                            <Button variant="white"  className="techDetailButton ml-3" onClick={this.onFormSubmit}>
                                Submit application
                            </Button>
                        </Col>
                    </div> 
            </div>
        ) 
        
    }
}


  

export default DataAccessRequest;   
   
