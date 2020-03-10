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
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

var baseURL = require('./../../BaseURL').getURL();

    const AddToolForm = (props) => { 
        // Pass the useFormik() hook initial form values and a submit function that will
        // be called when the form is submitted
        const formik = useFormik({
          initialValues: {
            // data: props.data,
            type: 'tool',
            name: '',
            link: '',
            description: '',
            categories: {
                category: '',
                programmingLanguage: [],
                programmingLanguageVersion: ''
            },
            license: '',
            authors: [],
            tags: {
                features: [],
                topics: [],
            },
            // languageError: '',
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
                //  .required('This cannot be empty'),
            // authors: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
            authors: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.number()) : Yup.number())),
            features: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
            topics: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
          }),

          onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            // alert("Form submitted");
            // console.log('submitting', values); 
            axios.post(baseURL + '/api/mytools/add', values)
            // .catch((error) => {
            //     alert("Check form, fix and submit again");
            // })

            .then((res) => {
                window.location.href = window.location.search+'/tool/'+res.data.id+'/?toolAdded=true';
            });
            }
        });
        
        return (
            
            <div>
                <Row className="mt-2">
                    <Col sm={1} lg={1} />
                    <Col sm={10} lg={10}>
                        <div className="Rectangle">
                            <p className="Black-20px">Add a new tool or resource</p>
                            <p className="Gray800-14px">Tools can be anything you or someone else created or used during a research project</p>
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
                                    <Form.Label className="Gray800-14px">Name</Form.Label>
                                    <Form.Control id="name" name="name" type="text" className={formik.touched.name && formik.errors.name ? "EmptyFormInput AddFormInput" : "AddFormInput" } onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
                                    {formik.touched.name && formik.errors.name ? <div className="ErrorMessages">{formik.errors.name}</div> : null}
                                </Form.Group>

                                {console.log("name:" + formik.values.name)}
                                {console.log("nameAgain:" + props.data.name)}
                                {console.log('props.data: ' + props.data)}
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

                                {/* THIS IS WHAT WORKS FOR SELECTION FOR CATEGORY 
                                  <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Category</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                        Select from existing or enter a new one.
                                    </Form.Text>
                                    <Form.Control id="categories.category" name="categories.category" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.categories.category} onBlur={formik.handleBlur}/>
                                    <Typeahead
  
                                        id="categories.category"
                                        labelKey="categories.category"
                                        allowNew
                                        multiple
                                        options={props.combinedCategories}

                                        onChange={(selected) => {
                                            console.log("selected category: " + selected);
                                            formik.values.categories.category = selected[0];
                                        }}

                                    />
                                    {formik.touched.categories.category && formik.errors.categories.category ? <div className="ErrorMessages">{formik.errors.categories.category}</div> : null}
                                </Form.Group>    */}

                                
                                {/* TRY TO GET THIS TO WORK FOR SELECTION AND NEW FOR CATEGORY */}
                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Category</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                        Select from existing or enter a new one.
                                    </Form.Text>
                                    {/* <Form.Control id="categories.category" name="categories.category" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.categories.category} onBlur={formik.handleBlur}/> */}
                                    <Typeahead
  
                                        id="categories.category"
                                        labelKey="category"
                                        allowNew
                                        multiple
                                        options={props.combinedCategories}

                                        onChange = {(selected) => {
                                            var tempSelected = [];
                                            
                                            selected.map((selectedItem) => {
                                                selectedItem.customOption == true ? tempSelected.push(selectedItem.category) : tempSelected.push(selectedItem);
                                                console.log(selectedItem);
                                                
                                            } )
                                           
                                            formik.values.categories.category = tempSelected[0]; 
                                        }}    
                                    />
                                </Form.Group> 
                                
                                {console.log("cat: category:" + formik.values.categories.category)}

{/*                                 THIS IS WHAT WORKS FOR SELECTION FOR LANGAUGES
                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Programming language</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                        Select from existing or enter a new one. As many as you like.
                                    </Form.Text>
                                     <Typeahead
                                        // clearButton
                                        id="categories.programmingLanguage"
                                        labelKey="categories.programmingLanguage"
                                        allowNew
                                        multiple
                                        options={props.combinedLanguages}

                                        onChange = {(selected) => {
                                            console.log("selected language: " + JSON.stringify(selected));
                                            formik.values.categories.programmingLanguage = selected;

                                            
                                        }}
                                    />
                                </Form.Group>  */}



                                {/* TRY TO GET THIS TO WORK FOR SELECTION AND NEW FOR LANGAUGES */}
                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Programming language</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                        Select from existing or enter a new one. As many as you like.
                                    </Form.Text>
                                     <Typeahead
                                        // clearButton
                                        id="categories.programmingLanguage"
                                        labelKey="programmingLanguage"
                                        allowNew
                                        multiple
                                        options={props.combinedLanguages}

                                        onChange = {(selected) => {
                                            var tempSelected = [];
                                            
                                            selected.map((selectedItem) => {
                                                console.log('tempSelected' + tempSelected);
                                                console.log("selectedItem is: " + JSON.stringify(selectedItem));
                                                console.log("selected language: " + JSON.stringify(selectedItem.customOption));
                                                console.log("selected language: " + JSON.stringify(selectedItem.programmingLanguage));
                                                selectedItem.customOption == true ? tempSelected.push(selectedItem.programmingLanguage) : tempSelected.push(selectedItem);
                                                
                                            } )
                                           
                                            formik.values.categories.programmingLanguage = tempSelected; 
                                        }} 
                                    />
                                </Form.Group>  
                                
                                {console.log("count of programmingLanguage:" + formik.values.categories.programmingLanguage.length)}
                                {console.log("cat: programmingLanguage:" + formik.values.categories.programmingLanguage)}
                                {console.log("type: cat: programmingLanguage:" + typeof(formik.values.categories.programmingLanguage))}
                            

                                {formik.values.categories.programmingLanguage.length <= 0 || formik.values.categories.programmingLanguage == "Code-free"  ? '' :
                                    <Form.Group className="pb-2">
                                        <Form.Label className="Gray800-14px">Programming language version</Form.Label>
                                        <Form.Text className="Gray700-13px">
                                        i.e. 3.6.1
                                        </Form.Text>
                                        <Form.Control id="categories.programmingLanguageVersion" name="categories.programmingLanguageVersion" type="text" className="SmallFormInput AddFormInput" onChange={formik.handleChange} value={formik.values.categories.programmingLanguageVersion} onBlur={formik.handleBlur}/>
                                    </Form.Group>
                                 } 

                                {console.log("cat: programmingLanguageVersion:" + formik.values.categories.programmingLanguageVersion)}

                                {/* THIS IS WHAT WORKS FOR SELECTION FOR LICENSE
                                  <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">License</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                    Select from existing or enter a new one 
                                    </Form.Text>
                                    <Form.Control id="license" name="license" type="text" className="SmallFormInput AddFormInput" onChange={formik.handleChange} value={formik.values.license} onBlur={formik.handleBlur}/>
                                    <Typeahead
                                        id="license"
                                        labelKey="license"
                                        allowNew
                                        multiple
                                        options={props.combinedLicenses}
                                        className="SmallFormInput"  
                                        
                                        onChange={(selected) => {
                                            console.log("selected license: " + selected);
                                            formik.values.license = selected[0];
                                        }}

                                    />
                                </Form.Group> */}

                                
                                {/* TRY TO GET THIS TO WORK FOR SELECTION AND NEW FOR LICENSE */}
                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">License</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                    Select from existing or enter a new one 
                                    </Form.Text>
                                    {/* <Form.Control id="license" name="license" type="text" className="SmallFormInput AddFormInput" onChange={formik.handleChange} value={formik.values.license} onBlur={formik.handleBlur}/> */}
                                    <Typeahead
                                        id="license"
                                        labelKey="license"
                                        allowNew
                                        multiple
                                        options={props.combinedLicenses}
                                        className="SmallFormInput"

                                        onChange = {(selected) => {
                                            var tempSelected = [];
                                            
                                            selected.map((selectedItem) => {
                                                selectedItem.customOption == true ? tempSelected.push(selectedItem.license) : tempSelected.push(selectedItem);
                                                console.log(selectedItem);
                                                
                                            } )
                                           
                                            formik.values.license = tempSelected[0]; 
                                        }} 
                                    />
                                </Form.Group> 

                                {console.log("license here:" + formik.values.license)}

{/*                                 THIS IS WHAT WORKS FOR SELECTION FOR AUTHORS
                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Who created this tool or resource?</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                    Add any authors, including yourself if that's the case. Can be their username or website if you don't know the name.
                                    </Form.Text>
                                    <Form.Control id="authors" name="authors" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.authors} onBlur={formik.handleBlur}/>
                                    <Typeahead
                                        id="authors"
                                        labelKey="authors"
                                        allowNew
                                        multiple
                                        options={props.combinedUsers}

                                        onChange={(selected) => {
                                           
                                            console.log("selected author: " + selected);
                                            formik.values.authors = selected;
                                        }}
                                    />
                                </Form.Group> */}


                                {/* TRY TO GET THIS TO WORK FOR SELECTION AND NEW FOR AUTHORS */}
                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Who created this tool or resource?</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                    Add any authors, including yourself if that's the case. {/* Can be their username or website if you don't know the name. */}
                                    </Form.Text>
                                    {/* <Form.Control id="authors" name="authors" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.authors} onBlur={formik.handleBlur}/> */}
                                    <Typeahead
                                        id="authors"
                                        labelKey={authors => `${authors.name}`}
                                        defaultSelected={[{ id: props.userState[0].id, name: props.userState[0].name }]}
                                        multiple
                                        options={props.combinedUsers}
                                        onChange = {(selected) => {
                                            var tempSelected = [];
                                            
                                            selected.map((selectedItem) => {
                                                
                                                console.log("Here selectedItem is: " + JSON.stringify(selectedItem));
                                                console.log("Here selected language: " + JSON.stringify(selectedItem.customOption));
                                                console.log("Here selected language: " + JSON.stringify(selectedItem.authors));
                                                tempSelected.push(selectedItem.id);
                                                
                                            } )
                                            console.log('Here tempSelected ' + tempSelected);
                                            formik.values.authors = tempSelected; 
                                        }} 

                                    />
                                </Form.Group> 



                                {console.log("props.combinedUsers: " + props.combinedUsers)}
                                {console.log("authors:" + formik.values.authors)}


                                {/* THIS IS WHAT WORKS FOR SELECTION FOR FEATURES
                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Features</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                    Keywords that help people identify what this resource does. As many as you like. For instance: data analysis, random forest
                                    </Form.Text>
                                    <Form.Control id="tags.features" name="tags.features" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.tags.features} onBlur={formik.handleBlur}/>
                                    <Typeahead
                                        id="tags.features"
                                        labelKey="tags.features"
                                        allowNew
                                        multiple
                                        options={props.combinedFeatures}

                                        onChange={(selected) => {
                                            console.log("selected features: " + selected);
                                            formik.values.tags.features = selected;
                                        }}
                                    />
                                </Form.Group> */}

                                {/* TRY TO GET THIS TO WORK FOR SELECTION AND NEW FOR FEATURES */}
                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Features</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                    Keywords that help people identify what this resource does. As many as you like. For instance: data analysis, random forest
                                    </Form.Text>
                                    {/* <Form.Control id="tags.features" name="tags.features" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.tags.features} onBlur={formik.handleBlur}/> */}
                                    <Typeahead
                                        id="tags.features"
                                        labelKey="features"
                                        allowNew
                                        multiple
                                        options={props.combinedFeatures}

                                        onChange = {(selected) => {
                                            var tempSelected = [];
                                            
                                            selected.map((selectedItem) => {
                                                console.log('tempSelected' + tempSelected);
                                                console.log("selectedItem is: " + JSON.stringify(selectedItem));
                                                console.log("selected language: " + JSON.stringify(selectedItem.customOption));
                                                console.log("selected language: " + JSON.stringify(selectedItem.features));
                                                selectedItem.customOption == true ? tempSelected.push(selectedItem.features) : tempSelected.push(selectedItem);
                                                
                                            } )
                                           
                                            formik.values.tags.features = tempSelected; 
                                        }} 

                                    />
                                </Form.Group>  
                                

                                {console.log("t: features:" + formik.values.tags.features)}
                                {console.log("props.combinedFeatures" + props.combinedFeatures)}

{/*                                 THIS IS WHAT WORKS FOR SELECTION FOR TOPICS
                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Topics</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                    Keywords that help people identify any related fields. As many as you like. For instance: Biogenomics, Nutrition
                                    </Form.Text>
                                    <Form.Control id="tags.topics" name="tags.topics" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.tags.topics} onBlur={formik.handleBlur}/>
                            
                                    <Typeahead
                                        id="tags.topics"
                                        labelKey="tags.topics"
                                        allowNew
                                        multiple
                                        options={props.combinedTopic}

                                        onChange={(selected) => {
                                            console.log("selected topics: " + selected);
                                            formik.values.tags.topics = selected;
                                        }}
                                        
                                    />
                                </Form.Group> */}


                                {/* TRY TO GET THIS TO WORK FOR SELECTION AND NEW FOR TOPICS */}
                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Topics</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                    Keywords that help people identify any related fields. As many as you like. For instance: Biogenomics, Nutrition
                                    </Form.Text>
                                    {/* <Form.Control id="tags.topics" name="tags.topics" type="text" className="AddFormInput" onChange={formik.handleChange} value={formik.values.tags.topics} onBlur={formik.handleBlur}/> */}
                            
                                    <Typeahead
                                        id="tags.topics"
                                        labelKey="topics"
                                        allowNew
                                        multiple
                                        options={props.combinedTopic}

                                        onChange = {(selected) => {
                                            var tempSelected = [];
                                            
                                            selected.map((selectedItem) => {
                                                console.log('tempSelected' + tempSelected);
                                                console.log("selectedItem is: " + JSON.stringify(selectedItem));
                                                console.log("selected language: " + JSON.stringify(selectedItem.customOption));
                                                console.log("selected language: " + JSON.stringify(selectedItem.topics));
                                                selectedItem.customOption == true ? tempSelected.push(selectedItem.topics) : tempSelected.push(selectedItem);
                                                
                                            } )
                                           
                                            formik.values.tags.topics = tempSelected; 
                                        }} 

                                    />
                                </Form.Group>  

                                {console.log("t: topics:" + formik.values.tags.topics)}
                                {console.log("props.combinedTopic" + props.combinedTopic)}
                                </div>

                                <Row className="mt-3">
                                    <Col sm={9} lg={9}>
                                        <div className="ButtonHolder">
                                            <a style={{ cursor: 'pointer' }} href={'/'} >
                                                <Button variant="medium" className="CancelButton" >
                                                    Cancel
                                                </Button>
                                            </a>
                                        </div>
                                    </Col>
                                    <Col sm={2} lg={2} className="ml-5">
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


export default AddToolForm;
