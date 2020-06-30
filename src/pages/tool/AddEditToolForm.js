import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Event } from '../../tracking';

import {Form, Button, Row, Col} from 'react-bootstrap';

import RelatedResources from '../commonComponents/RelatedResources';
import RelatedObject from '../commonComponents/RelatedObject';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import SVGIcon from '../../images/SVGIcon';

var baseURL = require('../commonComponents/BaseURL').getURL();

const AddEditToolForm = (props) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
 
    const formik = useFormik({
        initialValues: {
            id: props.data.id || '', 
            type: 'tool',
            name: props.data.name || '',
            link: props.data.link || '',
            description: props.data.description || '',
            categories: props.data.categories  || { 
                category: '',
                programmingLanguage: [],
                programmingLanguageVersion: ''
            },
            license: props.data.license || '',
            authors: props.data.authors || [props.userState[0].id],
            tags: props.data.tags || {
                features: [],
                topics: [],
            },
            relatedObjects: props.relatedObjects || []
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .required('This cannot be empty'),
            link: Yup.string()
                .required('This cannot be empty'),
            description: Yup.string()
                .max(1500, 'Maximum of 1,500 characters')
                .required('This cannot be empty'),
            categories: Yup.object().shape({
                category: Yup.string().required('This cannot be empty'),
                programmingLanguage: Yup.string().required('This cannot be empty'),
            }),
            authors: Yup.string().required('This cannot be empty')
        }),

        onSubmit: values => {
            values.relatedObjects = props.relatedObjects
            values.toolCreator = props.userState[0];
            if (props.isEdit) {
                axios.put(baseURL + '/api/v1/mytools/edit', values) 
                    .then((res) => {
                        window.location.href = window.location.search + '/tool/' + props.data.id + '/?toolEdited=true';
                    });
            }
            else {
                axios.post(baseURL + '/api/v1/mytools/add', values) 
                    .then((res) => {
                        window.location.href = window.location.search + '/tool/' + res.data.id + '/?toolAdded=true';
                    });
            }
        }
    });

    var listOfAuthors = [];

    props.combinedUsers.forEach((user) => {
        if (user.id === props.userState[0].id) {
            listOfAuthors.push({ id: user.id, name: user.name + " (You)" })
            if (!user.name.includes('(You)')) {
                user.name = user.name + " (You)";
            }
        }
    });
  
    function updateReason(id, reason, type) {
        let inRelatedObject = false;
        props.relatedObjects.map((object) => {
            if(object.objectId===id){
                inRelatedObject = true;
                object.reason = reason;
            }
        });

        if(!inRelatedObject){
            props.relatedObjects.push({'objectId':id, 'reason':reason, 'objectType': type})
        }
    }

    function descriptionCount(e) {
        var input = e.target.value;
        document.getElementById("currentCount").innerHTML=e.target.value.length
    }
    
    return (
        <div>
            <Row className="mt-4">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <div className="Rectangle">
                        <Row>
                            <Col sm={10} lg={10}>
                             <p className="Black-20px">{props.isEdit ? 'Edit your tool or resource' : 'Add a new tool or resource'}</p>
                            </Col>
                            <Col sm={2} lg={2} className="text-right">
                                <span className="ToolBadge"> 
                                    <SVGIcon name="newtoolicon" fill={'#ffffff'} className="BadgeSvgs mr-2" />
                                    Tool 
                                </span>
                            </Col>
                        </Row>
                        <p className="Gray800-14px">Tools can be anything you or someone else created or used during a research project</p>
                    </div>
                </Col>
                <Col sm={1} lg={10} />
            </Row>

            <Row className="pixelGapTop">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <Form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} autocomplete='off'>
                        <div className="Rectangle">
                            <Form.Group>
                                <span className="Gray800-14px">Name</span>
                                <Form.Control id="name" name="name" type="text" className={formik.touched.name && formik.errors.name ? "EmptyFormInput AddFormInput" : "AddFormInput"} onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                                {formik.touched.name && formik.errors.name ? <div className="ErrorMessages">{formik.errors.name}</div> : null}
                            </Form.Group>

                            <Form.Group>
                                <span className="Gray800-14px">Link</span>
                                <br />
                                <span className="Gray700-13px">Where can we find this tool or resource?</span>
                                <Form.Control id="link" name="link" type="text" className={formik.touched.link && formik.errors.link ? "EmptyFormInput AddFormInput" : "AddFormInput"} onChange={formik.handleChange} value={formik.values.link} onBlur={formik.handleBlur} />
                                {formik.touched.link && formik.errors.link ? <div className="ErrorMessages">{formik.errors.link}</div> : null}
                            </Form.Group>

                            <Form.Group>
                                <span className="Gray800-14px">Type</span>
                                <br />
                                <span className="Gray700-13px">Select from existing or enter a new one.</span>
                                <Typeahead
                                    id="categories.category"
                                    labelKey="category"
                                    allowNew
                                    defaultSelected={[formik.values.categories.category]}
                                    options={props.combinedCategories}
                                    className={formik.touched.categories && (formik.errors.categories && typeof formik.errors.categories.category !== "undefined") ? "EmptyFormInputTypeAhead AddFormInputTypeAhead" : "AddFormInputTypeAhead"}
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.forEach((selectedItem) => {
                                            selectedItem.customOption === true ? tempSelected.push(selectedItem.category) : tempSelected.push(selectedItem);
                                        })
                                        formik.values.categories.category = tempSelected[0];
                                    }}
                                />
                                {formik.touched.categories && (formik.errors.categories && typeof formik.errors.categories.category !== "undefined")
                                    ? <div className="ErrorMessages">{formik.errors.categories.category}</div> : null}
                            </Form.Group>

                            <Form.Group>
                                <div style={{ display: 'inline-block' }}>
                                    <span className="Gray800-14px">Description</span>
                                    <br />
                                    <span className="Gray700-13px">Include the tool purpose and objective.</span>
                                </div>
                                <div style={{ display: 'inline-block', float: 'right' }}>
                                    <br />
                                    <span className="Gray700-13px">(<span id="currentCount">{formik.values.description.length || 0}</span>/1500)</span>
                                </div>
                                <Form.Control as="textarea" id="description" name="description" type="text" className={formik.touched.description && formik.errors.description ? "EmptyFormInput AddFormInput DescriptionInput" : "AddFormInput DescriptionInput"} onKeyUp={descriptionCount} onChange={formik.handleChange}  value={formik.values.description} onBlur={formik.handleBlur} />
                                {formik.touched.description && formik.errors.description ? <div className="ErrorMessages">{formik.errors.description}</div> : null}
                            </Form.Group>

                            <Form.Group>
                                <span className="Gray800-14px">Authors</span>
                                <Typeahead
                                    id="authors"
                                    labelKey={authors => `${authors.name}`}
                                    defaultSelected={listOfAuthors}
                                    multiple
                                    options={props.combinedUsers}
                                    className={formik.touched.authors && formik.errors.authors ? "EmptyFormInputTypeAhead AddFormInputTypeAhead" : "AddFormInputTypeAhead"}
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.forEach((selectedItem) => {
                                            tempSelected.push(selectedItem.id);
                                        })
                                        formik.values.authors = tempSelected;
                                    }}
                                />
                                {formik.touched.authors && formik.errors.authors ? <div className="ErrorMessages">{formik.errors.authors}</div> : null}
                            </Form.Group>
                            
                            <Row className="mt-2">
                                <Col sm={9}>
                                    <Form.Group>
                                        <span className="Gray800-14px">Implementation</span>
                                        <br />
                                        <span className="Gray700-13px">
                                            Programming languages, formalisms or frameworks. E.g. Python, RDF, GATE
                                        </span>
                                        <Typeahead
                                            id="categories.programmingLanguage"
                                            labelKey="programmingLanguage"
                                            allowNew
                                            defaultSelected={formik.values.categories.programmingLanguage}
                                            multiple
                                            options={props.combinedLanguages}
                                            className={formik.touched.categories && (formik.errors.categories && typeof formik.errors.categories.programmingLanguage !== "undefined") ? "EmptyFormInputTypeAhead AddFormInputTypeAhead" : "AddFormInputTypeAhead"}
                                            onChange={(selected) => {
                                                var tempSelected = [];
                                                selected.forEach((selectedItem) => {
                                                    selectedItem.customOption === true ? tempSelected.push(selectedItem.programmingLanguage) : tempSelected.push(selectedItem);

                                                })
                                                formik.values.categories.programmingLanguage = tempSelected;
                                            }}
                                        />
                                        {formik.touched.categories && (formik.errors.categories && typeof formik.errors.categories.programmingLanguage !== "undefined")
                                            ? <div className="ErrorMessages">{formik.errors.categories.programmingLanguage}</div> : null}
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>

                                    <Form.Group>
                                        <span className="Gray800-14px">Version (optional)</span>
                                        <br />
                                        <span className="Gray700-13px">
                                            i.e. 3.6.1
                                        </span>
                                        <Form.Control id="categories.programmingLanguageVersion" name="categories.programmingLanguageVersion" type="text" className="SmallFormInput AddFormInput" onChange={formik.handleChange} value={formik.values.categories.programmingLanguageVersion} onBlur={formik.handleBlur} />
                                    </Form.Group>
                                    {/* <Col sm={2}></Col> */}
                                </Col>
                            </Row>
                            
                            <Form.Group>
                                <span className="Gray800-14px">License (optional)</span>
                                <br />
                                <span className="Gray700-13px">
                                    Select from existing or enter a new one
                                </span>
                                <Typeahead
                                    id="license"
                                    labelKey="license"
                                    allowNew
                                    defaultSelected={[formik.values.license]}
                                    options={props.combinedLicenses}
                                    className="AddFormInputTypeAhead"
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.forEach((selectedItem) => {
                                            selectedItem.customOption === true ? tempSelected.push(selectedItem.license) : tempSelected.push(selectedItem);
                                        })
                                        formik.values.license = tempSelected[0];
                                    }}
                                />
                            </Form.Group>

                            <Form.Group>
                                <span className="Gray800-14px">Keywords (optional)</span>
                                <br />
                                <span className="Gray700-13px">
                                    Technological paradigms or other keywords. Eg. Rule-based, clustering, supervised machine learning
                                </span>
                                <Typeahead
                                    id="tags.features"
                                    labelKey="features"
                                    allowNew
                                    defaultSelected={formik.values.tags.features}
                                    multiple
                                    options={props.combinedFeatures}
                                    className="AddFormInputTypeAhead"
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.forEach((selectedItem) => {
                                            selectedItem.customOption === true ? tempSelected.push(selectedItem.features) : tempSelected.push(selectedItem);
                                        })
                                        formik.values.tags.features = tempSelected;
                                    }}
                                />
                            </Form.Group>

                            <Form.Group>
                                <span className="Gray800-14px">Domain (optional)</span>
                                <br />
                                <span className="Gray700-13px">
                                    E.g. Biogenomics, Nutrition, Blockchain
                                </span>

                                <Typeahead
                                    id="tags.topics"
                                    labelKey="topics"
                                    allowNew
                                    defaultSelected={formik.values.tags.topics}
                                    multiple
                                    options={props.combinedTopic}
                                    className="AddFormInputTypeAhead"
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.forEach((selectedItem) => {
                                            selectedItem.customOption === true ? tempSelected.push(selectedItem.topics) : tempSelected.push(selectedItem);
                                        })
                                        formik.values.tags.topics = tempSelected;
                                    }}
                                />
                            </Form.Group>
                        </div>

                        <div className="Rectangle mt-2">
                            <span className="Black-20px">Related resources</span><span className="Gray454443-14px"> (optional)</span>
                            <br/>
                            <span className="Gray595757-14px">Show relationships to papers, projects, datasets and tools. Resources must be added to the Gateway first.</span>
                        </div>
                        
                        {props.relatedObjects.length === 0 ? '' :     
                        <div className="Rectangle">
                            {props.relatedObjects.map((object) => {
                                return (
                                    <RelatedObject showRelationshipQuestion={true} objectId={object.objectId} doRemoveObject={props.doRemoveObject} doUpdateReason={updateReason} reason={object.reason} didDelete={props.didDelete} updateDeleteFlag={props.updateDeleteFlag}/>
                                )
                            })}
                        </div>}

                        <div className="Rectangle FlexCenter pixelGapTop">
                            <Row>
                                <Col sm={1} lg={1} />
                                <Col sm={10} lg={10}>
                                    
                                    <RelatedResources searchString={props.searchString} doSearchMethod={props.doSearchMethod} doUpdateSearchString={props.doUpdateSearchString} userState={props.userState} datasetData={props.datasetData} toolData={props.toolData} projectData={props.projectData} paperData={props.paperData} personData={props.personData} summary={props.summary} doAddToTempRelatedObjects={props.doAddToTempRelatedObjects} tempRelatedObjectIds={props.tempRelatedObjectIds} relatedObjects={props.relatedObjects} doClearRelatedObjects={props.doClearRelatedObjects} doAddToRelatedObjects={props.doAddToRelatedObjects} />
                                </Col>
                                <Col sm={1} lg={10} />
                            </Row>
                        </div>

                        <Row className="mt-3">
                            <Col xs={5} lg={9}>
                                <a style={{ cursor: 'pointer' }} href={'/account?tab=tools'}>
                                    <Button variant="medium" className="GreyCancelButton Dark-14px mr-2" >
                                        Cancel
                                    </Button>
                                </a>
                            </Col>
                            <Col xs={7} lg={3} className="text-right">
                                <Button variant="primary" className="White-14px" type="submit" onClick={() => Event("Buttons", "Click", "Add tool form submitted")} >
                                    {props.isEdit ? 'Update' : 'Publish'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col sm={1} lg={10} />
            </Row>
            <Row>
                <span className="formBottomGap"></span>
            </Row>
        </div>
    );
}

export default AddEditToolForm;