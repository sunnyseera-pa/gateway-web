

import React, { Component, Fragment } from 'react';
import Winterfell from 'winterfell';
import { Container, Row, Col } from 'react-bootstrap';
import TypeaheadCustom from './components/TypeaheadCustom'
import DatePickerCustom from './components/DatepickerCustom';

 class DataAccessRequestPOC extends Component {
    constructor(props) {
        super(props);
        this.onFormSwitchPanel = this.onFormSwitchPanel.bind(this);
        this.onFormUpdate = this.onFormUpdate.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.state ={
            form: {
                "classes": {
                    "form": "login-form",
                    "select": "form-control",
                    "typeaheadCustom": "form-control",
                    "datePickerCustom": "form-control",
                    "question": "form-group",
                    "input": "form-control",
                    "radioListItem": "radio",
                    "radioList": "clean-list",
                    "checkboxInput": "checkbox",
                    "checkboxListItem": "checkbox",
                    "checkboxList": "clean-list",
                    "controlButton": "btn btn-primary pull-right",
                    "backButton": "btn btn-default pull-left",
                    "errorMessage": "alert alert-danger",
                    "buttonBar": "button-bar"
                },
                "pages": [
                    {
                        index: 1,
                        "pageId": "safePeople",
                        "title": 'Safe People',
                        'description': 'Please identify any persons or organisations who will have access to the data',
                        "active": true
                    },
                    {
                        index: 2,
                        pageId: "safeProject",
                        "title": "Safe Project",
                        description: 'Something else...',
                        "active": false
                    },
                    {
                        index: 3,
                        pageId: "safeData",
                        "title": "Safe Data",
                        description: 'Something else...',
                        "active": false
                    },
                    {
                        index: 4,
                        pageId: "safeSettings",
                        "title": "Safe Settings",
                        description: 'Something else...',
                        "active": false
                    },
                ],
                "formPanels": [
                    {
                        "index": 1,
                        "panelId": "applicant",
                        "pageId": 'safePeople',
                        "title": "Applicant details"
                    },
                    {
                        "index": 2,
                        "panelId": "principleInvestigator",
                        "pageId": 'safePeople',
                        "title": "Principle Investigator"
                    }
                ],
                "questionPanels": [
                    {
                        "panelId": "applicant",
                        "panelHeader": "Applicant",
                        "pageId": "safePeople",
                        "active": true,
                        "action": {
                            "default": {
                                "action": "SUBMIT"
                            }
                        },
                        "button": {
                            "text": "Submit"
                        },
                        "questionSets": [
                            {
                                "index": 1,
                                "questionSetId": "applicant"
                            }
                        ]
                    },
                    {
                        "panelId": "principleInvestigator",
                        "panelHeader": "Principle Investigator",
                        "pageId": "safePeople",
                        "active": false,
                        "action": {
                            "default": {
                                "action": "SUBMIT"
                            }
                        },
                        "button": {
                            "text": "Submit"
                        },
                        "questionSets": [
                            {
                                "index": 2,
                                "questionSetId": "principleInvestigator"
                            }
                        ]
                    }
                ],
                "questionSets": [
                    {
                        "questionSetId": "applicant",
                        "questionSetHeader": "Applicant details",
                        "questions": [
                            {
                                "questionId": "applicantName",
                                "question": "Applicant name",
                                "input": {
                                    "type": "textInput"
                                },
                                "validations" : [{
                                    "type" : "isLength",
                                    "params" : [1,90]
                                }]
                            },
                            {
                                "questionId": "passportNumber",
                                "question": "Passport number",
                                "input": {
                                    "type": "textInput"
                                },
                                "validations": [{
                                    "type": "isLength",
                                    "params": [
                                        18
                                    ]}
                                ]
                            },
                            {
                                "questionId": "principleInvestigator",
                                "question": "Are you the principe investigator?",
                                "input": {
                                    "type": "radioOptionsInput",
                                    "options": [
                                        {
                                            "text": "Yes",
                                            "value": "true"
                                        },
                                        {
                                            "text": "No",
                                            "value": "false",
                                            "conditionalQuestions": [
                                                {
                                                    "questionId": "principleInvestigatorReason",
                                                    "question": "Reason for requesting data?",
                                                    "input": {
                                                        "type": "textareaInput"
                                                    },
                                                    "validations": [
                                                        {
                                                            "type": "isLength",
                                                            "params": [
                                                                18
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                            },
                            {
                                "questionId": "optionsSelect",
                                "question": "Select multi options",
                                "input": {
                                    "type": "typeaheadCustom",
                                    "placeholder": "Please select",
                                    "options": ['Form1', 'Form2'],
                                    "value": ['Form1']
                                },
                            },
                            {
                                "questionId" : "startDate",
                                "question" : "Date",
                                "input" : {
                                "type" : "textInput",
                                "placeholder" : "MM/DD/YYYY"
                                },
                                // Make sure date is entered
                                "validations" : [{
                                    "type" : "isDate",
                                    "matches" : "('mm/dd/yyyy')"
                                }]
                            },
                            {
                                "questionId" : "startDateNew",
                                "question" : "Date picker component",
                                "input" : {
                                    "type" : "datePickerCustom",
                                    "value": '02/02/2020'
                                },
                                // Make sure date is entered
                                "validations" : [{
                                    "type" : "isDate",
                                    "matches" : "('mm/dd/yyyy')"
                                }]
                            }
                        ]
                    }, 
                    {
                        "questionSetId": "principleInvestigator",
                        "questionSetHeader": "Principle Investigator details",
                        "questions": []
                    }
                ]
            },
            questionAnswers: {},
            activePanelId: 'applicant',
        }
    }

    componentDidUpdate() {
        console.log('did update');
        // console.log(this.state);

    }

    shouldComponentUpdate() {
        return true;
    }
    
    onFormUpdate(questionAnswers) {
        // set a schema default value as undefined to clear it from the json payload on submit
        console.log('update', questionAnswers);
    }

    onFormSwitchPanel(panelId) {
        // true ? this.setState({ activePanelId: panelId }) : this.setState({ activePanelId: '' })
        this.setState({ activePanelId: panelId});
        console.log(this.state);
    }

    onFormSubmit(questionAnswers, target) {
        console.log('submit', questionAnswers);
    }

    onParentNavClick() {
        console.log('ParentNavClick');
    }


    renderQuestionSets = (parentForm, questionPanels) => {
      if(questionPanels) {
          return questionPanels.map((item, index) =>{
            if (parentForm.pageId === item.pageId) {
                return  (
                    <li style={{cursor: 'pointer'}} key={index} onClick={e => this.onFormSwitchPanel(item.panelId)}>{item.panelHeader}</li> 
                )
            }
          });
      }
    }
    
  
    render() {
        Winterfell.addInputType('typeaheadCustom', TypeaheadCustom);
        Winterfell.addInputType('datePickerCustom', DatePickerCustom);
        console.log(this.state.activePanelId);
        const {activePanelId} = this.state;
        return (
            <div>
                <Container>
                    <Row>
                    <Col md={3}>
                         <div>Pre-submission</div>   
                         {this.state.form.pages.map((item, idx) => (
                             <div key={item.index}>
                                 <h1 onClick={() => {this.onParentNavClick(item)}}>{item.title}</h1>
                                 {item.active &&
                                     <ul>
                                         { this.renderQuestionSets(item, this.state.form.questionPanels) }
                                     </ul>
                                 }
                             </div>
                         ))}          
                     </Col>
                        <Col md={7}>
                            <Winterfell 
                                schema={this.state.form}
                                panelId={activePanelId}
                                disableSubmit={true}
                                onUpdate={this.onFormUpdate}
                                onSubmit={this.onFormSubmit}
                                onSwitchPanel={this.onFormSwitchPanel} />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DataAccessRequestPOC;
