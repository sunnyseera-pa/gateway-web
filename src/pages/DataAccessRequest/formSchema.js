export const formSchema = {
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
        "buttonBar": "button-bar hdrukButtonBar" 
    },
    "pages": [
        {
            "index": 1,
            "pageId": "preSubmission",
            "title": "Pre-submission",
            "description": "Make sure you have everything you need before you start the application process",
            "active": true
        },
        {
            "index": 2,
            "pageId": "safePeople",
            "title": "Safe People",
            "description": "Please identify any persons or organisations who will have access to the data",
            "active": false
        },
        {
            "index": 3,
            "pageId": "safeProject",
            "title": "Safe Project",
            "description": "Something else...",
            "active": false
        },
        {
            "index": 4,
            "pageId": "safeData",
            "title": "Safe Data",
            "description": "Something else...",
            "active": false
        },
        {
            "index": 5,
            "pageId": "safeSettings",
            "title": "Safe Settings",
            "description": "Something else...",
            "active": false
        },
        {
            "index": 6,
            "pageId": "safeOutputs",
            "title": "Safe outputs",
            "description": "Something else...",
            "active": false
        },
        {
            "index": 7,
            "pageId": "postSubmission",
            "title": "Post-submission",
            "description": "Something else...",
            "active": false
        },
    ],
    "formPanels": [
        {
            "index": 1,
            "panelId": "mrcHealthDataToolkit",
            "pageId": "preSubmission"
        },
        {
            "index": 2,
            "panelId": "adviceFromBreathe",
            "pageId": "preSubmission"
        },
        {
            "index": 3,
            "panelId": "applicant",
            "pageId": "safePeople"
        },
        {
            "index": 4,
            "panelId": "principleInvestigator",
            "pageId": "safePeople"

        },
        {
            "index": 5,
            "panelId": "safeProject",
            "pageId": "safeProject"
        }
    ],
    "questionPanels": [
        {
            "panelId": "mrcHealthDataToolkit",
            "panelHeader": "MRC Health Data Access toolkit",
            "navHeader": "MRC Health Data Toolkit",
            "questionPanelHeaderText": "Test",
            "pageId": "preSubmission",
            "action": {
                "default": {
                    "action": "GOTO",
                    "target": "applicant"
                }
            },
            "button": {
                "text": "Go to Safe People",
                "disabled": false
            },
            "textareaInput": "mrcHealthDataToolkit"
        },
        {
            "panelId": "adviceFromPublisher",
            "panelHeader": "Advice from Publisher",
            "navHeader": "Advice from Publisher",
            "questionPanelHeaderText": "Test",
            "pageId": "preSubmission",
            "action": {
                "default": {
                    "action": "GOTO",
                    "target": "applicant"
                }
            },
            "button": {
                "text": "Go to Safe People",
                "disabled": false
            },
            "textareaInput": "adviceFromBreathe",
        },
        {
            "panelId": "applicant",
            "panelHeader": "Applicant Details",
            "navHeader": "Applicant",
            "questionPanelHeaderText": "Test",
            "pageId": "safePeople",
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
            "navHeader": "Principle Investigator",
            "pageId": "safePeople",
            "action": {
                "default": {
                    "action": "GOTO",
                    // "target": "person1"
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
            "panelId": "person1",
            "panelHeader": "Person 1",
            "navHeader": "Person 1",
            "pageId": "safePeople",
            "action": {
                "default": {
                    "action": "GOTO",
                    "target": "person2"
                }
            },
            "button": {
                "text": "Next",
                "disabled": false
            },
            "textareaInput": "person1",
            // "questionSets": [
            //     {
            //         "index": 2,
            //         "questionSetId": "principleInvestigator"
            //     }
            // ]
        },
        {
            "panelId": "person2",
            "panelHeader": "Person 2",
            "navHeader": "Person 2",
            "pageId": "safePeople",
            "action": {
                "default": {
                    "action": "GOTO",
                    "target": "institution1"
                }
            },
            "button": {
                "text": "Next",
                "disabled": false
            },
            "textareaInput": "person2",
            // "questionSets": [
            //     {
            //         "index": 2,
            //         "questionSetId": "principleInvestigator"
            //     }
            // ]
        },
        {
            "panelId": "institution1",
            "panelHeader": "Institution 1",
            "navHeader": "Institution 1",
            "pageId": "safePeople",
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
            "textareaInput": "institution1",
            // "questionSets": [
            //     {
            //         "index": 2,
            //         "questionSetId": "principleInvestigator"
            //     }
            // ]
        },
        {
            "panelId": "safeProject",
            "panelHeader": "Safe Project",
            "navHeader": "Safe Project",
            "pageId": "safeProject",
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
            "questionSetHeader": "Applicant details tests",
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
                // {
                //     "questionId": "optionsSelect",
                //     "question": "Select multi options",
                //     "input": {
                //         "type": "typeaheadCustom",
                //         "placeholder": "Please select",
                //         "options": ["Form1", "Form2"],
                //         "value": ["Form1"]
                //     },
                // },
                // {
                //     "questionId" : "startDate",
                //     "question" : "Date",
                //     "input" : {
                //     "type" : "textInput",
                //     "placeholder" : "MM/DD/YYYY"
                //     },
                //     "validations" : [{
                //         "type" : "isDate",
                //         "matches" : "('mm/dd/yyyy')"
                //     }]
                // },
                // {
                //     "questionId" : "startDateNew",
                //     "question" : "Date picker component",
                //     "input" : {
                //         "type" : "datePickerCustom",
                //         "value": "02/02/2020"
                //     },
                //     "validations" : [{
                //         "type" : "isDate",
                //         "matches" : "('mm/dd/yyyy')"
                //     }]
                // }
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
}