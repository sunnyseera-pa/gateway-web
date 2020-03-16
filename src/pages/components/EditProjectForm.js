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

const EditProjectForm = (props) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            id: props.data.id,
            type: 'project',
            name: props.data.name,
            link: props.data.link,
            description: props.data.description,
            authors: props.data.authors,
            categories: {
                category: props.data.categories.category
            },
            tags: {
                topics: props.data.tags.topics
            },
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
            //alert(JSON.stringify(values, null, 2));
            axios.put(baseURL + '/api/mytools/edit', values)
                .then((res) => {
                    window.location.href = window.location.search + '/project/' + props.data.id + '/?projectEdited=true';
                });
        }
    });

    var listOfAuthors = [];
    props.data.authors.map((author) => { 
        props.combinedUsers.map((user) => { 
            if (user.id === author) {
                listOfAuthors.push({ id: user.id, name: user.name })
            }    
        });
    });

    return (

        <div>
            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <div className="Rectangle">
                        <p className="Black-20px">Edit a research project</p>
                    </div>
                </Col>
                <Col sm={1} lg={10} />
            </Row>

            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <Form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} autocomplete='off'>
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
                            {console.log('description: ' + formik.values.description)}

                            <Form.Group className="pb-2">
                                <Form.Label className="Gray800-14px">Authors</Form.Label>
                                <Form.Text className="Gray700-13px">
                                Add any authors or collaborators {/* Can be their username or website if you don't know the name. */}
                                </Form.Text>
                                <Typeahead
                                    labelKey={authors => `${authors.name}`}
                                    defaultSelected={listOfAuthors}
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
                            {console.log('authors: ' + formik.values.authors)}


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
                                    defaultSelected={[props.data.categories.category]}
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
                            {console.log('category: ' + formik.values.categories.category)}



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
                                    defaultSelected={props.data.tags.topics}
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
                        </div>

                        <Row className="mt-3">
                            <Col sm={9} lg={9}>
                                <div className="ButtonHolder">
                                    {/* <a style={{ cursor: 'pointer' }} href={'/account?tab=tools'} > */}
                                        <Button variant="medium" className="CancelButton" >
                                            Cancel
                                        </Button>
                                    {/* </a> */}
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


export default EditProjectForm;