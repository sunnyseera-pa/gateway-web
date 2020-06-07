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
        "file": "form-control",
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
            "index": 1,
            "pageId": "safePeople",
            "title": "Safe People",
            "description": "Please identify any persons or organisations who will have access to the data",
            "active": true
        },
        {
            "index": 2,
            "pageId": "safeProject",
            "title": "Safe Project",
            "description": "Something else...",
            "active": false
        }
    ],
    "formPanels": [
        {
            "index": 1,
            "panelId": "applicant",
            "pageId": "safePeople"
        },
        {
            "index": 2,
            "panelId": "principleInvestigator",
            "pageId": "safePeople"

        },
        {
            "index": 3,
            "panelId": "safeProject",
            "pageId": "safeProject"
        }
    ],
    "questionPanels": [
        {
            "panelId": "applicant",
            "panelHeader": "Applicant",
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
                        "options": ["Form1", "Form2"],
                        "value": ["Form1"]
                    },
                },
                {
                    "questionId" : "startDate",
                    "question" : "Date",
                    "input" : {
                    "type" : "textInput",
                    "placeholder" : "MM/DD/YYYY"
                    },
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
                        "value": "02/02/2020"
                    },
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
                    "questionId": "projectReason",
                    "question": "Project reason",
                    "input": {
                        "type": "textareaInput"
                    }
                },
                {
                    "questionId": "uploadEvidence",
                    "question": "Upload Evidence",
                    "input": {
                        "type": "fileInput"
                    }
                }
            ]
        }
    ]
}