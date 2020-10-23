import React, { Fragment, useState, useRef } from "react";
import axios from 'axios';

import { Formik, useFormik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Typeahead } from 'react-bootstrap-typeahead';
import _ from "lodash";
import moment from 'moment';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { SlideDown } from 'react-slidedown';
import DatePicker from "react-datepicker";

import RelatedResources from '../commonComponents/relatedResources/RelatedResources';
import RelatedObject from '../commonComponents/relatedObject/RelatedObject';
import ActionBar from '../commonComponents/actionbar/ActionBar';

import SVGIcon from '../../images/SVGIcon';
import { ReactComponent as CloseButtonSvg } from '../../images/close-alt.svg';
import './Course.scss';


const initialValues = {
    id: '',
    type: 'course',
    title: '',
    link: '',
    provider: '',
    description: '',
    courseDelivery: 'campus',
    location: '',
    keywords: [],
    domains: [],
    courseOptions: [{
        flexibleDates: '',
        startDate: '',
        studyMode: '',
        studyDurationNumber: '',
        studyDurationMeasure: '', 
        fees: [{ 
            feeDescription: '',
            feeAmount: ''
        }],
    }],
    entries: [
        { 
            level: '',
            subject: ''
        }
    ],
    restrictions: '',
    award: [],
    competencyFramework: '',
    nationalPriority: ''
};


class Fees {
    constructor() {
        this.feeDescription = "";
        this.feeAmount = "";
    }
}

class Entries {
    constructor() {
        this.level = "";
        this.subject = "";
    }
}

const validateSchema = Yup.object().shape({
    programmingLanguage: Yup.array()
        .of(
            Yup.object().shape({
                programmingLanguage: Yup.string().required("This cannot be empty")
            })
        )
});

var baseURL = require('../commonComponents/BaseURL').getURL();

const AddEditCourseForm = (props) => {

    const courseOptions2 = {
        flexibleDates: '',
        startDate: '',
        studyMode: '',
        studyDurationNumber: '',
        studyDurationMeasure: '', 
        fees: [
            { 
                feeDescription: '',
                feeAmount: ''
            }
        ]
    }

    const formik = useFormik({
        initialValues: {
            id: props.data.id || '',
            type: 'course',
            title: props.data.title || '',
            link: props.data.link || '',
            provider: props.data.provider || '',
            description: props.data.description || '',
            courseDelivery: props.data.courseDelivery || 'campus',
            location: props.data.location || '',
            keywords: props.data.keywords || [],
            domains: props.data.domains || [],
            courseOptions: props.data.courseOptions || [
                {
                    flexibleDates: '',
                    startDate: '',
                    studyMode: '',
                    studyDurationNumber: '',
                    studyDurationMeasure: '', 
                    fees: [
                        { 
                            feeDescription: '',
                            feeAmount: ''
                        }
                    ]
                }
            ],
            entries: props.data.entries || [
                { 
                    level: '',
                    subject: ''
                }
            ],
            restrictions: props.data.restrictions || '',
            award: props.data.award || [],
            competencyFramework: props.data.competencyFramework || '',
            nationalPriority: props.data.nationalPriority || '',
            relatedObjects: props.relatedObjects || []
        },

        validationSchema: Yup.object({
            title: Yup.string()
                .required('This cannot be empty'),
            link: Yup.string()
                .required('This cannot be empty'),
            provider: Yup.string()
                .required('This cannot be empty'),
            description: Yup.string()
                .max(3000, 'Maximum of 3,000 characters')
                .required('This cannot be empty'),
            
            
            
            
                
                
            programmingLanguage: Yup.array()
                .of(
                    Yup.object().shape({
                        programmingLanguage: Yup.string().required('This cannot be empty')
                    })
                ),
        }),

        onSubmit: values => {
            if (values.courseDelivery === 'online') values.location = '';
            values.relatedObjects = props.relatedObjects
            if (props.isEdit) {
                axios.put(baseURL + '/api/v1/course/' + props.data.id, values) 
                    .then((res) => {
                        window.location.href = window.location.search + '/course/' + props.data.id + '/?courseEdited=true';
                    });
            }
            else {
                axios.post(baseURL + '/api/v1/course', values) 
                    .then((res) => {
                        window.location.href = window.location.search + '/course/' + res.data.response.id + '/?courseAdded=true';
                    });
            }
            console.log(values) 
        }
    });







    const {
        workflow,
        team,
        switchWorkflowView,
        updateWorkflow,
    } = props;

    const formRef = useRef();
    const [phaseIndex, setPhaseIndex] = useState(-1);

    var listOfAuthors = [];

    function updateReason(id, reason, type) {
        let inRelatedObject = false;
        props.relatedObjects.map((object) => {
            if (object.objectId === id) {
                inRelatedObject = true;
                object.reason = reason;
                object.user = props.userState[0].name;
                object.updated = moment().format("DD MMM YYYY");
            }
        });

        if (!inRelatedObject) {
            props.relatedObjects.push({ 'objectId': id, 'reason': reason, 'objectType': type, 'user': props.userState[0].name, 'updated': moment().format("DD MMM YYYY") })
        }
    }

    function descriptionCount(e) {
        var input = e.target.value;
        document.getElementById("currentCount").innerHTML = e.target.value.length
    }

    const relatedResourcesRef = React.useRef()








    const deletePhase = (values, index) => {
        debugger
        let { courseOptions } = { ...values };
        if (!_.isEmpty(courseOptions)) {
            let newCourseOptions = [...courseOptions].filter((key, idx) => { return idx !== index });
            setPhaseIndex(-1);
            return {
                ...values,
                courseOptions: newCourseOptions
            }
        }
        return values;
    }

    const removePhase = (index) => {
        debugger
        let { current: { values, setValues } } = formRef;
        // setPhase index value 
        setPhaseIndex(index);
        const formValues = deletePhase(values, index);
        setValues(formValues);
    }

    const hasErrors = (touched, errors, index, field) => {
        if (touched &&
            errors &&
            typeof errors.courseOptions !== 'undefined' &&
            typeof touched.courseOptions !== 'undefined' &&
            typeof errors.courseOptions[`${index}`] !== 'undefined' &&
            typeof touched.courseOptions[`${index}`] !== 'undefined' &&
            typeof errors.courseOptions[`${index}`][field] !== 'undefined' &&
            typeof touched.courseOptions[`${index}`][field] !== 'undefined' &&
            errors.courseOptions[`${index}`][field] &&
            touched.courseOptions[`${index}`][field]
        ) {
            return true;
        }
        return false;
    }


    return (
        <div className={"container"}>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                innerRef={formRef}
                validationSchema={validateSchema}
                render={({ values, errors, touched, handleReset, setFieldValue }) => {
                    return (
                        <div>
                            <Row className="margin-top-32">
                                <Col sm={1} lg={1} />
                                <Col sm={10} lg={10}>
                                    <div className="rectangle">
                                        <Row>
                                            <Col sm={10} lg={10}>
                                                <p className="black-20 margin-bottom-0 pad-bottom-8">{props.isEdit ? 'Edit your course' : 'Add a new course'}</p>
                                            </Col>
                                            <Col sm={2} lg={2} className="text-right">
                                                <span className="badge-course">
                                                    <SVGIcon name="newtoolicon" fill={'#ffffff'} className="badgeSvg mr-2" />
                                                    Course
                                                </span>
                                            </Col>
                                        </Row>
                                        <p className="gray800-14 margin-bottom-0">Courses are any educational programme that users of the Gateway may find helpful</p>
                                    </div>
                                </Col>
                                <Col sm={1} lg={10} />
                            </Row>
                            <Row className="pixelGapTop">
                                <Col sm={1} lg={1} />
                                <Col sm={10} lg={10}>
                                    <Form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} autocomplete='off'>
                                        <div className="rectangle">
                                            <Form.Group>
                                                <span className="gray800-14">Course Title</span>
                                                <Form.Control id="title" name="title" type="text" className={formik.touched.title && formik.errors.title ? "emptyFormInput addFormInput" : "addFormInput"} onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur} />
                                                {formik.touched.title && formik.errors.title ? <div className="errorMessages">{formik.errors.title}</div> : null}
                                            </Form.Group>

                                            <Form.Group>
                                                <p className="gray800-14 margin-bottom-0 pad-bottom-4">URL</p>
                                                <p className="gray700-13 margin-bottom-0">Where can users sign up and find more information about this course?</p>
                                                <Form.Control id="link" name="link" type="text" className={formik.touched.link && formik.errors.link ? "emptyFormInput addFormInput" : "addFormInput"} onChange={formik.handleChange} value={formik.values.link} onBlur={formik.handleBlur} />
                                                {formik.touched.link && formik.errors.link ? <div className="errorMessages">{formik.errors.link}</div> : null}
                                            </Form.Group>

                                            <Form.Group>
                                                <p className="gray800-14 margin-bottom-0 pad-bottom-4">Course provider</p>
                                                <p className="gray700-13 margin-bottom-0">Who is providing this course?</p>
                                                <Form.Control id="provider" name="provider" type="text" className={formik.touched.provider && formik.errors.provider ? "emptyFormInput addFormInput" : "addFormInput"} onChange={formik.handleChange} value={formik.values.provider} onBlur={formik.handleBlur} />
                                                {formik.touched.provider && formik.errors.provider ? <div className="errorMessages">{formik.errors.provider}</div> : null}
                                            </Form.Group>

                                            <Form.Group className="pb-2 margin-bottom-0">
                                                <Form.Label className="gray800-14">Course delivery method (optional)</Form.Label>
                                                <br />
                                                <InputGroup /* onChange={oncourseDeliveryInput} */>
                                                    <InputGroup.Prepend>
                                                        <Row className="margin-bottom-8">
                                                            <InputGroup.Radio id="courseDeliveryCampus" className="ml-3" aria-label="On-campus" name="courseDelivery" defaultChecked={formik.values.courseDelivery === 'campus'} onChange={(e) => { formik.setFieldValue("courseDelivery", "campus") }} />
                                                            <span className="gray800-14 ml-3">On-campus</span>
                                                            {/* <Form.Check type="radio" label="Yes" className="ml-4 checker" name="partOfOrg" id="partOfOrgYes" defaultChecked={props.showOrg == true} onChange={(e) => {formik.setFieldValue("showOrgVal", "yes")}}/> */}
                                                        </Row>
                                                        <Row className="margin-bottom-12">
                                                            <InputGroup.Radio id="courseDeliveryOnline" className="ml-3" aria-label="Online" name="courseDelivery" defaultChecked={formik.values.courseDelivery === 'online'} onChange={(e) => { formik.setFieldValue("courseDelivery", "online") }} />
                                                            <span className="gray800-14 ml-3">Online</span>
                                                        </Row>
                                                    </InputGroup.Prepend>
                                                </InputGroup>
                                                {formik.values.courseDelivery === 'campus' ?
                                                    <Form.Group>
                                                        <p className="gray800-14 margin-bottom-0 pad-bottom-4">Location (optional)</p>
                                                        <p className="gray700-13 margin-bottom-0">Where is this course being held? e.g. London, Manchester, Wales, Scotland</p>
                                                        <Form.Control id="location" name="location" type="text" className="addFormInput" onChange={formik.handleChange} value={formik.values.location} onBlur={formik.handleBlur} />
                                                    </Form.Group> : null
                                                }
                                            </Form.Group>

                                            <Form.Group>
                                                <div style={{ display: 'inline-block' }}>
                                                    <p className="gray800-14 margin-bottom-0 pad-bottom-4">Description</p>
                                                    <p className="gray700-13 margin-bottom-0">Include an overview of the course</p>
                                                </div>
                                                <div style={{ display: 'inline-block', float: 'right' }}>
                                                    <br />
                                                    <span className="gray700-13">(<span id="currentCount">{formik.values.description.length || 0}</span>/3000)</span>
                                                </div>
                                                <Form.Control as="textarea" id="description" name="description" type="text" className={formik.touched.description && formik.errors.description ? "emptyFormInput addFormInput descriptionInput" : "addFormInput descriptionInput"} onKeyUp={descriptionCount} onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
                                                {formik.touched.description && formik.errors.description ? <div className="errorMessages">{formik.errors.description}</div> : null}
                                            </Form.Group>

                                            <Form.Group>
                                                <p className="gray800-14 margin-bottom-0 pad-bottom-4">Keywords (optional)</p>
                                                <p className="gray700-13 margin-bottom-0">
                                                    E.g. Community, Research, Statistical Analysis
                                                </p>
                                                <Typeahead
                                                    id="keywords"
                                                    labelKey="keywords"
                                                    allowNew
                                                    defaultSelected={formik.values.keywords}
                                                    multiple
                                                    options={props.combinedFeatures}
                                                    className="addFormInputTypeAhead"
                                                    onChange={(selected) => {
                                                        var tempSelected = [];
                                                        selected.forEach((selectedItem) => {
                                                            selectedItem.customOption === true ? tempSelected.push(selectedItem.keywords) : tempSelected.push(selectedItem);
                                                        })
                                                        formik.values.keywords = tempSelected;
                                                    }}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <p className="gray800-14 margin-bottom-0 pad-bottom-4">Domain (optional)</p>
                                                <p className="gray700-13 margin-bottom-0">
                                                    E.g. Genomics, Health Informatics, Data Science
                                                </p>
                                                <Typeahead
                                                    id="domains"
                                                    labelKey="domains"
                                                    allowNew
                                                    defaultSelected={formik.values.domains}
                                                    multiple
                                                    options={props.combinedTopic}
                                                    className="addFormInputTypeAhead"
                                                    onChange={(selected) => {
                                                        var tempSelected = [];
                                                        selected.forEach((selectedItem) => {
                                                            selectedItem.customOption === true ? tempSelected.push(selectedItem.domains) : tempSelected.push(selectedItem);
                                                        })
                                                        formik.values.domains = tempSelected;
                                                    }}
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className="rectangle mt-2">
                                            <p className="black-20 margin-bottom-0 pad-bottom-8">Dates and costs</p>
                                        </div>

                                        <div className="rectangle pixelGapTop">


                                            <div className="main-body">
                                                <FieldArray
                                                    name="courseOptions"
                                                    render={({ push }) => (
                                                        <div>
                                                            {formik.values.courseOptions.length > 0 &&
                                                                formik.values.courseOptions.map((node, index) => {
                                                                    return (
                                                                        <div key={`courseOptions2-${index}`} className="main-accordion">
                                                                            <div className="main-accordion-header" onClick={(e) => {
                                                                                e.preventDefault();
                                                                                setFieldValue(`courseOptions[${index}].expand`, !node.expand)
                                                                            }}>
                                                                                <SVGIcon name="chevronbottom" fill={'#fff'} className={node.expand ? '' : "flip180"} />
                                                                                <h1>{index + 1}. Course option</h1>
                                                                            </div>
                                                                            <SlideDown closed={node.expand}>
                                                                                <div className="main-accordion-body">
                                                                                    <div className="form-group">
                                                                                        <label htmlFor={`node.${index}.sections`} className="form-label">Course start date</label>
                                                                                        <small className="form-text mb-2">If the start date is flexible, for instance if it is a self-taught course that you can begin at any time, select the checkbox.</small>
                                                                                        <div className="row mb-2">
                                                                                            <Field
                                                                                                type="checkbox"
                                                                                                name={`courseOptions[${index}].sections`}
                                                                                                value="safepeople"
                                                                                                className={`checker ${hasErrors(touched, errors, index, 'sections') ? 'is-invalid' : ''}`} />
                                                                                            <span className="gray800-14 ml-4">This course has flexible dates</span>
                                                                                        </div>
                                                                                        {hasErrors(touched, errors, index, 'sections') ? <div className="errorMessages">{errors.courseOptions[index].sections}</div> : null}
                                                                                    </div>

                                                                                    <DatePicker
                                                                                        name='startdate'
                                                                                        dateFormat="dd/MM/yyyy"
                                                                                        selected={formik.values.courseOptions[index].startDate}
                                                                                        onChange={date => formik.values.courseOptions[index].startDate = date }
                                                                                    />

                                                                                    <Row className="mt-2">
                                                                                        <Col sm={12}>
                                                                                            <p className="gray800-14 margin-bottom-0 pad-bottom-4">Course duration (optional)</p>
                                                                                            <p className="gray700-13 margin-bottom-0">
                                                                                                Input the duration for this course option. If this course does not have a set duration, for example if it’s self-taught, please input an expected duration.
                                                                                            </p>
                                                                                        </Col>
                                                                                        <Col sm={4}>
                                                                                            <p className="gray800-14 margin-bottom-0 pad-bottom-4">Study mode</p>
                                                                                        </Col>
                                                                                        <Col sm={4}>
                                                                                            <p className="gray800-14 margin-bottom-0 pad-bottom-4">Duration</p>
                                                                                        </Col>
                                                                                        <Col sm={4} />
                                                                                    </Row>

                                                                                    <Row className="mt-2">
                                                                                        <Col sm={4}>
                                                                                            <Form.Control id={`courseOptions[${index}].studyMode`} name={`courseOptions[${index}].studyMode`} type="text" className="smallFormInput addFormInput"
                                                                                                onChange={formik.handleChange} value={formik.values.courseOptions[index].studyMode} onBlur={formik.handleBlur} />
                                                                                        </Col>
                                                                                        <Col sm={4}>
                                                                                            <Form.Control id={`courseOptions[${index}].studyDurationNumber`} name={`courseOptions[${index}].studyDurationNumber`} type="text" className="smallFormInput addFormInput"
                                                                                                onChange={formik.handleChange} value={formik.values.courseOptions[index].studyDurationNumber} onBlur={formik.handleBlur} />
                                                                                        </Col>
                                                                                        <Col sm={4}>
                                                                                            <Form.Control id={`courseOptions[${index}].studyDurationMeasure`} name={`courseOptions[${index}].studyDurationMeasure`} type="text" className="smallFormInput addFormInput"
                                                                                                onChange={formik.handleChange} value={formik.values.courseOptions[index].studyDurationMeasure} onBlur={formik.handleBlur} />
                                                                                        </Col>
                                                                                    </Row>



                                                                                    <Row className="mt-2">
                                                                                        <Col sm={12}>
                                                                                            <p className="gray800-14 margin-bottom-0 pad-bottom-4">Course fee (optional)</p>
                                                                                            <p className="gray700-13 margin-bottom-0">
                                                                                                Include details of the fees for each type of applicant for this course option, as well as the time frame the fee applies to.
                                                                                            </p>
                                                                                        </Col>
                                                                                        <Col sm={12} md={8}>
                                                                                            <p className="gray800-14 margin-bottom-0 pad-bottom-4">Description</p>
                                                                                        </Col>
                                                                                        <Col sm={6} md={3}>
                                                                                            <p className="gray800-14 margin-bottom-0 pad-bottom-4">Fee (GBP)</p>
                                                                                        </Col>
                                                                                    </Row>

                                                                                    <Row className="mt-2">
                                                                                        <FieldArray
                                                                                            name="fees"
                                                                                            render={({ insert, remove, push }) => (
                                                                                                <Fragment>
                                                                                                    {formik.values.courseOptions[index].fees.length > 0 &&
                                                                                                    formik.values.courseOptions[index].fees.map((p, indexB) => (
                                                                                                        <Fragment>
                                                                                                            <Col sm={12} md={8}>
                                                                                                                <div className="">
                                                                                                                    <Form.Control id={`courseOptions[${index}].fees[${indexB}].feeDescription`} name={`courseOptions[${index}].fees[${indexB}].feeDescription`} type="text" className="smallFormInput addFormInput"
                                                                                                                        onChange={formik.handleChange} value={formik.values.courseOptions[index].fees[indexB].feeDescription} onBlur={formik.handleBlur} />
                                                                                                                </div>
                                                                                                            </Col>
                                                                                                            <Col sm={6} md={2} style={{ paddingRight: "0px" }}>

                                                                                                                <div className="">
                                                                                                                    <Form.Control id={`courseOptions[${index}].fees[${indexB}].feeAmount`} name={`courseOptions[${index}].fees[${indexB}].feeAmount`} type="text" className="smallFormInput addFormInput"
                                                                                                                        onChange={formik.handleChange} value={formik.values.courseOptions[index].fees[indexB].feeAmount} onBlur={formik.handleBlur} />
                                                                                                                </div>
                                                                                                            </Col>

                                                                                                            <Col style={{ paddingRight: "0px" }} className="col-sm-6 col-md-2 d-flex justify-content-center align-items-center setHeight">

                                                                                                                <button type="button" className="plusMinusButton" disabled={(formik.values.courseOptions[index].fees.length < 2)}
                                                                                                                    onClick={() => {
                                                                                                                        remove(indexB);
                                                                                                                        formik.values.courseOptions[index].fees.splice(indexB, 1);
                                                                                                                    }}>-</button>
                                                                                                                <button type="button" className="plusMinusButton" disabled={(formik.values.courseOptions[index].fees.length >= 5) || (indexB !== formik.values.courseOptions[index].fees.length - 1)}
                                                                                                                    onClick={() => {
                                                                                                                        push(new Fees()); formik.values.courseOptions[index].fees.push({ feeDescription: "", feeAmount: "" })
                                                                                                                    }}>+</button>
                                                                                                            </Col>
                                                                                                        </Fragment>
                                                                                                    ))}
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                </Fragment>
                                                                                            )}
                                                                                        />
                                                                                    </Row>











                                                                                    <div className="form-group phase-action">
                                                                                        <button className="button-tertiary" onClick={async (e) => {
                                                                                            e.preventDefault();
                                                                                            removePhase(index)
                                                                                        }}>
                                                                                            <CloseButtonSvg width="10px" height="10px" fill="#475DA7" /> Remove option</button>
                                                                                    </div>
                                                                                </div>
                                                                            </SlideDown>
                                                                        </div>
                                                                    )
                                                                }
                                                                )}

                                                            <div className="main-footer">
                                                                <button type="button" className="button-secondary" onClick={() => { push(courseOptions2); formik.values.courseOptions.push(courseOptions2)}}>+ Add course option</button>
                                                            </div>{/* CLOSE FOOTER */}
                                                        </div>
                                                    )}
                                                />{/* CLOSE FIELD-ARRAY */}
                                            </div>{/* CLOSE MAIN-BODY */}



                                        </div>

                                        <div className="rectangle mt-2">
                                            <p className="black-20 margin-bottom-0 pad-bottom-8">Requirements and certifications</p>
                                        </div>

                                        <div className="rectangle pixelGapTop">
                                            <Row className="mt-2">
                                                <Col sm={12}>
                                                    <p className="gray800-14 margin-bottom-0 pad-bottom-4">Entry requirements (optional)</p>
                                                    <p className="gray700-13 margin-bottom-0">
                                                        Detail the relevant requirements an applicant must hold to apply for this course option.
                                                    </p>
                                                </Col>
                                                <Col sm={5}>
                                                    <p className="gray800-14 margin-bottom-0 pad-bottom-4">Entry level</p>
                                                    <p className="gray700-13 margin-bottom-0">E.g. PhD, Bachelor's with Honours, Bachelor's</p>
                                                </Col>
                                                <Col sm={7}>
                                                    <p className="gray800-14 margin-bottom-0 pad-bottom-4">Entry subject</p>
                                                    <p className="gray700-13 margin-bottom-0">E.g. Maths, Biology, Science</p>
                                                </Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <FieldArray
                                                    name="entry"
                                                    render={({ insert, remove, push }) => (
                                                        <Fragment>
                                                            {formik.values.entries.length > 0 &&
                                                            formik.values.entries.map((p, indexC) => (
                                                                <Fragment>
                                                                    <Col sm={5}>
                                                                        <div className="">
                                                                            <Form.Control id={`entries[${indexC}].level`} name={`entries[${indexC}].level`} type="text" className="smallFormInput addFormInput"
                                                                                onChange={formik.handleChange} value={formik.values.entries[indexC].level} onBlur={formik.handleBlur} />
                                                                        </div>
                                                                    </Col>
                                                                    <Col sm={5} style={{ paddingRight: "0px" }}>

                                                                        <div className="">
                                                                            <Form.Control id={`entries[${indexC}].subject`} name={`entries[${indexC}].subject`} type="text" className="smallFormInput addFormInput"
                                                                                onChange={formik.handleChange} value={formik.values.entries[indexC].subject} onBlur={formik.handleBlur} />
                                                                        </div>
                                                                    </Col>

                                                                    <Col style={{ paddingRight: "0px" }} sm={2} className="d-flex justify-content-center align-items-center setHeight">

                                                                        <button type="button" className="plusMinusButton" disabled={(formik.values.entries.length < 2)}
                                                                            onClick={() => {
                                                                                remove(indexC);
                                                                                formik.values.entries.splice(indexC, 1);
                                                                            }}>-</button>
                                                                        <button type="button" className="plusMinusButton" disabled={(formik.values.entries.length >= 5) || (indexC !== formik.values.entries.length - 1)}
                                                                            onClick={() => {
                                                                                push(new Entries()); formik.values.entries.push({ level: "", subject: "" })
                                                                            }}>+</button>
                                                                    </Col>
                                                                </Fragment>
                                                            ))}
                                                            



                                                            
                                                            
                                                            
                                                        </Fragment>
                                                    )}
                                                />
                                            </Row>

                                            <Form.Group>
                                                <p className="gray800-14 margin-bottom-0 pad-bottom-4">Restrictions (optional)</p>
                                                <p className="gray700-13 margin-bottom-0">E.g. Open/none, open to current students, open to employees, not open to visiting students</p>
                                                <Form.Control id="restrictions" name="restrictions" type="text" className="addFormInput" onChange={formik.handleChange} value={formik.values.restrictions} onBlur={formik.handleBlur} />                                            
                                            </Form.Group>
                                            
                                            <Form.Group>
                                                <p className="gray800-14 margin-bottom-0 pad-bottom-4">Award (optional)</p>
                                                <p className="gray700-13 margin-bottom-0">E.g. CPD, Fellowship, PhD, CPE, PGCert, PGDip, MSc, DPhil</p>
                                                <Typeahead
                                                    id="award"
                                                    labelKey="award"
                                                    allowNew
                                                    defaultSelected={formik.values.award}
                                                    multiple
                                                    options={props.combinedFeatures}
                                                    className="addFormInputTypeAhead"
                                                    onChange={(selected) => {
                                                        var tempSelected = [];
                                                        selected.forEach((selectedItem) => {
                                                            selectedItem.customOption === true ? tempSelected.push(selectedItem.award) : tempSelected.push(selectedItem);
                                                        })
                                                        formik.values.award = tempSelected;
                                                    }}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <p className="gray800-14 margin-bottom-0 pad-bottom-4">Competency framework (optional)</p>
                                                <p className="gray700-13 margin-bottom-0">E.g. </p>
                                                <Form.Control id="competencyFramework" name="competencyFramework" type="text" className="addFormInput" onChange={formik.handleChange} value={formik.values.competencyFramework} onBlur={formik.handleBlur} />
                                            </Form.Group>

                                            <Form.Group>
                                                <p className="gray800-14 margin-bottom-0 pad-bottom-4">National priority areas (optional)</p>
                                                <p className="gray700-13 margin-bottom-0">E.g. </p>
                                                <Form.Control id="nationalPriority" name="nationalPriority" type="text" className="addFormInput" onChange={formik.handleChange} value={formik.values.nationalPriority} onBlur={formik.handleBlur} />
                                            </Form.Group>                             
                                        </div>

                                        <div className="rectangle mt-2">
                                            <span className="black-20">Related resources</span><span className="gray800-14"> (optional)</span>
                                            <br />
                                            <span className="gray800-14">Show relationships to papers, projects, datasets, tools and courses. Resources must be added to the Gateway first.</span>
                                        </div>

                                        {props.relatedObjects.length === 0 ? '' :
                                            <div className="rectangle">
                                                {props.relatedObjects.map((object) => {
                                                    return (
                                                        <RelatedObject showRelationshipQuestion={true} objectId={object.objectId} doRemoveObject={props.doRemoveObject} doUpdateReason={updateReason} reason={object.reason} didDelete={props.didDelete} updateDeleteFlag={props.updateDeleteFlag} />
                                                    )
                                                })}
                                            </div>}

                                        <div className="rectangle flexCenter pixelGapTop">
                                            <Row>
                                                <Col sm={1} lg={1} />
                                                <Col sm={10} lg={10}>
                                                    <RelatedResources ref={relatedResourcesRef} searchString={props.searchString} doSearchMethod={props.doSearchMethod} doUpdateSearchString={props.doUpdateSearchString} userState={props.userState} datasetData={props.datasetData} toolData={props.toolData} projectData={props.projectData} paperData={props.paperData} personData={props.personData} summary={props.summary} doAddToTempRelatedObjects={props.doAddToTempRelatedObjects} tempRelatedObjectIds={props.tempRelatedObjectIds} relatedObjects={props.relatedObjects} doClearRelatedObjects={props.doClearRelatedObjects} doAddToRelatedObjects={props.doAddToRelatedObjects} />
                                                </Col>
                                                <Col sm={1} lg={10} />
                                            </Row>
                                        </div>

                                        <ActionBar userState={props.userState}>
                                            <a style={{ cursor: 'pointer' }} href={'/account?tab=tools'}>
                                                <Button variant="medium" className="cancelButton dark-14 mr-2" >
                                                    Cancel
                                                </Button>
                                            </a>
                                            <Button onClick={() => relatedResourcesRef.current.showModal()} variant='white' className="techDetailButton mr-2">
                                                + Add resource
                                            </Button>
                                            <Button variant="primary" className="publishButton white-14-semibold mr-2" type="submit" >
                                                {props.isEdit ? 'Update' : 'Publish'}
                                            </Button>
                                        </ActionBar>
                                    </Form>
                                </Col>
                                <Col sm={1} lg={10} />
                            </Row>
                            <Row>
                                <span className="formBottomGap"></span>
                            </Row>
                        </div>
                    );
                }}
            />
        </div>
    )
};

export default AddEditCourseForm;