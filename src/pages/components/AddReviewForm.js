import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import Rating from 'react-rating';
import { ReactComponent as EmptyStarIconSvg } from '../../images/starempty.svg';
import { ReactComponent as FullStarIconSvg } from '../../images/star.svg';

var baseURL = require('./../../BaseURL').getURL();

const AddReviewForm = (props) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            id: null, //passed in like in edit tool
            type: 'tool',
            reviews: [
                {
                    reviewID: null,
                    reviewerID: null,
                    rating: null,
                    project: false,
                    projectName: '',
                    review: '',
                }
            ],
        },

        onSubmit: values => {
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
                        <p className="Gray800-14px"> Reviews help others understand if this tool could be useful to them.</p>
                    </div>
                </Col>
                <Col sm={1} lg={10} />
            </Row>

            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <Form onSubmit={formik.handleSubmit} autocomplete='off'>
                        <div className="Rectangle">

                            <Form.Label className="Gray800-14px">Your score</Form.Label>
                            <Form.Group className="mb-2">
                                <Rating emptySymbol={<EmptyStarIconSvg />} fullSymbol={<FullStarIconSvg />} placeholderSymbol={<FullStarIconSvg />} placeholderRating={0} />
                            </Form.Group>

                            <Form.Label className="Gray800-14px">Is this review related to a specific project?</Form.Label>
                            <Form.Group className="mb-2 mt-2" style={{ display: "flex" }}>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="radio"
                                            label="Yes"
                                            className="ml-5"
                                        />
                                    </Col>
                                    <Col className="ml-5">
                                        <Form.Check
                                            type="radio"
                                            label="No"
                                            className="ml-2"
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Project name</Form.Label>
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Your review</Form.Label>
                                <Form.Text className="Gray700-13px">
                                    What worked or didn't work for you? What was the context? Is there anything you wish you knew before you tried it?
                                </Form.Text>
                            </Form.Group>

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