import React, { useState, useEffect, Fragment } from 'react'
import Form from 'react-jsonschema-form';
import { Row, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';
export const DataAccessRequest = () => {

    const [activeForm, setSchema] = useState({
        schema:{ properties: {}},
        uiSchema: {},
        formData: {
            applicant: '',
            passport: '',
            done: false,
            evidence: ''}
    }, {});

    const isFilled = (fieldName) => ({ formData }) => (formData[fieldName] && formData[fieldName].length) ? true : false
    const isTrue = (fieldName) => ({ formData }) => (formData[fieldName]);

    const [form, setFormState] = useState([
        {
            id: 1,
            name: 'Safe People',
            active: true,
            forms: [
                {
                    name: 'Safe People',
                    description: 'Please identify any persons or organisations who will have access to the data',
                    schema: {
                        title: "Safe People",
                        description: 'Please identify any persons or organisations who will have access to the data',
                        type: "object",
                        properties: {
                          applicant: {
                            type: "string",
                            title: "Applicant name",
                            default: ''
                          },
                          passportNumber: {
                            type: "string",
                            title: "Passport number",
                            default: '',
                          },
                          done: {
                            type: "boolean",
                            title: 'Are you the principle investigator?',
                            default: null,
                          },
                          evidence: {
                            "type": "string",
                            "title": "Evidence"
                          },
                        },
                    },
                    uiSchema: {
                        applicant: {
                          "ui:autofocus": true
                        },
                        done: {
                          classNames: "dyn-radio",
                          "ui:widget": {
                              component: 'radio',
                              options: {
                                inline: true
                            }
                          }
                        },
                        evidence: { 
                           "ui:widget": "textarea",
                            doShow: isTrue('done') 
                        }
                    },
                    formData: {
                        applicant: 'Joe Nesbo',
                        passport: '',
                        done: null,
                        evidence: ''
                    }                    
                },
                {
                    name: 'Principle Investigator',
                    schema: {
                        "title": "Principle Investigator",
                        description: 'Please identify person(s) or organisation(s) who will be investigating.',
                        "type": "object",
                        "properties": {
                          "passport": {
                            "type": "string",
                            "title": "Passport"
                          },
                        }
                    },
                    uiSchema: {
                        passport: {
                            "ui:autofocus": true
                          },
                    },
                    formData: {
                    }
                }
            ]
        },
        {
            id: 2,
            name: 'Safe Working',
            active: false,
            forms: [
                {
                    name: 'Safe Working',
                    schema: {
                        "title": "Applicant",
                        "type": "object",
                        "properties": {
                          "age": {
                            "type": "number"
                          }
                        }
                    },
                    formData: {}
                },
            ]
        }
    ], []);

    const onSetFormSchema = (e, index, form) => {
        e.preventDefault();
        if(!isEmpty(form)) {
            setSchema({
                ...form
            });
        }
    }

    const onChange = (e) => {
        const {fromData} = e;
        console.log(form);
    }

    const onSubmit = (e) => {
        debugger;
        alert(JSON.stringify({...e.formData},null, 2));
    }
    
    const onBlur = (e) => {
        console.log(e);
    }

    const onParentNavClick = (element, index) => {
        const formState = [...form].map((item) => {
            return {...item, active: false}
        });
        formState[index] = {...element, active: true};
        setFormState([
            ...formState
        ]);
    }
    
    // const formData ={
    //     applicant: 'Joe Nesbo',
    //     passportNumber: 'GB98789-HJKJHG454-AFS65ERT',
    //     done: true
    // }

    return (
        <Row>
            <Col md={2}>
                {form.map((formElement, index) => (
                    <div key={index}>
                        <h1 onClick={() => {onParentNavClick(formElement, index)}}>{formElement.name}</h1>
                        {formElement.active &&
                            <ul>
                            {formElement.forms && formElement.forms.map((form, index) => (
                                <li style={{cursor: 'pointer'}} key={index} onClick={e => onSetFormSchema(e, index, form)}>
                                    {form.name}
                            </li>
                            ))}
                        </ul>}
                    </div>
                ))}
            </Col>
           <Col md={6}>
                <Form
                    formData={activeForm.formData}
                    schema={activeForm.schema}
                    uiSchema={activeForm.uiSchema}
                    onSubmit={e => onSubmit(e)}
                    onChange={e => onChange(e)}
                    onBlur={e => onBlur(e)}
                    noHtml5Validate />
           </Col>
            
        </Row>
        
    );
};

export default DataAccessRequest;
