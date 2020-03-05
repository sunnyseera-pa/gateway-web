import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon";
import Button from 'react-bootstrap/Button';
import ToolsHeader from './ToolsHeader';
import ActiveTool from './ActiveTool';
import ArchivedTool from './ArchivedTool';
import PendingTools from './PendingTools';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'
import Form, { FormRow } from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';

var baseURL = require('./../../BaseURL').getURL();

const YourAccountForm = (props) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            firstname: props.data.firstname,
            lastname: props.data.lastname,
            email: props.data.email,
            bio: props.data.bio,
            link: props.data.link,
            orcid: props.data.orcid,
        },

        onSubmit: values => {
            //axios.post(baseURL + '/api/mytools/add', values) // Add API to update
            window.location.href = '/account?tab=youraccount&accountUpdated=true';
        }
    });

    

    return (

        <div>
            {props.isUpdated ? <Alert variant="success" className="mt-3">Done! Your account details have been updated</Alert> : ""}
                
            <Row className="mt-2">
                <Col>
                    <div className="Rectangle">
                        <p className="Black-20px">Add a new tool or resource</p>
                        <p className="Gray800-14px">Tools can be anything you or someone else created or used during a research project</p>
                    </div>
                </Col>
            </Row>
            <Form onSubmit={formik.handleSubmit}>
                <Row className="mt-2">
                    <Col>
                        <div className="Rectangle">
                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">First Name</Form.Label>
                                <Form.Control id="name" name="name" type="text" className="AddFormInput" value={formik.values.firstname} disabled />
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Surname</Form.Label>
                                <Form.Control id="name" name="name" type="text" className="AddFormInput" value={formik.values.lastname} disabled />
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Email</Form.Label>
                                <Form.Control id="name" name="name" type="text" className="AddFormInput" value={formik.values.email} disabled />
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <span className="Gray800-14px">Bio (optional)</span>
                                <br />
                                <span className="Gray700-13px">This can be the name of your institution or a short description of who you are</span>
                                <Form.Control id="name" name="name" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.bio} onBlur={formik.handleBlur} />
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <span className="Gray800-14px">Link (optional)</span>
                                <br />
                                <span className="Gray700-13px">Social media, research gate, anywhere that people can go to find out more about you</span>
                                <Form.Control id="name" name="name" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.link} onBlur={formik.handleBlur} />
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <span className="Gray800-14px">ORCID (optional)</span>
                                <br />
                                <span className="Gray700-13px">Your unique ORCID identifier</span>
                                <Form.Control id="name" name="name" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.orcid} onBlur={formik.handleBlur} />
                            </Form.Group>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col className="text-right">
                        <Button variant="primary" type="submit" className="AddButton">
                            Update Details
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );

}


export default YourAccountForm;