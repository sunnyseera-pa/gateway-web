import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';
import { Typeahead } from 'react-bootstrap-typeahead';

import {Form, Button, Row, Col, Container} from 'react-bootstrap';

import SearchBar from '../commonComponents/searchBar/SearchBar';
import Loading from '../commonComponents/Loading';
import RelatedResources from '../commonComponents/relatedResources/RelatedResources';
import RelatedObject from '../commonComponents/relatedObject/RelatedObject';
import moment from 'moment';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import SVGIcon from '../../images/SVGIcon';
import ToolTip from '../../images/imageURL-ToolTip.gif';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer'; 
import UserMessages from "../commonComponents/userMessages/UserMessages";
import ActionBar from '../commonComponents/actionbar/ActionBar';

import DataSetModal from "../commonComponents/dataSetModal/DataSetModal";
import './Collections.scss';

import { Event, initGA } from '../../tracking';


var baseURL = require('../commonComponents/BaseURL').getURL();

class EditCollectionPage extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
        this.searchBar = React.createRef();
    }

    // initialize our state
    state = {
        data: [],
        combinedUsers: [],
        isLoading: true,
        userState: [],
        searchString: '',
        datasetData: [],
        toolData: [],
        projectData: [],
        personData: [],
        paperData: [],
        summary: [],
        tempRelatedObjectIds: [],
        relatedObjectIds: [],
        relatedObjects: [],
        didDelete: false,
        showDrawer: false,
        showModal: false,
        context: {}
    };

    async componentDidMount() {
        initGA('UA-166025838-1');
        await Promise.all([
            this.doGetUsersCall(),
            // this.getDataSearchFromDb()
        ]);
        this.getDataSearchFromDb(); 
    }

    getDataSearchFromDb = () => {
        //need to handle error if no id is found
        this.setState({ isLoading: true });
        axios.get(baseURL + '/api/v1/collections/' + this.props.match.params.collectionID)
          .then((res) => {
            this.setState({
              data: res.data.data[0],
              relatedObjects: res.data.data[0].relatedObjects ? res.data.data[0].relatedObjects : []
            });
            this.setState({isLoading: false})
          });
      };

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
        if (e.key === 'Enter') window.location.href = "/search?search=" + this.state.searchString;
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
        
        axios.get(baseURL + '/api/v1/search?search='+ this.state.searchString + searchURL, {
            params: {
                form: true,
                userID: this.state.userState[0].id 
            }
        })  
            .then((res) => {
                this.setState({
                    datasetData: res.data.datasetResults || [],
                    toolData: res.data.toolResults || [],
                    projectData: res.data.projectResults || [],
                    personData: res.data.personResults || [],
                    paperData: res.data.paperResults || [],
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
            this.state.relatedObjects.push({'objectId':object.objectId, 'reason':'', 'objectType':object.type, 'user':this.state.userState[0].name, 'updated':moment().format("DD MMM YYYY")})
        })

        this.setState({tempRelatedObjectIds: []})  
    }

    clearRelatedObjects = () => {
        this.setState({tempRelatedObjectIds: [] }) 
    }

    removeObject = (id) => {
        this.state.relatedObjects = this.state.relatedObjects.filter(obj => obj.objectId !== id);
        this.state.relatedObjects = this.state.relatedObjects.filter(obj => obj.objectId !== id.toString());

        this.setState({relatedObjects: this.state.relatedObjects})
        this.setState({didDelete: true});
    }

    updateDeleteFlag = () => {
        this.setState({didDelete: false});
    }

    toggleDrawer = () => {
        this.setState( ( prevState ) => {
            if(prevState.showDrawer === true) {
                this.searchBar.current.getNumberOfUnreadMessages();
            }
            return { showDrawer: !prevState.showDrawer };
        });
    }

    toggleModal = (showEnquiry = false, context = {}) => {
        this.setState( ( prevState ) => {
            return { showModal: !prevState.showModal, context, showDrawer: showEnquiry };
        });
    }

    render() {
        const { data, combinedUsers, isLoading, userState, searchString, datasetData, toolData, projectData, personData, paperData, summary, relatedObjects, didDelete, showDrawer, showModal, context } = this.state;
 
        if (isLoading) {
            return <Container><Loading /></Container>;
        }

        return (
            <div>
                <SearchBar ref={this.searchBar} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} doToggleDrawer={this.toggleDrawer} userState={userState} />
                <Container>
                    <EditCollectionForm data={data} combinedUsers={combinedUsers} userState={userState} searchString={searchString} doSearchMethod={this.doModalSearch} doUpdateSearchString={this.updateSearchString} datasetData={datasetData} toolData={toolData} projectData={projectData} personData={personData} paperData={paperData} summary={summary} doAddToTempRelatedObjects={this.addToTempRelatedObjects} tempRelatedObjectIds={this.state.tempRelatedObjectIds} doClearRelatedObjects={this.clearRelatedObjects} doAddToRelatedObjects={this.addToRelatedObjects} doRemoveObject={this.removeObject} relatedObjects={relatedObjects} didDelete={didDelete} updateDeleteFlag={this.updateDeleteFlag}/>
                </Container>
                <SideDrawer
                    open={showDrawer}
                    closed={this.toggleDrawer}>
                    <UserMessages 
                        closed={this.toggleDrawer}
                        toggleModal={this.toggleModal}
                        drawerIsOpen={this.state.showDrawer} 
                    />
                </SideDrawer>

                <DataSetModal 
                    open={showModal} 
                    context={context}
                    closed={this.toggleModal}
                    userState={userState[0]} 
                />
            </div>
        );
    }

}

const EditCollectionForm = (props) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted

    const formik = useFormik({
        initialValues: {
            id: props.data.id,
            name: props.data.name,
            description: props.data.description,
            // authors: [props.userState[0].id],
            authors: props.data.authors,
            imageLink: props.data.imageLink,
            relatedObjects: props.relatedObjects
        },
    

        validationSchema: Yup.object({
            name: Yup.string()
                .required('This cannot be empty'),
            description: Yup.string()
                .max(5000, 'Maximum of 5,000 characters')
                .required('This cannot be empty'),
            authors: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.number()) : Yup.number())), 
            imageLink: Yup.string()
                .matches( /^[http|https]+:\/\/(?:([\w\-\.])+(\[?\.\]?)([\w]){2,4}|(?:(?:25[0–5]|2[0–4]\d|[01]?\d\d?)\[?\.\]?){3}(?:25[0–5]|2[0–4]\d|[01]?\d\d?))*([\w\/+=%&_\.~?\-]*)+[.gif|.jpeg|.png|.svg]$/ , 'Invalid image URL' )
        }),

        onSubmit: values => {
            values.relatedObjects = props.relatedObjects 
            values.collectionCreator = props.userState[0];
            axios.put(baseURL + '/api/v1/collections/edit', values)
                .then((res) => { 
                    window.location.href = window.location.search + '/collection/' + props.data.id + '/?collectionEdited=true';
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
      })
  
    function updateReason(id, reason, type) {
        let inRelatedObject = false;
        props.relatedObjects.map((object) => {
            if(object.objectId===id){
                inRelatedObject = true;
                object.reason = reason;
                object.user = props.userState[0].name;
                object.updated = moment().format("DD MMM YYYY");
            }
        });

        if(!inRelatedObject){
            props.relatedObjects.push({'objectId':id, 'reason':reason, 'objectType': type, 'user': props.userState[0].name, 'updated':moment().format("DD MMM YYYY")})
        }
    }

    const [isShown, setIsShown] = useState(false);

    const relatedResourcesRef = React.useRef()

    return (
        <div>
            <Row className="margin-top-32">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <div className="rectangle">
                        <Row>
                            <Col sm={12} lg={12}>
                             <p className="black-20 margin-bottom-0 pad-bottom-8">Edit a collection</p>
                            </Col>
                        </Row>
                        <p className="gray800-14 margin-bottom-0">Collections help collate varying resource types into one discovery space</p>
                    </div>
                </Col>
                <Col sm={1} lg={10} />
            </Row>

            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <Form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} autocomplete='off'>
                        <div className="rectangle">
                            <Form.Group>
                                <span className="gray800-14">Collection name</span>
                                <Form.Control id="name" name="name" type="text" className={formik.touched.name && formik.errors.name ? "emptyFormInput addFormInput" : "addFormInput"} onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                                {formik.touched.name && formik.errors.name ? <div className="errorMessages">{formik.errors.name}</div> : null}
                            </Form.Group>

                            <Form.Group>
                                <p className="gray800-14 margin-bottom-0 pad-bottom-4">Description</p>
                                <p className="gray700-13 margin-bottom-0">
                                    Up to 5,000 characters
                                </p>
                                <Form.Control as="textarea" id="description" name="description" type="text" className={formik.touched.description && formik.errors.description ? "emptyFormInput addFormInput descriptionInput" : "addFormInput descriptionInput"} onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
                                {formik.touched.description && formik.errors.description ? <div className="errorMessages">{formik.errors.description}</div> : null}
                            </Form.Group>

                            <Form.Group>
                                <p className="gray800-14 margin-bottom-0 pad-bottom-4">Collection collaborators</p>
                                <p className="gray700-13 margin-bottom-0">
                                    Anyone added will be able to add and remove resources to this collection.
                                </p> 
                                <Typeahead
                                    id="authors"
                                    className="addFormInput"
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
                                    <Col sm={7} lg={9}>
                                        <p className="gray800-14 margin-bottom-0 pad-bottom-4">Image URL (optional)</p>
                                <p className="gray700-13 margin-bottom-0">
                                    You must have permission from the owner of the image before you add it to the gateway.
                                </p>
                                    </Col>
                                    <Col sm={5} lg={3} className="pl-4">
                                     <span className="purple-13" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>  
                                        How to get an image URL
                                     </span>
                                     {isShown && ( <img src={ToolTip} alt="" id="imageToolTip" /> )}
                                     </Col>
                                </Row>
                                <Form.Control id="imageLink" name="imageLink" type="text" className={formik.touched.imageLink && formik.errors.imageLink ? "emptyFormInput addFormInput" : "addFormInput"} onChange={formik.handleChange} value={formik.values.imageLink} onBlur={formik.handleBlur} />
                                {formik.touched.imageLink && formik.errors.imageLink ? <div className="errorMessages">{formik.errors.imageLink}</div> : null}
                            </Form.Group>
                        </div>
 
                        <div className="rectangle mt-2">
                            <span className="black-20">Add resources</span> 
                            <br/>
                            <span className="gray800-14">Link resources in the gateway to your collection page.</span>
                        </div>

                        <div className="relatedResourcesRectangle mt-1">
                            {props.relatedObjects ? props.relatedObjects.map((object) => {
                                return (
                                    <div className="relatedObjectRectangle">
                                        <RelatedObject showRelationshipQuestion={true} objectId={object.objectId} doRemoveObject={props.doRemoveObject} doUpdateReason={updateReason} reason={object.reason} didDelete={props.didDelete} updateDeleteFlag={props.updateDeleteFlag} inCollection={true}/>
                                    </div>   
                                )
                             }) : ''}
                            

                            <div className="flexCenter pt-3 pb-3"> 
                                <Row>
                                    <Col sm={1} lg={1} />
                                    <Col sm={10} lg={10}>
                                        <RelatedResources ref={relatedResourcesRef} searchString={props.searchString} doSearchMethod={props.doSearchMethod} doUpdateSearchString={props.doUpdateSearchString} userState={props.userState} datasetData={props.datasetData} toolData={props.toolData} projectData={props.projectData} personData={props.personData} paperData={props.paperData} summary={props.summary} doAddToTempRelatedObjects={props.doAddToTempRelatedObjects} tempRelatedObjectIds={props.tempRelatedObjectIds} relatedObjects={props.relatedObjects} doClearRelatedObjects={props.doClearRelatedObjects} doAddToRelatedObjects={props.doAddToRelatedObjects} />
                                    </Col>
                                    <Col sm={1} lg={10} />
                                </Row>
                            </div>
                        </div> 

                        <ActionBar userState={props.userState}>  
                                <a style={{ cursor: 'pointer' }} href={'/account?tab=collections'}>
                                    <Button variant="medium" className="cancelButton dark-14 mr-2" >
                                        Cancel
                                    </Button>
                                </a>

                                <Button onClick={() => relatedResourcesRef.current.showModal()} variant='white' className="techDetailButton mr-2">
                                    + Add resource
                                </Button>

                                <Button variant="primary" className="publishButton white-14-semibold mr-2" type="submit" onClick={() => Event("Buttons", "Click", "Add tool form submitted")} >
                                    Publish
                                </Button>
                        </ActionBar> 
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

export default EditCollectionPage;