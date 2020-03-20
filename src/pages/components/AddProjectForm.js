import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

var baseURL = require('./../../BaseURL').getURL();

const AddProjectForm = (props) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            type: 'project',
            name: '',
            link: '',
            description: '',
            // authors: [],
            authors: [props.userState[0].id],
            categories: {
                category: ''
            },
            tags: {
                topics: [],
            },
            toolids: []
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .required('This cannot be empty'),
            link: Yup.string()
                .required('This cannot be empty'),
            description: Yup.string()
                .max(5000, 'Maximum of 5,000 characters')
                .required('This cannot be empty'),
            categories: Yup.object().shape({
                category: Yup.string(),
            }),
            authors: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.number()) : Yup.number())),
            topics: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
        }),

        onSubmit: values => {
            //add via same post as add tool form - type set as 'project'
            axios.post(baseURL + '/api/mytools/add', values)
                .then((res) => {
                    window.location.href = window.location.search + '/project/' + res.data.id + '/?projectAdded=true';
                });
        }
    });

    return (

        <div>
            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <div className="Rectangle">
                        <p className="Black-20px">Add a new research project</p>
                        <p className="Gray800-14px">Projects help others understand the context in which a tool or resource was used</p>
                    </div>
                </Col>
                <Col sm={1} lg={10} />
            </Row>

            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <Form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} autoComplete='off'>
                        <div className="Rectangle">
                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Project name</Form.Label>
                                <Form.Control id="name" name="name" type="text" className={formik.touched.name && formik.errors.name ? "EmptyFormInput AddFormInput" : "AddFormInput"} onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                                {formik.touched.name && formik.errors.name ? <div className="ErrorMessages">{formik.errors.name}</div> : null}
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Link</Form.Label>
                                <Form.Control id="link" name="link" type="text" className={formik.touched.link && formik.errors.link ? "EmptyFormInput AddFormInput" : "AddFormInput"} onChange={formik.handleChange} value={formik.values.link} onBlur={formik.handleBlur} />
                                {formik.touched.link && formik.errors.link ? <div className="ErrorMessages">{formik.errors.link}</div> : null}
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Description</Form.Label>
                                <Form.Text className="Gray700-13px">
                                    Up to 5,000 characters
                                    </Form.Text>
                                <Form.Control as="textarea" id="description" name="description" type="text" className={formik.touched.description && formik.errors.description ? "EmptyFormInput AddFormInput DescriptionInput" : "AddFormInput DescriptionInput"} onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
                                {formik.touched.description && formik.errors.description ? <div className="ErrorMessages">{formik.errors.description}</div> : null}
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Authors</Form.Label>
                                <Form.Text className="Gray700-13px">
                                    Add any authors or collaborators {/* Can be their username or website if you don't know the name. */}
                                </Form.Text>
                                <Typeahead
                                    id="authors"
                                    labelKey={authors => `${authors.name}`}
                                    defaultSelected={[{ id: props.userState[0].id, name: props.userState[0].name }]}
                                    multiple
                                    options={props.combinedUsers}
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.map((selectedItem) => {
                                            tempSelected.push(selectedItem.id);
                                        })
                                        formik.values.authors = tempSelected;
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Category</Form.Label>
                                <Form.Text className="Gray700-13px">
                                    Select from existing or enter a new one.
                                    </Form.Text>
                                <Typeahead
                                    id="categories.category"
                                    labelKey="category"
                                    allowNew
                                    // multiple
                                    options={props.combinedCategories}
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.map((selectedItem) => {
                                            selectedItem.customOption === true ? tempSelected.push(selectedItem.category) : tempSelected.push(selectedItem);
                                        })
                                        formik.values.categories.category = tempSelected[0];
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Keywords</Form.Label>
                                <Form.Text className="Gray700-13px">
                                    Words that help people identify any related fields or key concepts. As many as you like.
                                    </Form.Text>

                                <Typeahead
                                    id="tags.topics"
                                    labelKey="topics"
                                    allowNew
                                    multiple
                                    options={props.combinedTopic}
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.map((selectedItem) => {
                                            selectedItem.customOption === true ? tempSelected.push(selectedItem.topics) : tempSelected.push(selectedItem);

                                        })
                                        formik.values.tags.topics = tempSelected;
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Tools used in this project</Form.Label>
                                <Form.Text className="Gray700-13px">
                                    Tools must be added to our portal first
                                    </Form.Text>

                                <Typeahead
                                    id="tools"
                                    labelKey={tools => `${tools.name}`}
                                    multiple
                                    options={props.combinedTools}
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.map((selectedItem) => {
                                            tempSelected.push(selectedItem.id);
                                        })
                                        formik.values.toolids = tempSelected;
                                    }}
                                />
                            </Form.Group>
                        </div>

                        <Row className="mt-3">
                            <Col sm={9} lg={9}>
                                <div className="ButtonHolder">
                                    <a style={{ cursor: 'pointer' }} href={'/account?tab=projects'} >
                                        <Button variant="medium" className="CancelButton" >
                                            Cancel
                                        </Button>
                                    </a>
                                </div>
                            </Col>
                            <Col sm={2} lg={2} className="ml-5">
                                <Button variant="primary" type="submit" className="AddButton">
                                    Add this project
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

export default AddProjectForm;