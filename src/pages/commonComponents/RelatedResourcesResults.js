import React from 'react';
import {Row, Col, Button, Form} from 'react-bootstrap';
import SVGIcon from "../../images/SVGIcon";
import axios from 'axios';
import Loading from './Loading'
import { ReactComponent as PersonPlaceholderSvg } from '../../images/person-placeholder.svg';
import { ReactComponent as CloseIconSvg } from '../../images/close.svg';
import ReactMarkdown from 'react-markdown'; 
import { useFormik } from 'formik';

var baseURL = require('./BaseURL').getURL();

class RelatedResourcesResults extends React.Component {

    // initialize our state
    state = { 
        data: [],
        objectId: null,
        isLoading: true,
        updated: false,
        reason: ''
    };

    constructor(props) {
        console.log('props in result: ' + JSON.stringify(props))
        super(props)
        this.state.objectId = props.objectId;
        this.state.reason = props.reason;
    }

    componentWillMount(objectId) {
        isNaN(this.props.objectId) ?
        this.getDatasetData() :
        this.getDataSearchFromDb()
    }

    // componentWillUnmount(objectId) {
    //     isNaN(this.props.objectId) ?
    //     this.getDatasetData() :
    //     this.getDataSearchFromDb()
    // }

    // componentDidUpdate(objectId) {
    //         isNaN(this.props.objectId) ?
    //         this.getDatasetData()
    //         :
    //         this.getDataSearchFromDb()
    // }

    getDataSearchFromDb = () => {
        //need to handle error if no id is found
        this.setState({ isLoading: true });
        axios.get(baseURL + '/api/v1/tools/' + this.state.objectId)
            .then((res) => {
                this.setState({
                    data: res.data.data[0],
                    isLoading: false
                });
            })  
    };

    getDatasetData = () => {
        this.setState({ isLoading: true });
        axios.get(baseURL + '/api/v1/datasets/detail/' + this.state.objectId)
        .then((res) => {
            this.setState({
                data: res.data.data,
                    isLoading: false
            })
            
        })
    }

    removeButton = () => {
        this.props.doRemoveObject(this.state.data.id)
    }

    handleChange = (id, reason, type) => {
        this.setState({reason: reason})
        this.props.doUpdateReason(id, reason, type)
    }

    renderIconTagsSwitch(type, data, keywords) {
        switch (type) {
            case 'tool':
                return <div>
                    <span className="ToolBadge">
                    <SVGIcon name="newtoolicon" fill={'#ffffff'} className="BadgeSvgs mr-2" />
                    Tool 
                    </span>
                        <span className="ml-2 Gray800-14px tagBadges mb-2 mt-2">
                            {data.categories.category}
                        </span>
                        {!data.categories.programmingLanguage || data.categories.programmingLanguage.length <= 0 ? '' : data.categories.programmingLanguage.map((language) => {
                                return <span className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{language}</span>
                        })}
                    </div>
                break;
            case undefined:
                return <div>
                        <span className="DatasetBadge">
                            <SVGIcon name="dataseticon" fill={'#ffffff'} className="BadgeSvgs mr-2" />
                            Dataset
                    </span>
                   {keywords.length <= 0 ? '' : 
                                    keywords.map((keyword) => {
                                        return <span className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{keyword}</span>
                                    })}
                    </div>
                break;
            case 'project':
                return <div>
                        <span className="ProjectBadge">
                         <SVGIcon name="newestprojecticon" fill={'#ffffff'} className="BadgeSvgs mr-2" />
                            Project
                        </span>
                        <span className="ml-2 Gray800-14px tagBadges mb-2 mt-2">
                            {data.categories.category}
                        </span>
                        </div>
                break;
            case 'paper':
                return <span className="PaperBadge">
                    <SVGIcon name="projecticon" fill={'#3c3c3b'} className="BadgeSvgs mr-2" />
                    Paper
                    </span>       
                break;      
            default: 
                return '';
        }
    }

    render(props) {
        const { data, objectId, isLoading, reason } = this.state;

        let keywords = [];
        if(data && data.type===undefined && data.keywords){
            keywords = data.keywords.split(", ")
        } 

        if (isLoading) {
            return <Loading />;
        }

            
        return (
            <Row className="mt-2">
                <Col>
                        <div> 
                        <Row className="ml-2 mt-2">
                            {data.type === "person" ?
                                <Col sm={10} lg={10}>
                                    <PersonPlaceholderSvg />
                                    <span className="ExtraBlack-16px-Bold ml-3"> {data.firstname && data.lastname ? data.firstname + ' ' + data.lastname : ''}</span>
                                    <br />
                                    <span className="Gray800-14px ml-5"> {data.bio } </span>
                                </Col>

                                :

                                data.type === 'tool' || data.type === 'project' ?
                                    <Col sm={10} lg={10}>
                                        <span className="ExtraBlack-16px-Bold"> {data.name}</span>
                                        <br />
                                        {!data.persons || data.persons <= 0 ? 'Author not listed' : data.persons.map((person, index) => {
                                            if (index > 0) {
                                                return <span className="Gray800-14px">, {person.firstname} {person.lastname}</span>
                                            }
                                            else {
                                                return <span className="Gray800-14px">{person.firstname} {person.lastname}</span>
                                            }
                                        })}
                                    </Col>

                                    :

                                    data.type === undefined ?
                                        <Col sm={10} lg={10}>
                                            <span className="ExtraBlack-16px-Bold"> {data.title}</span>
                                            <br />
                                            <span className="Gray800-14px"> {data.publisher} </span>
                                        </Col> : ''}

                                <Col sm={2} lg={2}>
                                    <Button variant="medium" className="ExtraBlack-14px" onClick={this.removeButton} >
                                        <SVGIcon name="closeicon" fill={'#979797'} className="ButtonSvgs mr-2" />
                                        Remove
                                    </Button> 
                                </Col>
                            </Row> 

                            <Row className="ml-4 mt-3">
                            {this.renderIconTagsSwitch(data.type, data, keywords)}
                            </Row>

                            <Row className="mt-5 ml-3">
                                <span className="Gray800-14px mr-2">What's the relationship between these resources?</span> 
                            </Row>
                            <Row className="ml-3 mr-3 testInput">
                                <input className="ResultsCardInput" id={"reason-" + objectId} value={this.state.reason} onChange={event => this.handleChange(objectId, event.target.value, data.type)} />
                            </Row>
                    </div>
                </Col>
            </Row>
        );
    }
}
 
export default RelatedResourcesResults;