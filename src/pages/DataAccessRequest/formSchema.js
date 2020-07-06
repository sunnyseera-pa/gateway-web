export const formSchema = {
  classes: {
    "form": "login-form",
    "select": "form-control",
    "typeaheadCustom": "form-control",
    "datePickerCustom": "form-control",
    "question": "form-group",
    "input": "form-control",
    "radioListItem": "dar__radio--item",
    "radioList": "dar__radio--list list-group",
    "checkboxInput": "checkbox list-group",
    "checkboxListItem": "dar__check--item",
    "checkboxList": "dar__check list-group",
    "controlButton": "btn btn-primary pull-right",
    "backButton": "btn btn-default pull-left",
    "errorMessage": "alert alert-danger",
    "buttonBar": "button-bar hidden" 
  },
  pages: [
    {
      pageId: 'preSubmission',
      title: 'Pre-submission',
      description:
        'Make sure you have everything you need before you start the application process!!',
      active: true
    },
    {
      pageId: 'safePeople',
      title: 'Safe People',
      description:
        'Please identify any persons or organisations who will have access to the data',
      active: false
    },
    {
      pageId: 'safeProject',
      title: 'Safe Project',
      description: 'Something else...',
      active: false
    },
    {
      pageId: 'safeData',
      title: 'Safe Data',
      description: 'Something else...',
      active: false
    },
    {
      pageId: 'safeSettings',
      title: 'Safe Settings',
      description: 'Something else...',
      active: false
    },
    {
      pageId: 'safeOutputs',
      title: 'Safe outputs',
      description: 'Something else...',
      active: false
    },
    {
      pageId: 'postSubmission',
      title: 'Post-submission',
      description: 'Something else...',
      active: false
    }
  ],
  formPanels: [
    {
      index: 1,
      panelId: 'mrcHealthDataToolkit',
      pageId: 'preSubmission'
    },
    {
      index: 2,
      panelId: 'adviceFromPublisher',
      pageId: 'preSubmission'
    },
    {
      index: 3,
      panelId: 'applicant',
      pageId: 'safePeople'
    },
    {
      index: 4,
      panelId: 'principleInvestigator',
      pageId: 'safePeople'
    },
    {
      index: 5,
      panelId: 'safeProject',
      pageId: 'safeProject'
    }
  ],
  questionPanels: [
    {
      panelId: 'mrcHealthDataToolkit',
      panelHeader: 'MRC Health Data Access toolkit',
      navHeader: 'MRC Health Data Toolkit',
      questionPanelHeaderText: 'Test',
      pageId: 'preSubmission',
      textareaInput: 'mrcHealthDataToolkit'
    },
    {
      panelId: 'adviceFromPublisher',
      panelHeader: 'Advice from Publisher',
      navHeader: 'Advice from Publisher',
      questionPanelHeaderText: 'Test',
      pageId: 'preSubmission',
      textareaInput: 'adviceFromPublisher'
    },
    {
      panelId: 'applicant',
      panelHeader: 'Applicant Details',
      navHeader: 'Applicant',
      questionPanelHeaderText: 'Test',
      pageId: 'safePeople',
      questionSets: [
        {
          index: 1,
          questionSetId: 'applicant'
        }
      ]
    },
    {
      panelId: 'principleInvestigator',
      panelHeader: 'Principle Investigator',
      navHeader: 'Principle Investigator',
      pageId: 'safePeople',
      questionSets: [
        {
          index: 2,
          questionSetId: 'principleInvestigator'
        }
      ]
    },
    {
      panelId: 'safeProject',
      panelHeader: 'Safe Project',
      navHeader: 'Safe Project',
      pageId: 'safeProject',
      questionSets: [
        {
          index: 1,
          questionSetId: 'safeProject'
        }
      ]
    }
  ],
  questionSets: [
    {
      questionSetId: 'applicant',
      questionSetHeader: 'Applicant details tests',
      questions: [
        {
          questionId: 'applicantName',
          question: 'Applicant name',
          input: {
            type: 'textInput'
          },
          validations: [
            {
              type: 'isLength',
              params: [1, 90]
            }
          ],
          guidance:
            'Guidance information for applicant name, please insert your fullname.'
        },
        {
          questionId: 'researchAim',
          question: 'Research Aim',
          input: {
            type: 'textareaInput'
          },
          validations: [
            {
              type: 'isLength',
              params: [5]
            }
          ],
          guidance:
            'Please briefly explain the purpose of your research and why you require this dataset.'
        },
        {
          questionId: 'linkedDatasets',
          question:
            'Do you have any datasets you would like to link with this one?',
          input: {
            type: 'radioOptionsInput',
            options: [
              {
                text: 'Yes',
                value: 'true',
                conditionalQuestions: [
                  {
                    questionId: 'linkeDatasetsParts',
                    question: 'Please explain which parts of the dataset.',
                    input: {
                      type: 'textareaInput'
                    },
                    validations: [
                      {
                        type: 'isLength',
                        params: [5]
                      }
                    ]
                  }
                ]
              },
              {
                text: 'No',
                value: 'false'
              }
            ]
          }
        },
        {
          questionId: 'dataRequirements',
          question:
            'Do you know which parts of the dataset you are interested in?',
          input: {
            type: 'radioOptionsInput',
            options: [
              {
                text: 'Yes',
                value: 'true',
                conditionalQuestions: [
                  {
                    questionId: 'dataRequirementsReason',
                    question: 'Please explain which parts of the dataset.',
                    input: {
                      type: 'textareaInput'
                    },
                    validations: [
                      {
                        type: 'isLength',
                        params: [5]
                      }
                    ]
                  }
                ]
              },
              {
                text: 'No',
                value: 'false'
              }
            ]
          }
        },
        {
          questionId: 'projectStartDate',
          question: 'Proposed project start date (optional)',
          input: {
            type: 'datePickerCustom',
            value: '02/12/2020'
          },
          validations: [
            {
              type: 'isDate',
              matches: "('dd/mm/yyyy')"
            }
          ],
          guidance: 'Please select a date for the proposed start date.'
        },
        {
          questionId: 'programmingLanguages',
          question: 'Programming languages involved',
          input: {
            type: 'typeaheadCustom',
            placeholder: 'Please select',
            options: ['javascript', 'node', 'ASP.NET', 'Java', 'Python']
          },
          validateOn: "blur",
          validations: [
            {
              type: "isLength",
              params: [
                1
              ]
            }
          ],
          guidance:
            'Please select the programming languages to support the dataset.'
        },
        {
          questionId: 'regICONumber',
          question: 'ICO number',
          input: {
            type: 'textInput'
          },
          validations: [
            {
              type: 'isLength',
              params: [1, 8]
            }
          ],
          guidance: 'ICO registration number.'
        },
        {
          questionId: 'researchBenefits',
          question: 'Research benefits(optional)',
          input: {
            type: 'textareaInput'
          },
          guidance:
            'Please provide evidence of how your research will benefit the health and social care system.'
        },
        {
          questionId: 'ethicalProcessingEvidence',
          question: 'Ethical processing evidence (optional)',
          input: {
            type: 'textareaInput'
          },
          guidance:
            'Please provide a link(s) to relevant sources that showcase evidence of thee fair processing of data by your organisation.'
        },
        {
          questionId: 'contactNumber',
          question: 'Contact Number (optional)',
          input: {
            type: 'textInput'
          },
          guidance: 'Please provide a telephone or mobile contact point.'
        }
      ]
    },
    {
      questionSetId: 'principleInvestigator',
      questionSetHeader: 'Principle Investigator details',
      questions: [
        {
          questionId: 'firstName',
          question: 'First name',
          input: {
            type: 'textInput'
          },
          validations: [
            {
              type: 'isLength',
              params: [1, 20]
            }
          ],
          guidance: 'Some safe project guidance.'
        }
      ]
    },
    {
      questionSetId: 'principleInvestigator',
      questionSetHeader: 'Principle Investigator details',
      questions: [
        {
          questionId: 'regICONumber',
          question: 'ICO number',
          input: {
            type: 'textInput'
          },
          validations: [
            {
              type: 'isLength',
              params: [1, 8]
            }
          ],
          guidance: 'Some principle investigator.'
        }
      ]
    },
    {
      questionSetId: 'safeProject',
      questionSetHeader: 'SafeProject',
      questions: [
        {
          questionId: 'firstName',
          question: 'First name',
          input: {
            type: 'textInput'
          },
          validations: [
            {
              type: 'isLength',
              params: [1, 20]
            }
          ],
          guidance: 'Some safe project guidance.'
        }
      ]
    }
  ]
};
