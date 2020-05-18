import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typeahead } from 'react-bootstrap-typeahead';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SearchBar from '../commonComponents/SearchBar';
import Loading from '../commonComponents/Loading'

import 'react-bootstrap-typeahead/css/Typeahead.css';

var baseURL = require('../commonComponents/BaseURL').getURL();

class EditProjectPage extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        data: [],
        combinedTopic: [],
        combinedCategories: [],
        combinedUsers: [],
        combinedTools: [],
        combinedDatasets: [],
        isLoading: true,
        userState: []
    };

    // on loading of tool detail page
    async componentDidMount() {
        await Promise.all([
            this.doGetTopicsCall(),
            this.doGetCategoriesCall(),
            this.doGetUsersCall(),
            this.doGetToolsCall(),
            this.doGetDatasetsCall()
        ]);

        this.getDataSearchFromDb();
    }

    getDataSearchFromDb = () => {
        //need to handle error if no id is found
        this.setState({ isLoading: true });
        axios.get(baseURL + '/api/v1/project/' + this.props.match.params.projectID)
            .then((res) => {
                this.setState({
                    data: res.data.data[0],
                    isLoading: false
                });
            });
    };

    doGetTopicsCall() {
        return new Promise((resolve, reject) => {
            axios.get(baseURL + '/api/v1/search/filter/topic/tool')
                .then((res) => {
                    this.setState({ combinedTopic: res.data.data });
                    resolve();
                });
        })
    }

    doGetCategoriesCall() {
        return new Promise((resolve, reject) => {
            axios.get(baseURL + '/api/v1/search/filter/category/tool')
                .then((res) => {
                    this.setState({ combinedCategories: res.data.data });
                    resolve();
                });
        })
    }

    doGetUsersCall() {
        return new Promise((resolve, reject) => {
            axios.get(baseURL + '/api/v1/users')
                .then((res) => {
                    this.setState({ combinedUsers: res.data.data });
                    resolve();
                });
        })
    }

    doGetToolsCall() {
        return new Promise((resolve, reject) => {
            axios.get(baseURL + '/api/v1/tools')
                .then((res) => {
                    this.setState({ combinedTools: res.data.data });
                    resolve();
                });
        })
    }

    doGetDatasetsCall() {
        return new Promise((resolve, reject) => {
            axios.get(baseURL + '/api/v1/datasets/filteredsearch?search=')
                .then((res) => {
                    this.setState({ combinedDatasets: res.data.data.results });
                    resolve();
                });
        })
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
            if (!!this.state.searchString) {
                window.location.href = window.location.search + "/search?search=" + this.state.searchString + '&type=all';
            }
        }
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
    }

    render() {
        const { data, combinedTopic, combinedCategories, combinedUsers, combinedTools, combinedDatasets, isLoading, userState } = this.state;

        if (isLoading) {
            return <Container><Loading /></Container>;
        }

        return (
            <div>
                <SearchBar doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
                <Container>
                    <EditProjectForm data={data} combinedTopic={combinedTopic} combinedCategories={combinedCategories} combinedUsers={combinedUsers} userState={userState} combinedTools={combinedTools} combinedDatasets={combinedDatasets} />
                </Container>
            </div>
        );
    }

}

const EditProjectForm = (props) => {
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
            toolids: props.data.toolids,
            datasetids: props.data.datasetids
        },

        validationSchema: Yup.object({
            name: Yup.string()
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
            axios.put(baseURL + '/api/v1/mytools/edit', values)
                .then((res) => {
                    window.location.href = window.location.search + '/project/' + props.data.id + '/?projectEdited=true';
                });
        }
    });

    var listOfAuthors = [];
    props.data.authors.forEach((author) => {
        props.combinedUsers.forEach((user) => {
            if (user.id === author) {
                if (props.userState[0].id === user.id) {
                    listOfAuthors.push({ id: user.id, name: user.name + " (You)" })
                    if (!user.name.includes('(You)')) {
                        user.name=user.name+" (You)";
                    }
                }
                else {
                    listOfAuthors.push({ id: user.id, name: user.name })
                }
            }
        });
    });

    var listOfTools = [];
    props.data.toolids.forEach((tools) => {
        props.combinedTools.forEach((tool) => {
            if (tool.id === tools) {
                listOfTools.push({ id: tool.id, name: tool.name })
            }
        });
    });

    var listOfDatasets = [];
    props.data.datasetids.forEach((datasets) => {
        props.combinedDatasets.forEach((dataset) => {
            if (dataset.id === datasets) {
                listOfDatasets.push({ id: dataset.id, title: dataset.title })
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
                            <Form.Group>
                                <span className="Gray800-14px">Project name</span>
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
                                <span className="Gray800-14px">Uploaded by</span>
                                <br />
                                <span className="Gray700-13px">
                                    Add any authors or collaborators who have an account on this site
                                </span>
                                <Typeahead
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
                                <span className="Gray800-14px">Category</span>
                                <br />
                                <span className="Gray700-13px">
                                    Select from existing or enter a new one.
                                  </span>
                                <Typeahead
                                    id="categories.category"
                                    labelKey="category"
                                    allowNew
                                    defaultSelected={[props.data.categories.category]}
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
                                <span className="Gray800-14px">Keywords</span>
                                <br />
                                <span className="Gray700-13px">
                                    Words that help people identify any related fields or key concepts. As many as you like.
                                </span>

                                <Typeahead
                                    id="tags.topics"
                                    labelKey="topics"
                                    allowNew
                                    multiple
                                    defaultSelected={props.data.tags.topics}
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

                            <Form.Group>
                                <span className="Gray800-14px">Tools used in this project</span>
                                <br />
                                <span className="Gray700-13px">
                                    Tools must be added to our portal first
                                </span>
                                <Typeahead
                                    labelKey={tools => `${tools.name}`}
                                    defaultSelected={listOfTools}
                                    multiple
                                    options={props.combinedTools}
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.forEach((selectedItem) => {
                                            tempSelected.push(selectedItem.id);
                                        })
                                        formik.values.toolids = tempSelected;
                                    }}
                                />
                            </Form.Group>

                            <Form.Group>
                                <span className="Gray800-14px">Datasets used in this project</span>
                                <Typeahead
                                    labelKey={datasets => `${datasets.title}`}
                                    defaultSelected={listOfDatasets}
                                    multiple
                                    options={props.combinedDatasets}
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.forEach((selectedItem) => {
                                            tempSelected.push(selectedItem.id);
                                        })
                                        formik.values.datasetids = tempSelected;
                                    }}
                                />
                            </Form.Group>
                        </div>

                        <Row className="mt-3">
                            <Col xs={5} lg={9}>
                                <div className="ButtonHolder">
                                    <a style={{ cursor: 'pointer' }} href={'/account?tab=projects'} >
                                        <Button variant="medium" className="CancelButton" >
                                            Cancel
                                      </Button>
                                    </a>
                                </div>
                            </Col>
                            <Col xs={7} lg={3} className="text-right">
                                <Button variant="primary" type="submit" className="AddButton">
                                    Edit this project
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

export default EditProjectPage;