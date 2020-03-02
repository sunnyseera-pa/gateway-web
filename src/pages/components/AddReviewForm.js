import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Form, { FormRow } from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ErrorMessage } from 'formik';
import { Dropdown } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Rating from 'react-rating';
import { ReactComponent as EmptyStarIconSvg} from '../../images/starempty.svg';
import { ReactComponent as FullStarIconSvg} from '../../images/star.svg';

var baseURL = window.location.href;

if (!baseURL.includes('localhost')) {
    var rx = /^([http|https]+\:\/\/[a-z]+)([^/]*)/;
    var arr = rx.exec(baseURL);
    if (arr.length > 0) {
        //add -api to the sub domain for API requests
        baseURL = arr[1]+'-api'+arr[2]
    }

} else {
    baseURL = 'http://localhost:3001'
}

const AddReviewForm = () => { 
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
      initialValues: {
        // data: [],
        id: null, //passed in like in edit tool
        type: 'tool',
        updatedon: null, //passed in like in edit tool
        name: '', //passed in like in edit tool
        link: '',   //passed in like in edit tool
        categories: {       //passed in like in edit tool
            category: '',
            programmingLanguage: [],
            programmingLanguageVersion: ''
        },
        rating: null,
        realtedToProject: false,
        projectName: '',
        review: ''
      },

      validationSchema: Yup.object({
        projectName: Yup.string(),
        review: Yup.string()
      }),

    //   validate,

      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
        alert("Form submitted");
        console.log('submitting', values); 
        axios.post(baseURL + '/api/mytools/add', values)
        }
    });

    return (
        <div>
            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <div className="Rectangle">
                        <p className="Black-20px">Add a review</p>
                        <p className="Gray800-14px">Reviews help others understand if this tool could be useful to them.</p>
                    </div>
                </Col>
                <Col sm={1} lg={10} />
            </Row>

            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                        <Form onSubmit={formik.handleSubmit}>
                            <div className="Rectangle">

                        <Form.Label className="Gray800-14px">Your score</Form.Label>
                        <Form.Group className="mb-2">
                            <Rating emptySymbol={<EmptyStarIconSvg />} fullSymbol={<FullStarIconSvg />} placeholderSymbol={<FullStarIconSvg />} placeholderRating={4.3} />    
                        </Form.Group>

                        <Form.Label className="Gray800-14px">Is this review related to a specific project?</Form.Label>
                        <Form.Group className="mb-2 mt-2" style={{display: "flex"}}>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="radio"
                                        label="Yes"
                                        className="ml-5"
                                        // name="formHorizontalRadios"
                                        // id="formHorizontalRadios1"
                                        // checked={this.props.typeString === 'all' ? true: false}
                                        // value="all"
                                        // onChange={this.changeFilter}
                                    />
                                </Col>
                                <Col className="ml-5">
                                    <Form.Check
                                        type="radio"
                                        label="No"
                                        className="ml-2"
                                        // name="formHorizontalRadios"
                                        // id="formHorizontalRadios1"
                                        // checked={this.props.typeString === 'all' ? true: false}
                                        // value="all"
                                        // onChange={this.changeFilter}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Project name</Form.Label>
                                <Form.Control id="projectName" name="projectName" type="text" className={formik.touched.projectName && formik.errors.projectName ? "EmptyFormInput AddFormInput" : "AddFormInput" } onChange={formik.handleChange} value={formik.values.projectName} onBlur={formik.handleBlur}/>
                                {formik.touched.projectName && formik.errors.projectName ? <div className="ErrorMessages">{formik.errors.projectName}</div> : null}
                            </Form.Group>

                            {console.log("projectName:" + formik.values.projectName)}

                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Your review</Form.Label>
                                <Form.Text className="Gray700-13px">
                                What worked or didn't work for you? What was the context? Is there anything you wish you knew before you tried it?
                                </Form.Text>
                               <Form.Control as="textarea" id="review" name="review" type="text" className={formik.touched.review && formik.errors.review ? "EmptyFormInput AddFormInput DescriptionInput" : "AddFormInput DescriptionInput" } onChange={formik.handleChange} value={formik.values.review} onBlur={formik.handleBlur}/>
                               {formik.touched.review && formik.errors.review ? <div className="ErrorMessages">{formik.errors.review}</div> : null}
                            </Form.Group>

                            {console.log("review:" + formik.values.review)}
                            </div>

                            <Row className="mt-3">
                                <Col sm={11} lg={11}>
                                    <div className="ButtonHolder">
                                        <a style={{ cursor: 'pointer' }} href={'/'} >
                                            <Button variant="medium" className="CancelButton" >
                                                Cancel
                                            </Button>
                                        </a>
                                    </div>
                                </Col>
                                <Col sm={1} lg={1}>
                                    <Button variant="primary" type="submit" className="AddButton">
                                        Add this tool
                                    </Button>
                                </Col>
                            </Row>
                         </Form> 
                </Col>
                <Col sm={1} lg={10} />
            </Row>    
        </div>
    );
                                                
}


export default AddReviewForm;