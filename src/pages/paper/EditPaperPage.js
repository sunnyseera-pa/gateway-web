import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typeahead } from 'react-bootstrap-typeahead';

import {Form, Button, Row, Col, Container} from 'react-bootstrap';

import SearchBar from '../commonComponents/SearchBar';
import Loading from '../commonComponents/Loading';
import RelatedResources from '../commonComponents/RelatedResources';
import RelatedResourcesResults from '../commonComponents/RelatedResourcesResults';
import RelatedObject from '../commonComponents/RelatedObject';


import 'react-bootstrap-typeahead/css/Typeahead.css';
import SVGIcon from '../../images/SVGIcon';

var baseURL = require('../commonComponents/BaseURL').getURL();

class EditPaperPage extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        data: [],
        combinedTopic: [],
        combinedFeatures: [],
        combinedUsers: [],
        isLoading: true,
        userState: [],
        searchString: null,
        datasetData: [],
        toolData: [],
        projectData: [],
        personData: [],
        summary: [],
        tempRelatedObjectIds: [],
        relatedObjectIds: [],
        relatedObjects: [],
        didDelete: false
    };

    async componentDidMount() {
        await Promise.all([
            this.doGetTopicsCall(),
            this.doGetFeaturesCall(),
            this.doGetUsersCall()
        ]);

        this.getDataSearchFromDb();
    }

    getDataSearchFromDb = () => {
        //need to handle error if no id is found
        this.setState({ isLoading: true });
        axios.get(baseURL + '/api/v1/tools/' + this.props.match.params.paperID)
          .then((res) => {
            this.setState({
              data: res.data.data[0],
              relatedObjects: res.data.data[0].relatedObjects ? res.data.data[0].relatedObjects : []
            });
            this.setState({isLoading: false})
          });
      };

    doGetTopicsCall() {
        return new Promise((resolve, reject) => {
            axios.get(baseURL + '/api/v1/search/filter/topic/paper')
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
            axios.get(baseURL + '/api/v1/search/filter/feature/paper')
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

    doModalSearch = (e, type, page) => {

        if (e.key === 'Enter' || e === 'click') {

            var searchURL = '';

            if (type === 'dataset' && page > 0) searchURL += '&datasetIndex=' + page;
            if (type === 'tool' && page > 0) searchURL += '&toolIndex=' + page;
            if (type === 'project' && page > 0) searchURL += '&projectIndex=' + page;
            if (type === 'paper' && page > 0) searchURL += '&paperIndex=' + page;
            if (type === 'person' && page > 0) searchURL += '&personIndex=' + page;
        
        axios.get(baseURL + '/api/v1/search?search=' + this.state.searchString + searchURL )
            .then((res) => {
                this.setState({
                    datasetData: res.data.datasetResults || [],
                    toolData: res.data.toolResults || [],
                    projectData: res.data.projectResults || [],
                    paperData: res.data.paperResults || [],
                    personData: res.data.personResults || [],
                    summary: res.data.summary || [],
                    isLoading: false
                });
            })
        }
    }

    addToTempRelatedObjects = (id, type) => {

        if(this.state.tempRelatedObjectIds && this.state.tempRelatedObjectIds.some(object => object.objectId === id)){
            this.state.tempRelatedObjectIds = this.state.tempRelatedObjectIds.filter(object => object.objectId !== id);
        }
        else {
            this.state.tempRelatedObjectIds.push({'objectId':id, 'type':type})
        }
       this.setState({tempRelatedObjectIds: this.state.tempRelatedObjectIds})
    }

    addToRelatedObjects = () => {
       if(this.state.tempRelatedObjectIds) {
            this.state.tempRelatedObjectIds.map((object) => {
                this.state.relatedObjects.push({'objectId':object.objectId, 'reason':'', 'objectType':object.type})
            })
        }

        this.setState({tempRelatedObjectIds: []})
    }

    clearRelatedObjects = () => {
        this.setState({tempRelatedObjectIds: [] })
    }

    removeObject = (id) => {
        this.state.relatedObjects = this.state.relatedObjects.filter(obj => obj.objectId !== id);
        this.state.relatedObjects = this.state.relatedObjects.filter(obj => obj.objectId !== JSON.stringify(id));
        this.setState({relatedObjects: this.state.relatedObjects})
        this.setState({didDelete: true});
    }

    updateDeleteFlag = () => {
        this.setState({didDelete: false});
    }

    render() {
        const { data, combinedTopic, combinedFeatures, combinedLanguages, combinedCategories, combinedLicenses, combinedUsers, isLoading, userState, searchString, datasetData, toolData, projectData, personData, summary, relatedObjects, didDelete } = this.state;

        if (isLoading) {
            return <Container><Loading /></Container>;
        }

        return (
            <div>
                <SearchBar doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
                <Container>
                    <EditPaperForm data={data} toolid={data.id} combinedTopic={combinedTopic} combinedFeatures={combinedFeatures} combinedUsers={combinedUsers} userState={userState} searchString={searchString} doSearchMethod={this.doModalSearch} doUpdateSearchString={this.updateSearchString} datasetData={datasetData} toolData={toolData} projectData={projectData} personData={personData} summary={summary} doAddToTempRelatedObjects={this.addToTempRelatedObjects} tempRelatedObjectIds={this.state.tempRelatedObjectIds} doClearRelatedObjects={this.clearRelatedObjects} doAddToRelatedObjects={this.addToRelatedObjects} doRemoveObject={this.removeObject} relatedObjects={relatedObjects} didDelete={didDelete} updateDeleteFlag={this.updateDeleteFlag}/>
                </Container>
            </div>
        );
    }

}

const EditPaperForm = (props) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    
    const formik = useFormik({
        initialValues: {
            id: props.data.id, 
            type: 'paper',
            name: props.data.name,
            link: props.data.link,
            journal:props.data.journal,
            journalYear:props.data.journalYear,
            description: props.data.description,
            authors: props.data.authors,
            tags: {
              features: props.data.tags.features,
              topics: props.data.tags.topics
            },
          relatedObjects: props.relatedObjects
          },

        validationSchema: Yup.object({
            name: Yup.string()
                .required('This cannot be empty'),
            description: Yup.string()
                .max(5000, 'Maximum of 5,000 characters')
                .required('This cannot be empty'),
            journal: Yup.string()
                .required('This cannot be empty'),
            journalYear: Yup.string()
                .required('Year cannot be empty')
        }),

        onSubmit: values => {
            values.relatedObjects = props.relatedObjects
            values.toolCreator = props.userState[0];
            axios.put(baseURL + '/api/v1/mytools/edit', values) 
                .then((res) => {
                    window.location.href = window.location.search + '/paper/' + props.data.id + '/?paperEdited=true';
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
              user.name = user.name + " (You)";
            }
          }
          else {
            listOfAuthors.push({ id: user.id, name: user.name })
          }
        }
      });
    });


    function updateReason(id, reason, type) {
        let inRelatedObject = false;
        props.relatedObjects.map((object) => {
            if(object.objectId===id){
                inRelatedObject = true;
                object.reason = reason;
            }
        });

        if(!inRelatedObject){
            props.relatedObjects.push({'objectId':id, 'reason':reason, 'objectType': type})
        }
    }

    return (
        <div>
            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <div className="Rectangle">
                        <Row>
                            <Col sm={10} lg={10}>
                             <p className="Black-20px">Edit a paper</p>
                            </Col>
                            <Col sm={2} lg={2}>
                            <span className="PaperBadge"> 
                                <SVGIcon name="projecticon" fill={'#3c3c3b'} className="BadgeSvgs mr-2" />
                                Paper 
                            </span>
                            </Col>
                        </Row>
                        <p className="Gray800-14px">Papers should be articles published in a journal. Add a project if you want</p>
                    </div>
                </Col>
                <Col sm={1} lg={10} />
            </Row>

            <Row className="pixelGapTop">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <Form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} autocomplete='off'>
                        <div className="Rectangle">
                        <Form.Group>
                                <span className="Gray800-14px">Link</span>
                                <br />
                                <span className="Gray700-13px">
                                    Where can we find this paper?
                                </span>
                                <Form.Control id="link" name="link" type="text" className={formik.touched.link && formik.errors.link ? "EmptyFormInput AddFormInput" : "AddFormInput"} onChange={formik.handleChange} value={formik.values.link} onBlur={formik.handleBlur} />
                                {formik.touched.link && formik.errors.link ? <div className="ErrorMessages">{formik.errors.link}</div> : null}
                            </Form.Group>

                            <Form.Group>
                                <span className="Gray800-14px">Title</span>
                                <Form.Control id="name" name="name" type="text" className={formik.touched.name && formik.errors.name ? "EmptyFormInput AddFormInput" : "AddFormInput"} onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                                {formik.touched.name && formik.errors.name ? <div className="ErrorMessages">{formik.errors.name}</div> : null}
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
                            
                            <Row className="mt-2">
                                <Col sm={10}>
                                    <Form.Group>
                                        <span className="Gray800-14px">Journal</span>
                                        <Form.Control id="journal" name="journal" type="text" className={formik.touched.journal && formik.errors.journal ? "EmptyFormInput AddFormInput" : "AddFormInput"} onChange={formik.handleChange} value={formik.values.journal} onBlur={formik.handleBlur} />
                                        {formik.touched.journal && formik.errors.journal ? <div className="ErrorMessages">{formik.errors.journal}</div> : null}
                                        {formik.touched.journalYear && formik.errors.journalYear ? <div className="ErrorMessages">{formik.errors.journalYear}</div> : null}
                                    </Form.Group>
                                </Col>
                                <Col sm={2}>
                                    <Form.Group>
                                        <span className="Gray800-14px">Year</span>
                                        <Form.Control id="journalYear" name="journalYear" type="text" className={formik.touched.journalYear && formik.errors.journalYear ? "EmptyFormInput AddFormInput" : "AddFormInput"} onChange={formik.handleChange} value={formik.values.journalYear} onBlur={formik.handleBlur} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group>
                                <span className="Gray800-14px">Abstract</span>
                                <br />
                                <span className="Gray700-13px">
                                Provide a brief summary of the paper
                                </span>
                                <Form.Control as="textarea" id="description" name="description" type="text" className={formik.touched.description && formik.errors.description ? "EmptyFormInput AddFormInput DescriptionInput" : "AddFormInput DescriptionInput"} onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
                                {formik.touched.description && formik.errors.description ? <div className="ErrorMessages">{formik.errors.description}</div> : null}
                            </Form.Group>

                            <Form.Group>
                            <span className="Gray800-14px">Keywords</span>
                                <br />
                                <span className="Gray700-13px">
                                Technological paradigms or other keywords. Eg. Rule-based, clustering, supervised machine learning
                                </span>
                                <Typeahead
                                    id="tags.features"
                                    labelKey="features"
                                    defaultSelected={props.data.tags.features}
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
                            <span className="Gray800-14px">Domain</span>
                                <br />
                                <span className="Gray700-13px">
                                    E.g. Biogenomics, Nutrition, Blockchain
                                </span>
                                <Typeahead
                                    id="tags.topics"
                                    labelKey="topics"
                                    defaultSelected={props.data.tags.topics}
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

                        <div className="Rectangle">
                           {props.relatedObjects ? props.relatedObjects.map((object) => {
                                return <RelatedObject showRelationshipQuestion={true} objectId={object.objectId} reason={object.reason} doRemoveObject={props.doRemoveObject} doUpdateReason={updateReason} reason={object.reason} didDelete={props.didDelete} updateDeleteFlag={props.updateDeleteFlag} />
                            }) : ''}
                        </div>

                        <div className="Rectangle FlexCenter mt-1">
                            <Row>
                                <Col sm={1} lg={1} />
                                <Col sm={10} lg={10}>
                                    <RelatedResources toolid={props.toolid} searchString={props.searchString} doSearchMethod={props.doSearchMethod} doUpdateSearchString={props.doUpdateSearchString} userState={props.userState} datasetData={props.datasetData} toolData={props.toolData} projectData={props.projectData} personData={props.personData} summary={props.summary} doAddToTempRelatedObjects={props.doAddToTempRelatedObjects} tempRelatedObjectIds={props.tempRelatedObjectIds} relatedObjects={props.relatedObjects} doClearRelatedObjects={props.doClearRelatedObjects} doAddToRelatedObjects={props.doAddToRelatedObjects} />
                                </Col>
                                <Col sm={1} lg={10} />
                            </Row>
                        </div>

                        <Row className="mt-3">
                            <Col xs={5} lg={9}/>
                            <Col xs={7} lg={3} className="text-right">
                                    <a style={{ cursor: 'pointer' }} href={'/account?tab=tools'}>
                                        <Button variant="medium" className="CancelButton Dark-14px mr-2" >
                                            Cancel
                                        </Button>
                                    </a>
                                <Button variant="primary" className="White-14px" type="submit" >
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

export default EditPaperPage;