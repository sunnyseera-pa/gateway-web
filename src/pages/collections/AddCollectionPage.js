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

import { Event, initGA } from '../../tracking';


var baseURL = require('../commonComponents/BaseURL').getURL();

class AddCollectionPage extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        data: [],
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
        initGA('UA-166025838-1');
        await Promise.all([
            this.doGetUsersCall()
        ]);
        this.setState({ isLoading: false });
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
            if (type === 'person' && page > 0) searchURL += '&personIndex=' + page;
        
        axios.get(baseURL + '/api/v1/search?search=' + this.state.searchString + searchURL )
            .then((res) => {
                this.setState({
                    datasetData: res.data.datasetResults || [],
                    toolData: res.data.toolResults || [],
                    projectData: res.data.projectResults || [],
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
        this.state.tempRelatedObjectIds.map((object) => {
            this.state.relatedObjects.push({'objectId':object.objectId, 'reason':'', 'objectType':object.type})
        })

        this.setState({tempRelatedObjectIds: []})
    }

    clearRelatedObjects = () => {
        this.setState({tempRelatedObjectIds: [] })
    }

    removeObject = (id) => {
        this.state.relatedObjects = this.state.relatedObjects.filter(obj => obj.objectId !== id);
        this.setState({relatedObjects: this.state.relatedObjects})
        this.setState({didDelete: true});
    }

    updateDeleteFlag = () => {
        this.setState({didDelete: false});
    }

    render() {
        const { data, combinedUsers, isLoading, userState, searchString, datasetData, toolData, projectData, personData, summary, relatedObjects, didDelete } = this.state;

        if (isLoading) {
            return <Container><Loading /></Container>;
        }

        return (
            <div>
                <SearchBar doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
                <Container>
                    <AddCollectionForm data={data} combinedUsers={combinedUsers} userState={userState} searchString={searchString} doSearchMethod={this.doModalSearch} doUpdateSearchString={this.updateSearchString} datasetData={datasetData} toolData={toolData} projectData={projectData} personData={personData} summary={summary} doAddToTempRelatedObjects={this.addToTempRelatedObjects} tempRelatedObjectIds={this.state.tempRelatedObjectIds} doClearRelatedObjects={this.clearRelatedObjects} doAddToRelatedObjects={this.addToRelatedObjects} doRemoveObject={this.removeObject} relatedObjects={relatedObjects} didDelete={didDelete} updateDeleteFlag={this.updateDeleteFlag}/>
                </Container>
            </div>
        );
    }

}

const AddCollectionForm = (props) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted

    const formik = useFormik({
        initialValues: {
            type: 'collection', //keep this if adding to same tools collection in db
            collectionName: '',
            description: '',
            authors: [props.userState[0].id],
            imageLink: '',
            relatedObjects: props.relatedObjects
        },

        validationSchema: Yup.object({
            collectionName: Yup.string()
                .required('This cannot be empty'),
            description: Yup.string()
                .max(5000, 'Maximum of 5,000 characters')
                .required('This cannot be empty'),
            authors: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.number()) : Yup.number()))
        }),


//UPDATE THIS SUBMIT TO /API/V1/MYCOLLECTIONS/ADD ???
        onSubmit: values => {
            values.relatedObjects = props.relatedObjects
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
                            <Col sm={12} lg={12}>
                             <p className="Black-20px">Create a collection</p>
                            </Col>
                        </Row>
                        <p className="Gray800-14px">Collections help collate varying resource types into one discovery space</p>
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
                                <span className="Gray800-14px">Collection name</span>
                                <Form.Control id="collectionName" name="collectionName" type="text" className={formik.touched.collectionName && formik.errors.collectionName ? "EmptyFormInput AddFormInput" : "AddFormInput"} onChange={formik.handleChange} value={formik.values.collectionName} onBlur={formik.handleBlur} />
                                {formik.touched.collectionName && formik.errors.collectionName ? <div className="ErrorMessages">{formik.errors.collectionName}</div> : null}
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
                                <span className="Gray800-14px">Collection collaborators</span>
                                <br />
                                <span className="Gray700-13px">
                                    Anyone added will be able to add and remove resources to this collection.
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
                                <Row>
                                    <Col>
                                        <span className="Gray800-14px">Image URL (optional)</span>
                                    </Col>
                                    <Col>
                                     <span className="Purple-13px">How to get an image URL</span>
                                     </Col>
                                </Row>
                                <br />
                                <span className="Gray700-13px">
                                    Paste an image address URL. It must include a protocol prefix, e.g. https://
                                </span>
                                <Form.Control id="imageLink" name="imageLink" type="text" className={formik.touched.imageLink && formik.errors.imageLink ? "EmptyFormInput AddFormInput" : "AddFormInput"} onChange={formik.handleChange} value={formik.values.imageLink} onBlur={formik.handleBlur} />
                                {formik.touched.imageLink && formik.errors.imageLink ? <div className="ErrorMessages">{formik.errors.imageLink}</div> : null}
                            </Form.Group>
                        </div>

                        <div className="Rectangle mt-2">
                            <span className="Black-20px">Related resources</span><span className="Gray454443-14px"> (optional)</span>
                            <br/>
                            <span className="Gray595757-14px">Show relationships to papers, projects, datasets and tools. Resources must be added to the Gateway first.</span>
                        </div>

                        <div className="Rectangle">
                            {props.relatedObjects.map((object) => {
                                return (
                                    <RelatedObject showRelationshipQuestion={true} objectId={object.objectId} doRemoveObject={props.doRemoveObject} doUpdateReason={updateReason} reason={object.reason} didDelete={props.didDelete} updateDeleteFlag={props.updateDeleteFlag}/>
                                )
                            })}
                        </div>

                        <div className="Rectangle FlexCenter mt-1">
                            <Row>
                                <Col sm={1} lg={1} />
                                <Col sm={10} lg={10}>
                                    
                                    <RelatedResources searchString={props.searchString} doSearchMethod={props.doSearchMethod} doUpdateSearchString={props.doUpdateSearchString} userState={props.userState} datasetData={props.datasetData} toolData={props.toolData} projectData={props.projectData} personData={props.personData} summary={props.summary} doAddToTempRelatedObjects={props.doAddToTempRelatedObjects} tempRelatedObjectIds={props.tempRelatedObjectIds} relatedObjects={props.relatedObjects} doClearRelatedObjects={props.doClearRelatedObjects} doAddToRelatedObjects={props.doAddToRelatedObjects} />
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
                                <Button variant="primary" className="White-14px" type="submit" onClick={() => Event("Buttons", "Click", "Add tool form submitted")} >
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

export default AddCollectionPage;