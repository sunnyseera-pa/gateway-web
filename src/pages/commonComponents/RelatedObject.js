import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import { Row, Col, Button } from 'react-bootstrap';
import Loading from './Loading'
import { ReactComponent as PersonPlaceholderSvg } from '../../images/person-placeholder.svg';
import SVGIcon from "../../images/SVGIcon"

var baseURL = require('./BaseURL').getURL();

class RelatedObject extends React.Component {
    
    state = {
        relatedObject: [],
        reason: '',
        data: [],
        activeLink: true,
        isLoading: true
    };

    constructor(props) {
        super(props)
        this.state.activeLink = props.activeLink;
        if (props.data) {
            this.state.data = props.data;
            //this.state.reviewData = this.state.data.reviews;
            this.state.isLoading = false;
        }
        else if (props.objectId) {
            this.state.relatedObject = props.relatedObject;
            this.state.reason = props.reason;
            this.getRelatedObjectFromDb(props.objectId);
        }
        else {
            this.state.relatedObject = props.relatedObject;
            this.getRelatedObjectFromDb(this.state.relatedObject.objectId);
        }
    }

    getRelatedObjectFromDb = (id) => {
        //need to handle error if no id is found
        this.setState({ isLoading: true });
    
        axios.get(baseURL + '/api/v1/relatedobject/' + id)
            .then((res) => {
                this.setState({
                    data: res.data.data[0],
                    isLoading: false
                });
            })
    };

    removeButton = () => {
        this.props.doRemoveObject(this.state.data.id, this.state.data.type)
    }

    handleChange = (id, reason, type) => {
        console.log('type: ' + type)
        this.setState({reason: reason})
        this.props.doUpdateReason(id, reason, type)
    }



    render() {
        const { data, isLoading, activeLink, relatedObject } = this.state; 
 
        if (isLoading) {
            return <Loading />;
        }

        var rectangleClassName = 'Rectangle';
        if (this.props.tempRelatedObjectIds && this.props.tempRelatedObjectIds.some(object => object.objectId === data.id)) {
            rectangleClassName = 'Rectangle SelectedBorder';
        }
        else if (this.props.showRelationshipQuestion) {
            rectangleClassName= 'RectangleWithBorder';
        }

        return (
            <Row className="mt-2"> 
                <Col>
                    <div className={rectangleClassName} onClick={() => !activeLink && !this.props.showRelationshipQuestion && !this.props.showRelationshipAnswer && this.props.doAddToTempRelatedObjects(data.id, data.type===undefined ? "dataset" : data.type) } >
                       
                    {(() => {
                            if (this.props.showRelationshipQuestion) {
                                return (
                                    <Row>
                                    <Col sm={10} lg={10}/>
                                    <Col sm={2} lg={2}>
                                    <Button variant="medium" className="ExtraBlack-14px" onClick={this.removeButton} >
                                        <SVGIcon name="closeicon" fill={'#979797'} className="ButtonSvgs mr-2" />
                                        Remove
                                    </Button> 
                                 </Col>
                                 </Row>
                                )
                            }
                            else if (this.props.showRelationshipAnswer) {
                                return (
                                    <>
                                  
                                    </>
                                )
                            }
                        })()}
                        {(() => {
                            if (data.type === 'tool') {
                                return(
                                    <Row>
                                        <Col sm={10} lg={10}>
                                            {activeLink===true ?
                                            <a className="ExtraBlack-16px-Bold" style={{ cursor: 'pointer' }} href={'/tool/' + data.id} >{data.name}</a>
                                            : <span className="ExtraBlack-16px-Bold"> {data.name}</span> }
                                            <br />
                                            {!data.persons || data.persons <= 0 ? <span className="Gray800-14px">Author not listed</span> : data.persons.map((person, index) => {
                                                if (index > 0) {
                                                    if (activeLink===true){
                                                        return <><span className="reviewTitleGap Gray800-14px">·</span><a className="Gray800-14px" href={'/person/' + person.id}>{person.firstname} {person.lastname}</a></>
                                                    }
                                                    else {
                                                        return <span className="Gray800-14px">, {person.firstname} {person.lastname}</span>
                                                    }
                                                }
                                                else {
                                                    if (activeLink===true){
                                                        return <a className="Gray800-14px" href={'/person/' + person.id}>{person.firstname} {person.lastname}</a>
                                                    }
                                                    else {
                                                        return <span className="Gray800-14px">{person.firstname} {person.lastname}</span>
                                                    }
                                                }
                                            })}
                                        </Col> 
                                        <Col sm={2} lg={2}></Col>
                                        <Col sm={12} lg={12} className="pt-2">
                                            <span className="ToolBadge">
                                                <SVGIcon name="newtoolicon" fill={'#ffffff'} className="BadgeSvgs mr-2" />
                                                <span>Tool</span> 
                                            </span>
                                            
                                            {!data.categories.category ? '' :  activeLink === true ? <a href={'/search?search=' + data.categories.category}><div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{data.categories.category}</div></a> : <div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{data.categories.category}</div> }

                                            {!data.categories.programmingLanguage || data.categories.programmingLanguage.length <= 0 ? '' : data.categories.programmingLanguage.map((language) => {
                                                if (activeLink===true){
                                                    return <a href={'/search?search=' + language}><div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{language}</div></a>
                                                }
                                                else {
                                                    return <div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{language}</div>
                                                }
                                            })}

                                            {!data.tags.features || data.tags.features.length <= 0 ? '' : data.tags.features.map((feature) => {
                                                if (activeLink===true){
                                                    return <a href={'/search?search=' + feature}><div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{feature}</div></a>
                                                }
                                                else {
                                                    return <div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{feature}</div>
                                                }
                                            })}

                                            {!data.tags.topics || data.tags.topics.length <= 0 ? '' : data.tags.topics.map((topic) => {
                                                if (activeLink===true){
                                                    return <a href={'/search?search=' + topic}><div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{topic}</div></a>
                                                }
                                                else {
                                                    return <div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{topic}</div>
                                                }
                                            })}
                                        </Col> 
                                        <Col sm={12} lg={12} className="pt-2">
                                            <span className="Gray800-14px">
                                                {data.description.substr(0, 140) + (data.description.length > 140 ? '...' : '')}
                                            </span>
                                        </Col> 
                                    </Row>   
                                );
                            }
                            else if (data.type === 'project') {
                                return(
                                    <Row>
                                        <Col sm={10} lg={10}>
                                            {activeLink===true ?
                                            <a className="ExtraBlack-16px-Bold" style={{ cursor: 'pointer' }} href={'/project/' + data.id} >{data.name}</a>
                                            : <span className="ExtraBlack-16px-Bold"> {data.name}</span> }
                                            <br />
                                            {!data.persons || data.persons <= 0 ? <span className="Gray800-14px">Author not listed</span> : data.persons.map((person, index) => {
                                                if (index > 0) {
                                                    if (activeLink===true){
                                                        return <><span className="reviewTitleGap Gray800-14px">·</span><a className="Gray800-14px" href={'/person/' + person.id}>{person.firstname} {person.lastname}</a></>
                                                    }
                                                    else {
                                                        return <span className="Gray800-14px">, {person.firstname} {person.lastname}</span>
                                                    }
                                                }
                                                else {
                                                    if (activeLink===true){
                                                        return <a className="Gray800-14px" href={'/person/' + person.id}>{person.firstname} {person.lastname}</a>
                                                    }
                                                    else {
                                                        return <span className="Gray800-14px">{person.firstname} {person.lastname}</span>
                                                    }
                                                }
                                            })}
                                        </Col> 
                                        <Col sm={2} lg={2}></Col>
                                        <Col sm={12} lg={12} className="pt-2">
                                            <span className="ProjectBadge">
                                                <SVGIcon name="newestprojecticon" fill={'#ffffff'} className="BadgeSvgs mr-2" />
                                                <span>Project</span> 
                                            </span>
                                            
                                            {!data.categories.category ? '' : activeLink === true ? <a href={'/search?search=' + data.categories.category}><div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{data.categories.category}</div></a> : <div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{data.categories.category}</div>}

                                            {!data.tags.features || data.tags.features.length <= 0 ? '' : data.tags.features.map((feature) => {
                                                if (activeLink===true){
                                                    return <a href={'/search?search=' + feature}><div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{feature}</div></a>
                                                }
                                                else {
                                                    return <div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{feature}</div>
                                                }
                                            })}

                                            {!data.tags.topics || data.tags.topics.length <= 0 ? '' : data.tags.topics.map((topic) => {
                                                if (activeLink===true){
                                                    return <a href={'/search?search=' + topic}><div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{topic}</div></a>
                                                }
                                                else {
                                                    return <div className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{topic}</div>
                                                }
                                            })}
                                        </Col>  
                                        <Col sm={12} lg={12} className="pt-2">
                                            <span className="Gray800-14px">
                                                {data.description.substr(0, 140) + (data.description.length > 140 ? '...' : '')}
                                            </span>
                                        </Col> 
                                    </Row>  
                                );
                            }
                            else if (data.type === 'paper') {
                                return(
                                    <Row>
                                        <Col sm={10} lg={10}>
                                            {activeLink===true ?
                                            <a className="ExtraBlack-16px-Bold" style={{ cursor: 'pointer' }} href={'/paper/' + data.id} >{data.name}</a>
                                            : <span className="ExtraBlack-16px-Bold"> {data.name}</span> }
                                            <br />
                                            {!data.persons || data.persons <= 0 ? <span className="Gray800-14px">Author not listed</span> : data.persons.map((person, index) => {
                                                if (index > 0) {
                                                    if (activeLink===true){
                                                        return <><span className="reviewTitleGap Gray800-14px">·</span><a className="Gray800-14px" href={'/person/' + person.id}>{person.firstname} {person.lastname}</a></>
                                                    }
                                                    else {
                                                        return <span className="Gray800-14px">, {person.firstname} {person.lastname}</span>
                                                    }
                                                }
                                                else {
                                                    if (activeLink===true){
                                                        return <a className="Gray800-14px" href={'/person/' + person.id}>{person.firstname} {person.lastname}</a>
                                                    }
                                                    else {
                                                        return <span className="Gray800-14px">{person.firstname} {person.lastname}</span>
                                                    }
                                                }
                                            })}
                                        </Col> 
                                        <Col sm={2} lg={2}></Col>
                                        <Col sm={12} lg={12} className="pt-2">
                                            <span className="PaperBadge">
                                                <SVGIcon name="newestprojecticon" fill={'#ffffff'} className="BadgeSvgs mr-2" />
                                                <span>Paper</span> 
                                            </span>
                                            <span className="ml-2 Gray800-14px tagBadges mb-2 mt-2">
                                                {data.categories.category}
                                            </span>
                                            {!data.categories.programmingLanguage || data.categories.programmingLanguage.length <= 0 ? '' : data.categories.programmingLanguage.map((language) => {
                                                    return <span className="ml-2 Gray800-14px tagBadges mb-2 mt-2">{language}</span>
                                            })}    
                                        </Col>  
                                        <Col sm={12} lg={12} className="pt-2">
                                            <span className="Gray800-14px">
                                                {data.description.substr(0, 140) + (data.description.length > 140 ? '...' : '')}
                                            </span>
                                        </Col> 
                                    </Row>
                                );
                            }
                            else if (data.type === 'person') {
                                return(
                                    <Row>
                                        <Col xs={2} md={1} className="iconHolder">
                                            <div class="avatar-circle">
                                                <span class="initials"> {data.firstname ? data.firstname.charAt(0).toUpperCase() : ''}{data.lastname ? data.lastname.charAt(0).toUpperCase() : ''}</span>
                                            </div>
                                        </Col>
                                        <Col sm={8} lg={8}>
                                            {activeLink===true ? 
                                            <a className="ExtraBlack-16px-Bold" style={{ cursor: 'pointer' }} href={'/person/' + data.id} >{data.firstname && data.lastname ? data.firstname + ' ' + data.lastname : ''}</a> 
                                            : <span className="ExtraBlack-16px-Bold"> {data.firstname && data.lastname ? data.firstname + ' ' + data.lastname : ''} </span>
                                            }
                                            <br />
                                            <span className="Gray800-14px"> {data.bio} </span>
                                        </Col>
                                        <Col sm={2} lg={2}></Col>
                                    </Row>
                                );
                            }
                            else { //default to dataset
                                return (
                                    <Row>
                                        <Col sm={10} lg={10}>
                                            {activeLink===true ?
                                            <a className="ExtraBlack-16px-Bold" style={{ cursor: 'pointer' }} href={'/dataset/' + data.id} >{data.title}</a>
                                            : <span className="ExtraBlack-16px-Bold"> {data.title} </span> }
                                            <br />
                                            <span className="Gray800-14px"> {data.publisher} </span>
                                        </Col>
                                        <Col sm={2} lg={2}></Col>
                                        <Col sm={12} lg={12} className="pt-2">
                                            <span className="DatasetBadge">
                                                <SVGIcon name="dataseticon" fill={'#ffffff'} className="BadgeSvgs mr-2" />
                                                <span>Dataset</span>
                                            </span>
                                        </Col>  
                                        <Col sm={12} lg={12} className="pt-2">
                                            <span className="Gray800-14px">
                                                {(() => {
                                                    if (typeof data.description === 'undefined') {
                                                        return data.abstract.substr(0, 140) + (data.abstract.length > 140 ? '...' : '')
                                                    }
                                                    else {
                                                        return data.description.substr(0, 140) + (data.description.length > 140 ? '...' : '')
                                                    }
                                                })()}
                                            </span>
                                        </Col> 
                                    </Row>
                                );
                            }
                        })()}
                        {(() => {
                            if (this.props.showRelationshipQuestion) {
                                return (
                                    <>
                                        <Row className="mt-3">
                                            <Col xs={12}>
                                                <span className="Gray800-14px mr-2">What's the relationship between these resources?</span> 
                                            </Col>
                                        </Row>
                                        <Row className="testInput">
                                            <Col xs={12}>
                                            <input className="ResultsCardInput"  value={this.state.reason} onChange={event => this.handleChange(this.props.objectId, event.target.value, data.type===undefined ? "dataset" : data.type)} />
                                            </Col>
                                        </Row>
                                    </>
                                )
                            }
                            else if (this.props.showRelationshipAnswer) {
                                return (
                                    <>
                                        <Row className="mt-3">
                                            <Col xs={12}>
                                                <span className="Gray800-14px mr-2">Relationship</span> 
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xs={12}>
                                                <span className="Gray800-14px mr-2">{relatedObject.reason}</span> 
                                            </Col>
                                        </Row>
                                    </>
                                )
                            }
                        })()}
                    </div>
                </Col>
            </Row>
        );
    }
}

export default RelatedObject;
