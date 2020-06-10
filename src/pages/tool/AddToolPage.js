import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typeahead } from 'react-bootstrap-typeahead';

import {Form, Button, Row, Col, Container} from 'react-bootstrap';

import SearchBar from '../commonComponents/SearchBar';
import Loading from '../commonComponents/Loading';
import RelatedResources from '../commonComponents/RelatedResources';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import SVGIcon from '../../images/SVGIcon';

import { Event, initGA } from '../../tracking';


var baseURL = require('../commonComponents/BaseURL').getURL();

class AddToolPage extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        data: [],
        combinedTopic: [],
        combinedFeatures: [],
        combinedLanguages: [],
        combinedCategories: [],
        combinedLicenses: [],
        combinedUsers: [],
        isLoading: true,
        userState: []
    };

    async componentDidMount() {
        initGA('UA-166025838-1');
        await Promise.all([
            this.doGetTopicsCall(),
            this.doGetFeaturesCall(),
            this.doGetLanguagesCall(),
            this.doGetCategoriesCall(),
            this.doGetLicensesCall(),
            this.doGetUsersCall()
        ]);
        this.setState({ isLoading: false });
    }

    doGetTopicsCall() {
        return new Promise((resolve, reject) => {
            axios.get(baseURL + '/api/v1/search/filter/topic/tool')
                .then((res) => {
                    var tempTopicArray = ["Blood", "Cancer and neoplasms", "Cardiovascular", "Congenital disorders", "Ear", "Eye", "Infection", "Inflammatory and immune system", "Injuries and accidents", "Mental health", "Metabolic and Endocrine", "Musculoskeletal", "Neurological", "Oral and Gastrointestinal", "Renal and Urogenital", "Reproductive health and childbirth", "Respiratory", "Skin", "Stroke"]

                    res.data.data.forEach((to) => {
                        if (!tempTopicArray.includes(to) && to !== '') {
                            tempTopicArray.push(to);
                        }
                    });

                    this.setState({ combinedTopic: tempTopicArray.sort(function (a, b) { return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0; }) });
                    resolve();
                });
        });
    }

    doGetFeaturesCall() {
        return new Promise((resolve, reject) => {
            axios.get(baseURL + '/api/v1/search/filter/feature/tool')
                .then((res) => {
                    var tempFeaturesArray = ["Arbitrage", "Association Rules", "Attribution Modeling", "Bayesian Statistics", "Clustering", "Collaborative Filtering", "Confidence Interval", "Cross-Validation", "Decision Trees", "Deep Learning", "Density Estimation", "Ensembles", "Experimental Design", "Feature Selection", "Game Theory", "Geospatial Modeling", "Graphs", "Imputation", "Indexation / Cataloguing", "Jackknife Regression", "Lift Modeling", "Linear Regression", "Linkage Analysis", "Logistic Regression", "Model Fitting", "Monte-Carlo Simulation", "Naive Bayes", "Nearest Neighbors - (k-NN)", "Neural Networks", "Pattern Recognition", "Predictive Modeling", "Principal Component Analysis - (PCA)", "Random Numbers", "Recommendation Engine", "Relevancy Algorithm", "Rule System", "Scoring Engine", "Search Engine", "Segmentation", "Supervised Learning", "Support Vector Machine - (SVM)", "Survival Analysis", "Test of Hypotheses", "Time Series", "Yield Optimization"]

                    res.data.data.forEach((fe) => {
                        if (!tempFeaturesArray.includes(fe) && fe !== '') {
                            tempFeaturesArray.push(fe);
                        }
                    });

                    this.setState({ combinedFeatures: tempFeaturesArray.sort(function (a, b) { return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0; }) });
                    resolve();
                });
        });
    }

    doGetLanguagesCall() {
        return new Promise((resolve, reject) => {
            axios.get(baseURL + '/api/v1/search/filter/language/tool')
                .then((res) => {
                    var tempLanguagesArray = ["No coding required", ".net", "AJAX", "ASP.NET", "C", "C#", "C++", "CSS", "Django", "HTML", "Java", "Javascript", "jQuery", "JSON", "Matlab", "MySQL", "Node.js", "Objective C", "PHP", "Python", "R", "React JS", "Regex", "Ruby", "Ruby on Rails", "SQL", "SQL server", "Swift", "XML"]

                    res.data.data.forEach((la) => {
                        if (!tempLanguagesArray.includes(la) && la !== '') {
                            tempLanguagesArray.push(la);
                        }
                    });

                    this.setState({ combinedLanguages: tempLanguagesArray.sort(function (a, b) { return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0; }) });
                    resolve();
                });
        });
    }

    doGetCategoriesCall() {
        return new Promise((resolve, reject) => {
            axios.get(baseURL + '/api/v1/search/filter/category/tool')
                .then((res) => {
                    var tempCategoriesArray = ["API", "Code snippet", "Container image", "Dashboard", "Developer stack", "Directory", "Docker app", "Kubernetes app", "Library", "Notebook", "Package", "Platform", "Repository", "Service", "Software", "Virtual machine", "Web application"]

                    res.data.data.forEach((ca) => {
                        if (!tempCategoriesArray.includes(ca) && ca !== '') {
                            tempCategoriesArray.push(ca);
                        }
                    });

                    this.setState({ combinedCategories: tempCategoriesArray.sort(function (a, b) { return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0; }) });
                    resolve();
                });
        });
    }

    doGetLicensesCall() {
        return new Promise((resolve, reject) => {
            axios.get(baseURL + '/api/v1/search/filter/license/tool')
                .then((res) => {
                    var tempLicensesArray = ["Apache License 2.0", "BSD 3-Clause \"New\" or \"Revised\" license", "BSD 2-Clause \"Simplified\" or \"FreeBSD\" license", "GNU General Public License (GPL)", "GNU Library or \"Lesser\" General Public License (LGPL)", "MIT license", "Mozilla Public License 2.0", "Common Development and Distribution License", "Eclipse Public License version 2.0"]

                    res.data.data.forEach((li) => {
                        if (!tempLicensesArray.includes(li) && li !== '') {
                            tempLicensesArray.push(li);
                        }
                    });

                    this.setState({ combinedLicenses: tempLicensesArray.sort(function (a, b) { return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0; }) });
                    resolve();
                });
        });
    }

    doGetUsersCall() {
        return new Promise((resolve, reject) => {
            axios.get(baseURL + '/api/v1/users')
                .then((res) => {
                    this.setState({ combinedUsers: res.data.data });
                    resolve();
                });
        });
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
            if (!!this.state.searchString) {
                window.location.href = window.location.search + "/search?search=" + this.state.searchString;
            }
        }
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
    }

    render() {
        const { data, combinedTopic, combinedFeatures, combinedLanguages, combinedCategories, combinedLicenses, combinedUsers, isLoading, userState } = this.state;


        if (isLoading) {
            return <Container><Loading /></Container>;
        }

        return (
            <div>
                <SearchBar doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
                <Container>
                    <AddToolForm data={data} combinedTopic={combinedTopic} combinedFeatures={combinedFeatures} combinedLanguages={combinedLanguages} combinedCategories={combinedCategories} combinedLicenses={combinedLicenses} combinedUsers={combinedUsers} userState={userState} />
                </Container>
            </div>
        );
    }

}

const AddToolForm = (props) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
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
            authors: [props.userState[0].id],
            tags: {
                features: [],
                topics: [],
            },
        },

        validationSchema: Yup.object({
            name: Yup.string()
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
            authors: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.number()) : Yup.number())),
            features: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
            topics: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
        }),

        onSubmit: values => {
            values.toolCreator = props.userState[0];
            axios.post(baseURL + '/api/v1/mytools/add', values)
                .then((res) => {
                    window.location.href = window.location.search + '/tool/' + res.data.id + '/?toolAdded=true';
                });
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

    return (

        <div>
            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <div className="Rectangle">
                        <Row>
                            <Col sm={10} lg={10}>
                             <p className="Black-20px">Add a new tool or resource</p>
                            </Col>
                            <Col sm={2} lg={2}>
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

            <Row className="mt-2">
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
                                <Form.Control id="link" name="link" type="text" className={formik.touched.link && formik.errors.link ? "EmptyFormInput AddFormInput" : "AddFormInput"} onChange={formik.handleChange} value={formik.values.link} onBlur={formik.handleBlur} />
                                {formik.touched.link && formik.errors.link ? <div className="ErrorMessages">{formik.errors.link}</div> : null}
                            </Form.Group>

                            <Form.Group>
                                <span className="Gray800-14px">Description</span>
                                <br />
                                <span className="Gray700-13px">
                                    Up to 5,000 characters
                                </span>
                                <Form.Control as="textarea" id="description" name="description" type="text" className={formik.touched.description && formik.errors.description ? "EmptyFormInput AddFormInput DescriptionInput" : "AddFormInput DescriptionInput"} onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
                                {formik.touched.description && formik.errors.description ? <div className="ErrorMessages">{formik.errors.description}</div> : null}
                            </Form.Group>

                            <Form.Group>
                                <span className="Gray800-14px">Category</span>
                                <br />
                                <span className="Gray700-13px">
                                    Select from existing or enter a new one.
                                </span>
                                <Typeahead
                                    id="categories.category"
                                    labelKey="category"
                                    allowNew
                                    options={props.combinedCategories}
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.forEach((selectedItem) => {
                                            selectedItem.customOption === true ? tempSelected.push(selectedItem.category) : tempSelected.push(selectedItem);
                                        })
                                        formik.values.categories.category = tempSelected[0];
                                    }}
                                />
                            </Form.Group>

                            <Form.Group>
                                <span className="Gray800-14px">Programming language</span>
                                <br />
                                <span className="Gray700-13px">
                                    Select from existing or enter a new one. As many as you like.
                                </span>
                                <Typeahead
                                    id="categories.programmingLanguage"
                                    labelKey="programmingLanguage"
                                    allowNew
                                    multiple
                                    options={props.combinedLanguages}
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.forEach((selectedItem) => {
                                            selectedItem.customOption === true ? tempSelected.push(selectedItem.programmingLanguage) : tempSelected.push(selectedItem);

                                        })
                                        formik.values.categories.programmingLanguage = tempSelected;
                                    }}
                                />
                            </Form.Group>

                            {formik.values.categories.programmingLanguage.length <= 0 || formik.values.categories.programmingLanguage === "Code-free" ? '' :
                                <Form.Group>
                                    <span className="Gray800-14px">Programming language version</span>
                                    <br />
                                    <span className="Gray700-13px">
                                        i.e. 3.6.1
                                    </span>
                                    <Form.Control id="categories.programmingLanguageVersion" name="categories.programmingLanguageVersion" type="text" className="SmallFormInput AddFormInput" onChange={formik.handleChange} value={formik.values.categories.programmingLanguageVersion} onBlur={formik.handleBlur} />
                                </Form.Group>
                            }

                            <Form.Group>
                                <span className="Gray800-14px">License</span>
                                <br />
                                <span className="Gray700-13px">
                                    Select from existing or enter a new one
                                </span>
                                <Typeahead
                                    id="license"
                                    labelKey="license"
                                    allowNew
                                    multiple
                                    options={props.combinedLicenses}
                                    className="SmallFormInput"
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
                                <span className="Gray800-14px">Uploaded by</span>
                                <br />
                                <span className="Gray700-13px">
                                    Add any authors or collaborators who have an account on this site
                                </span>
                                <Typeahead
                                    id="authors"
                                    labelKey={authors => `${authors.name}`}
                                    defaultSelected={listOfAuthors}
                                    multiple
                                    options={props.combinedUsers}
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.forEach((selectedItem) => {
                                            tempSelected.push(selectedItem.id);
                                        })
                                        formik.values.authors = tempSelected;
                                    }}
                                />
                            </Form.Group>

                            <Form.Group>
                                <span className="Gray800-14px">Features</span>
                                <br />
                                <span className="Gray700-13px">
                                    Keywords that help people identify what this resource does. As many as you like. For instance: data analysis, random forest
                                </span>
                                <Typeahead
                                    id="tags.features"
                                    labelKey="features"
                                    allowNew
                                    multiple
                                    options={props.combinedFeatures}
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
                                <span className="Gray800-14px">Topics</span>
                                <br />
                                <span className="Gray700-13px">
                                    Keywords that help people identify any related fields. As many as you like. For instance: Biogenomics, Nutrition
                                </span>

                                <Typeahead
                                    id="tags.topics"
                                    labelKey="topics"
                                    allowNew
                                    multiple
                                    options={props.combinedTopic}
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

                        <div className="Rectangle FlexCenter mt-1">
                            {/* <Button variant='white' href={''} target="_blank" className="TechDetailButton mr-2" >
                                + Add resources
                            </Button> */}
                            <RelatedResources />
                        </div>

                        <Row className="mt-3">
                            <Col xs={5} lg={9}/>
                            <Col xs={7} lg={3} className="text-right">
                                    <a style={{ cursor: 'pointer' }} href={'/account?tab=tools'}>
                                        <Button variant="medium" className="CancelButton Dark-14px mr-2" >
                                            Cancel
                                        </Button>
                                    </a>
                                <Button variant="primary" type="submit" onClick={() => Event("Buttons", "Click", "Add tool form submitted")}>
                                    Publish
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

export default AddToolPage;