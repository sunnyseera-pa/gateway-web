

import React, { Component, Fragment, useState } from 'react';
import Winterfell from 'winterfell';
import { Container, Row, Col, Button, Modal, Tabs, Tab } from 'react-bootstrap';
import TypeaheadCustom from './components/TypeaheadCustom'
import DatePickerCustom from './components/DatepickerCustom';
import _ from 'lodash';
import {formSchema} from './formSchema';
import { ReactComponent as CloseIconSvg } from '../../images/close.svg';
import SearchBar from '../commonComponents/SearchBar';
import 'react-tabs/style/react-tabs.css';

 class DataAccessRequest extends Component {

    constructor(props) {
        super(props);
        this.onFormSwitchPanel = this.onFormSwitchPanel.bind(this);
        this.onFormUpdate = this.onFormUpdate.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);


        // datasetTitle: props.history.location.state.title,
        // datasetPublisher: props.history.location.state.publisher,
        this.state ={
            form: {},
            questionAnswers: {},
            activePanelId: '',
            datasetTitle: "ARIA Dataset",
            datasetPublisher: "ALLIANCE > BARTS",
            searchString: '',
            key: 'guidance',
            totalAnsweredQuestions: '0/5'
        }
    }

    componentWillMount() {
        this.setState({form: {...formSchema}, activePanelId: 'mrcHealthDataToolkit'});
    }

    totalQuestionsAnswered = (panelId = '') => {
        // console.log(`2 Total questions answered panel = ${panelId}`);
        let totalQuestions = 0;
        let totalAnsweredQuestions = 0;
        if(!_.isEmpty(panelId)) {
            // deconstruct state
            let {form: {questionSets}, questionAnswers} = this.state;
            // omits out blank null undefined values from this.state.questionAnswers
            questionAnswers  =  _.pickBy({...questionAnswers }, _.identity);
            // console.log(`2A: question answers ${JSON.stringify(questionAnswers)}`);
            let questionSet = [...questionSets].find(q => q.questionSetId === panelId) || '';
            if(!_.isEmpty(questionSet)) {
                let { questions } = questionSet;
                totalQuestions = questions.length;
                let totalQuestionKeys = _.map({...questions}, 'questionId');
                if(!_.isEmpty(questionAnswers)){
                   let count = Object.keys(questionAnswers).map((value) => { 
                       return totalQuestionKeys.includes(value) ? totalAnsweredQuestions++ : totalAnsweredQuestions;
                    });
                }
                
                // console.log(`2B: ${totalAnsweredQuestions}/${totalQuestions} questions answered in this section`);
                this.setState({ totalAnsweredQuestions: `${totalAnsweredQuestions}/${totalQuestions}`});
    
            }
        }
    }

    onFormRender() {
        console.log('form render');
    }
    
    onFormUpdate(questionAnswers) {
        this.totalQuestionsAnswered(this.state.activePanelId);
    }

    onFormSwitchPanel(panelId) {
        if(!_.isEmpty(panelId)) {
            this.setState({ activePanelId: panelId});
            this.totalQuestionsAnswered(panelId);
        }
    }

    onFormSubmit(questionAnswers, target) {
        console.log('submit', questionAnswers);
    }

    onParentNavClick(item) {
        this.updateNavigation(item);
    }

    //coming from form panels
    onSwitchedPanel = (newForm) => {
        this.updateNavigation(newForm);
    }

    onNextPanel(activePanelId){
        if (activePanelId === "mrcHealthDataToolkit" || activePanelId === "adviceFromPublisher"){
            this.onFormSwitchPanel("applicant")
            this.onSwitchedPanel({"index":3,"panelId":"applicant","pageId":"safePeople"})
        }
        else {
            const formPanels = [...this.state.form.formPanels];
            const currentPanelIndex = formPanels.findIndex(panel => panel.panelId === activePanelId);
            const newPanelIndex = currentPanelIndex + 2;
            const nextPanelIndex = formPanels.findIndex(panel => panel.index === newPanelIndex);
            if(nextPanelIndex === -1){
                console.log("at the end!")
            }
            else {
                const newForm = formPanels.find(panel => panel.index === newPanelIndex);
                this.onFormSwitchPanel(newForm.panelId);
                const formPages = [...this.state.form.pages];
                const newPage = formPages.find(page => page.pageId === newForm.pageId);
                this.onParentNavClick(newPage);
            }
        }
    }

    renderQuestionSets = (parentForm) => {
        let questionPanels = [...this.state.form.questionPanels];
        if(!_.isEmpty(questionPanels)) {
            return questionPanels.map((item, index) =>{
                if (parentForm.pageId === item.pageId) {
                    return  (
                        <li className="Gray800-14px" style={{cursor: 'pointer'}} key={index} onClick={e => this.onFormSwitchPanel(item.panelId)}>{item.navHeader}</li> 
                    )
                }
            });
        }
    }

    updateNavigation = (newForm) => {
        const currentActivePage = [...this.state.form.pages].find(p => p.active === true);
        if(currentActivePage.pageId !== newForm.pageId) {
            // copy state pages
            const pages = [...this.state.form.pages];
            // get the index of new form
            const newPageindex = pages.findIndex(page => page.pageId === newForm.pageId);
            // reset the current state of active to false for all pages
            const newFormState = [...this.state.form.pages].map((item) => {
                return {...item, active: false}
            });
            // update actual object model with propert of active true
            newFormState[newPageindex] = {...pages[newPageindex], active: true};
            // get the activepanel and panelId Property
            let { panelId } = [...this.state.form.formPanels].find(p => p.pageId === newFormState[newPageindex].pageId);
            if (!_.isEmpty(panelId) || typeof panel != undefined) {
                this.setState({ form: {...this.state.form, pages: newFormState}, activePanelId: panelId});
                this.totalQuestionsAnswered(panelId);
            } 
            else {
                this.setState({ form: {...this.state.form, pages: newFormState}});
            }

            //do the same here for panel index
            
        }
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
          if (!!this.state.searchString) {
            window.location.href = "/search?search=" + this.state.searchString;
          }
        }
      }
    
      updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
      }

      handleSelect = (key) => {
        this.setState({ key: key });
        // this.props.history.push(window.location.pathname + '?tab=' + key);
    }
    
    render() {
        const { searchString, datasetTitle, datasetPublisher, activePanelId, totalAnsweredQuestions} = this.state;
        const { userState } = this.props;
        Winterfell.addInputType('typeaheadCustom', TypeaheadCustom);
        Winterfell.addInputType('datePickerCustom', DatePickerCustom);
        return (
            <div >
                <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />

                <Row className="Banner">
                    <Col md={11}>

                        <span className="ml-3 White-20px mr-5">Data Access Request</span>
                        {/* <span className="mr-5"/> */}
                        <span className="White-16px pr-5">{datasetTitle} | {datasetPublisher}</span>
                    </Col>
                    <Col md={1}>
                        <CloseIconSvg className="Icon-18px" />
                    </Col>
                </Row>

                <div className="DARForm">
                <Row className="mt-5 ml-1 FillPage">
                    <Col md={2}>
                        {[...this.state.form.pages].map((item, idx) => (
                            <div key={item.index} className={`${item.active ? "active-border" : ""}`}>
                                <div>
                                    <h1 className="Black-16px mb-3 ml-3" onClick={() => { this.onParentNavClick(item) }}>{item.title}</h1>
                                    {item.active &&
                                        <ul className="list-unstyled ml-4 pl-2 active-grey-border">
                                            {this.renderQuestionSets(item)}
                                        </ul>
                                    }
                                </div>
                            </div>
                        ))}
                    </Col>
                    <Col md={7} className="FlexColumn">
                        <Row style={{ backgroundColor: "#ffffff" }} className="pl-4">
                            {[...this.state.form.pages].map((item, idx) => (
                                <div >
                                    <p className="Black-20px">{item.active ? item.title : ""}</p>
                                    <p className="Gray800-14px">{item.active ? item.description : ""}</p>
                                </div>
                            ))}
                        </Row>

                        { activePanelId === "mrcHealthDataToolkit" || activePanelId === "adviceFromPublisher" ?
                                    <div>
                                        <Row className="mt-2 pt-3 pl-3 pb-3 Gray800-14px White">
                                            <Col md={12}>
                                                <Row className="Black-17px-Bold">
                                                    MRC Health Data Access toolkit
                                            </Row>
                                                <Row className="Gray800-15px mt-2">
                                                    This toolkit aims to help you understand what approvals are necessary for your research.
                                            </Row>
                                                <Row className="mr-2 mt-3 mb-3">
                                                    <ToolKit />
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2 pt-3 pl-3 pb-3 Gray800-14px White">
                                            <Col md={12}>
                                                <Row className="Black-17px-Bold">
                                                    Advice from {datasetPublisher}
                                            </Row>
                                                <Row className="Gray800-15px mt-2">
                                                    We highly recommend getting in touch with us as early as possible. We may be able to help you shape the various approvals, such as ethics, minimising the risk of having to apply more than once.
                                            </Row>
                                            </Col>
                                        </Row>
                                    </div>
                            : 
                                    <Row className="mt-2 pt-3 pl-3 pb-3 Gray800-14px" style={{ backgroundColor: "#ffffff" }} >
                                    <Col md={11}>
                                        <Winterfell
                                            schema={this.state.form}
                                            questionAnswers={this.state.questionAnswers}
                                            panelId={this.state.activePanelId}
                                            disableSubmit={true}
                                            onUpdate={this.onFormUpdate}
                                            onSwitchPanel={this.onSwitchedPanel}
                                            onSubmit={this.onFormSubmit}
                                            onRender={this.onFormRender}
                                        />
                                    </Col>
                                </Row>
                            }
                        <Row className="BottomCard mt-2 mb-2"  />
                    </Col>


                    
                    <Col md={3} className="DARtabs">
                            <Tabs className='TabsBackground Gray700-14px' activeKey={this.state.key} onSelect={this.handleSelect}>
                                <Tab eventKey="guidance" title="Guidance">
                                    <Row className="DARTab toolsButtons ml-1 mr-1 mt-2">
                                        <Col md={12} className="Gray700-13px mt-2">
                                            <span>There is question-by-question guidance throughout the application process, or you can view everything in one go.</span>
                                            <br /> <br />
                                            <Button variant="light" className="Dark-14px Width100"  >
                                                View all guidance in a new window
                                        </Button>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="answers" title="Answers">
                                    <Row className="DARTab toolsButtons ml-1 mr-1 mt-2">
                                        <Col md={12} className="Gray700-13px mt-2">
                                            <span>Re-use answers from your previous applications</span>
                                            <br /> <br />
                                            <span className="ComingSoonBadge"> Coming soon </span>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="notes" title="Notes">
                                    <Row className="DARTab toolsButtons ml-1 mr-1 mt-2">
                                        <Col md={12} className="Gray700-13px mt-2">
                                            <span>Data custodians cannot see your notes. </span>
                                            <br /> <br />
                                            <span>You can use notes to capture your thoughts or communicate with any other applicants you invite to collaborate.</span>
                                            <br /> <br />
                                            <span className="ComingSoonBadge"> Coming soon </span>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="messages" title="Messages">
                                    <Row className="DARTab toolsButtons ml-1 mt-2">
                                        <Col md={12} className="Gray700-13px mt-2">
                                            <span>Both data custodian and applicants can see messages</span>
                                            <br /> <br />
                                            <span>Use messages to seek guidance or clarify questions with the data custodian. You can send messages before or after the application is submitted. You will be notified of every new message, and so will the data custodian.</span>
                                            <br /> <br />
                                            <span className="ComingSoonBadge"> Coming soon </span>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                    </Col>
                    
                    <Col md={12}>
                        <Row className="DARFooter">
                            <Col md={8} className="mt-4 ml-4">
                                <span className="Gray800-14px">{totalAnsweredQuestions } questions answered in this section</span>
                            </Col>
                            <Col md={3} className="mt-3 ml-5">
                                <Button variant="white"  className="TechDetailButton ml-2" >
                                    Save
                                </Button>
                                
                            
                                <Button variant="white"  className="TechDetailButton ml-3" >
                                    Submit application
                                </Button>
                            
                                
                                <Button variant="primary" className="White-14px ml-3" onClick={() => { this.onNextPanel(activePanelId) }}>
                                    {activePanelId === "mrcHealthDataToolkit" || activePanelId === "adviceFromPublisher" ? "Go to Safe People" : "Go to next section" }
                                </Button>   
                            </Col>
                        
                        </Row> 
                    </Col>
                </Row>
                </div>
            </div>
        )
    }
}

function ToolKit() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="white"  className="TechDetailButton" onClick={handleShow}>
            View the toolkit
        </Button>
  
        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className="DARModal" >

          {/* <Modal.Header closeButton > */}
            {/* <Modal.Title >Modal heading</Modal.Title> */}
          {/* </Modal.Header> */}
          {/* <Modal.Body onClick={handleClose} style={{width:"800", height:"600"}}>  */}
          {/* <Modal.Body> */}
            <iframe src="https://hda-toolkit.org/story_html5.html" className="DARIframe"> </iframe>
          {/* </Modal.Body> */}
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );
  }
  

export default DataAccessRequest;   
   