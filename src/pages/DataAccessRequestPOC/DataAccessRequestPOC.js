

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
                    "radioList": "clean-list list-inline",
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
                        "pageId": 'safePeople'
                    },
                    {
                        "index": 2,
                        "panelId": "principleInvestigator",
                        "pageId": 'safePeople'

                    },
                    {
                        "index": 3,
                        "panelId": "safeProject",
                        "pageId": 'safeProject'
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
                                "action": "GOTO",
                                "target": "principleInvestigator"
                            }
                        },
                        "button": {
                            "text": "Next",
                            "disabled": false
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
                                "action": "GOTO",
                                "target": "safeProject"
                            }
                        },
                        "button": {
                            "text": "Next",
                            "disabled": false
                        },
                        "questionSets": [
                            {
                                "index": 2,
                                "questionSetId": "principleInvestigator"
                            }
                        ]
                    },
                    {
                        "panelId": "safeProject",
                        "panelHeader": "Safe Project",
                        "pageId": "safeProject",
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
                                "index": 1,
                                "questionSetId": "safeProject"
                            }
                        ]
                    },
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
                        "questions": [
                            {
                                "questionId": "regICONumber",
                                "question": "ICO number",
                                "input": {
                                    "type": "textInput"
                                },
                                "validations": [{
                                    "type": "isLength",
                                    "params": [
                                        1,
                                        8
                                    ]}
                                ]
                            },
                        ]
                    },
                    {
                        "questionSetId": "safeProject",
                        "questionSetHeader": "SafeProject",
                        "questions": [{
                            "questionId": "firstName",
                            "question": "First name",
                            "input": {
                                "type": "textInput"
                            }
                        }]
                    }
                ]
            },
            questionAnswers: {applicantName: 'Bob', passportNumber: "GBADAD9878AD876876678F"},
            activePanelId: 'applicant',
        }
    }

    componentDidUpdate() {
        console.log('did update');
    }

    onFormRender() {
        console.log('form render');
    }
    
    onFormUpdate(questionAnswers) {
        console.log('update', questionAnswers);
    }

    onFormSwitchPanel(panelId) {
        this.setState({ activePanelId: panelId});
    }

    onFormSubmit(questionAnswers, target) {
        console.log('submit', questionAnswers);
    }

    onParentNavClick(item, index) {
        const formState = [...this.state.form.pages].map((item) => {
            return {...item, active: false}
        });
        formState[index] = {...item, active: true};
        this.setState({ form: {...this.state.form, pages: formState}});
    }

    renderQuestionSets = (parentForm, questionPanels) => {
        if(questionPanels) {
            return questionPanels.map((item, index) =>{
                if (parentForm.pageId === item.pageId) {
                    return  (
                        <li className="Gray800-14px" style={{cursor: 'pointer'}} key={index} onClick={e => this.onFormSwitchPanel(item.panelId)}>{item.panelHeader}</li> 
                    )
                }
            });
        }
    }

    onSwitchedPanel = (form) => {
        const pages = [...this.state.form.pages];
        const index = pages.findIndex(page => page.pageId === form.pageId);
        const newPageItem = pages[index];
        console.log(`${JSON.stringify(newPageItem, null, 2)}`);
    }
    
    render() {
        Winterfell.addInputType('typeaheadCustom', TypeaheadCustom);
        Winterfell.addInputType('datePickerCustom', DatePickerCustom);
        return (
            <div>
                <Container>
                    <Row className="mt-3">
                    <Col md={3}>
                         <div className="mb-3">Pre-submission</div>   
                         {this.state.form.pages.map((item, idx) => (
                             <div key={item.index} className={`${item.active ? "active-border" : ""}`}>
                                <div>    
                                    <h1 className="Black-16px mb-3" onClick={() => {this.onParentNavClick(item, idx)}}>{item.title}</h1>
                                        {item.active &&
                                            <ul className="list-unstyled ml-2 pl-2 active-grey-border">
                                                { this.renderQuestionSets(item, this.state.form.questionPanels) }
                                            </ul>
                                        }
                                </div>
                             </div>
                         ))}          
                     </Col>
                        <Col md={7}>
                            <Winterfell 
                                schema={this.state.form}
                                questionAnswers={this.state.questionAnswers}
                                panelId={this.state.activePanelId}
                                disableSubmit={true}
                                onUpdate={this.onFormUpdate}
                                onSwitchPanel={this.onSwitchedPanel}
                                onSubmit={this.onFormSubmit}
                                onRender={this.onFormRender} />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DataAccessRequestPOC;
