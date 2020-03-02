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
import Autosuggest from 'react-autosuggest';

var baseURL = require('./../../BaseURL').getURL();

const EditToolForm = (props) => { 

        // Pass the useFormik() hook initial form values and a submit function that will
        // be called when the form is submitted
        const formik = useFormik({
          initialValues: {
            // data: [],
            id: props.data.id,
            type: 'tool',
            name: props.data.name,
            link: props.data.link,
            description: props.data.description,
            categories: {
                category: props.data.categories.category,
                programmingLanguage: props.data.categories.programmingLanguage,
                programmingLanguageVersion: props.data.categories.programmingLanguageVersion
            },
            license: props.data.license,
            authors: props.data.authors,
            tags: {
                features: props.data.tags.features,
                topics: props.data.tags.topics
            }
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
                            programmingLanguage: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
                            programmingLanguageVersion: Yup.string()
            }), 
            license: Yup.string(),
            authors: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
            features: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
            topics: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
          }),

        //   validate,

          onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            alert("Form submitted");
            console.log('submitting', values); 
            axios.put(baseURL + '/api/mytools/edit', values) 
            }
        });

        
        return (
            <div>
                <Row className="mt-2">
                    <Col sm={1} lg={1} />
                    <Col sm={10} lg={10}>
                        <div className="Rectangle">
                            <p className="Black-20px">Edit a tool or resource</p>
                            {/* <p className="Gray800-14px">Tools can be anything you or someone else created or used during a research project</p> */}
                        </div>
                    </Col>
                    <Col sm={1} lg={10} />
                </Row>

                <Row className="mt-2">
                    <Col sm={1} lg={1} />
                    <Col sm={10} lg={10}>
                            <Form onSubmit={formik.handleSubmit}>
                                <div className="Rectangle">

                                {console.log('id is:' + props.data.id)}

                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Name</Form.Label>
                                    <Form.Control id="name" name="name" type="text" className={formik.touched.name && formik.errors.name ? "EmptyFormInput AddFormInput" : "AddFormInput" } onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
                                    {formik.touched.name && formik.errors.name ? <div className="ErrorMessages">{formik.errors.name}</div> : null}
                                </Form.Group>

                                {console.log("name:" + formik.values.name)}
                                {console.log("length of name:" + formik.values.name.length)}

                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Link</Form.Label>
                                    <Form.Control id="link" name="link" type="text" className={formik.touched.link && formik.errors.link ? "EmptyFormInput AddFormInput" : "AddFormInput" } onChange={formik.handleChange} value={formik.values.link} onBlur={formik.handleBlur} />
                                    {formik.touched.link && formik.errors.link ? <div className="ErrorMessages">{formik.errors.link}</div> : null}
                                </Form.Group>

                                {console.log("link:" + formik.values.link)}

                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Description</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                        Up to 5,000 characters
                                    </Form.Text>
   {/*                                   <Form.Control type="text" className="AddFormInput DescriptionInput" value={this.state.description} onChange={this.handleDescriptionChange}  onChange={this.checkMaxDescription} onBlur={this.checkIfEmpty}/>  */}
                                   <Form.Control as="textarea" id="description" name="description" type="text" className={formik.touched.description && formik.errors.description ? "EmptyFormInput AddFormInput DescriptionInput" : "AddFormInput DescriptionInput" } onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur}/>
                                   {formik.touched.description && formik.errors.description ? <div className="ErrorMessages">{formik.errors.description}</div> : null}
                                </Form.Group>

                                {console.log("description:" + formik.values.description)}

                                  <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Category</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                        Select from existing or enter a new one.
                                    </Form.Text>
                                    <Form.Control id="categories.category" name="categories.category" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.categories.category} onBlur={formik.handleBlur}/>
                                </Form.Group>   

                                {console.log("cat: category:" + formik.values.categories.category)}

                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Programming language</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                        Select from existing or enter a new one. As many as you like.
                                    </Form.Text>
                                    <Form.Control id="categories.programmingLanguage" name="categories.programmingLanguage" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.categories.programmingLanguage} onBlur={formik.handleBlur} />
                                </Form.Group> 

                                {console.log("cat: programmingLanguage:" + formik.values.categories.programmingLanguage)}

                                   <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Programming language version</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                    i.e. 3.6.1
                                    </Form.Text>
                                    <Form.Control id="categories.programmingLanguageVersion" name="categories.programmingLanguageVersion" type="text" className="SmallFormInput AddFormInput" onChange={formik.handleChange} value={formik.values.categories.programmingLanguageVersion} onBlur={formik.handleBlur}/>
                                </Form.Group>

                                {console.log("cat: programmingLanguageVersion:" + formik.values.categories.programmingLanguageVersion)}

                                  <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">License</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                    Select from existing or enter a new one 
                                    </Form.Text>
                                    <Form.Control id="license" name="license" type="text" className="SmallFormInput AddFormInput" onChange={formik.handleChange} value={formik.values.license} onBlur={formik.handleBlur}/>
                                </Form.Group>

                                {console.log("license:" + formik.values.license)}

                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Who created this tool or resource?</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                    Add any authors, including yourself if that's the case. Can be their username or website if you don't know the name.
                                    </Form.Text>
                                    <Form.Control id="authors" name="authors" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.authors} onBlur={formik.handleBlur}/>
                                </Form.Group>

                                {console.log("authors:" + formik.values.authors)}

                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Features</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                    Keywords that help people identify what this resource does. As many as you like. For instance: data analysis, random forest
                                    </Form.Text>
                                    <Form.Control id="tags.features" name="tags.features" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.tags.features} onBlur={formik.handleBlur}/>
                                </Form.Group>

                                {console.log("t: features:" + formik.values.tags.features)}

                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Topics</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                    Keywords that help people identify any related fields. As many as you like. For instance: Biogenomics, Nutrition
                                    </Form.Text>
                                    <Form.Control id="tags.topics" name="tags.topics" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.tags.topics} onBlur={formik.handleBlur}/>
                                </Form.Group>  

                                {console.log("t: topics:" + formik.values.topics)}
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
                                            Edit this tool
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


export default EditToolForm;