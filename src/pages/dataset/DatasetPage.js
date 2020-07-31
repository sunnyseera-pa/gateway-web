
// /ShowObjects.js
import React, { Component, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Container, Tabs, Tab, Button, Alert, Tooltip, Overlay } from 'react-bootstrap/';
import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading'
import RelatedObject from '../commonComponents/RelatedObject';
import SearchBar from '../commonComponents/SearchBar';
import SVGIcon from '../../images/SVGIcon';
import { ReactComponent as MetadataBronze } from '../../images/bronze.svg';
import { ReactComponent as MetadataSilver } from '../../images/silver.svg';
import { ReactComponent as MetadataGold } from '../../images/gold.svg';
import { ReactComponent as MetadataPlatinum } from '../../images/platinum.svg';
import { ReactComponent as MetadataNotRated } from '../../images/not-rated.svg';
import { PageView, initGA } from '../../tracking';
import { Event } from '../../tracking';
import moment from 'moment';
import Linkify from "react-linkify";
import DiscourseTopic from '../commonComponents/DiscourseTopic';
import DatasetSchema from './DatasetSchema';

import 'react-tabs/style/react-tabs.css';

var baseURL = require('../commonComponents/BaseURL').getURL();
var cmsURL = require('../commonComponents/BaseURL').getCMSURL();

class DatasetDetail extends Component {

  // initialize our state
  state = {
    id: '',
    data: [],
    relatedObjects: [],
    datasetSchema: '',
    datarequest: [],
    DBData: [],
    activeKey: false,
    selectedItem: 'tab-1',
    isLoading: true,
    userState: [{
      loggedIn: false,
      role: "Reader",
      id: null,
      name: null
    }],
    alert: null,
    searchString: ''
  };

  constructor(props) {
    super(props);
    this.state.userState = props.userState;
  }

  // on loading of tool detail page
  componentDidMount() {
    this.getDataset();
    this.checkAlerts();
    initGA('UA-166025838-1');
    PageView(); 
  }


  // on loading of tool detail page were id is different
  componentDidUpdate() {
    if (this.props.match.params.datasetID !== this.state.id && this.state.id !== '' && !this.state.isLoading) {
      this.getDetailsSearchFromMDC();
    }
    }

    getDataset = () => {
        //need to handle error if no id is found
        this.setState({ isLoading: true });
        axios.get(baseURL + '/api/v1/dataset/' + this.props.match.params.datasetID)
          .then((res) => {
            this.setState({
              data: res.data.data[0],
              discourseTopic: res.data.discourseTopic,
              isLoading: false
            });
            document.title = res.data.data[0].name.trim();
    
            let counter = !this.state.data.counter ? 1 : this.state.data.counter + 1;
            this.updateCounter(this.props.match.params.datasetID, counter);
          })
      };

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') window.location.href = "/search?search=" + this.state.searchString;
    }

    checkAlerts = () => {
        const { state } = this.props.location;
        if (typeof state !== "undefined" && typeof state.alert !== 'undefined') {
            const { alert } = state;
            this.setState({ alert });
        }
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
    }

    showLoginModal(title, contactPoint) {
        document.getElementById("myModal").style.display = "block";
        document.getElementById("loginWayFinder").style.display = "none";
        document.getElementById("loginButtons").style.display = "block";
        document.getElementById("loginModalTitle").innerHTML = "You must be signed in to request access";
        document.getElementById("modalRequestDetails").innerHTML = title;
        document.getElementById("modalRequestContact").innerHTML = contactPoint;
        document.getElementById("modalRequestSection").style.display = "block";

        window.onclick = function (event) {
            if (event.target === document.getElementById("myModal")) {
                document.getElementById("myModal").style.display = "none";
            }
        }
      }

      updateCounter = (id, counter) => {
        axios.post(baseURL + '/api/v1/counter/update', { id, counter });
    }

  render() {
    const { searchString, data, isLoading, userState, alert=null, discourseTopic } = this.state;

    if (isLoading) {
      return <Container><Loading /></Container>;
    }

    if (data.relatedObjects === null || typeof data.relatedObjects === 'undefined') {
        data.relatedObjects = [];
      }

    function Metadata() {
        const [show, setShow] = useState(false);
        const target = useRef(null);

        var score = ''
        
        if (data.datasetfields.metadataquality && typeof data.datasetfields.metadataquality.quality_score !== 'undefined') {
            if (data.datasetfields.metadataquality.quality_score <= 50) score = 'Not rated'
            else if (data.datasetfields.metadataquality.quality_score <= 70) score = "Bronze";
            else if (data.datasetfields.metadataquality.quality_score <= 80) score = "Silver";
            else if (data.datasetfields.metadataquality.quality_score <= 90) score = "Gold";
            else if (data.datasetfields.metadataquality.quality_score > 90) score = "Platinum";
        }
        else if(!data.quality){
            score = 'Not rated';
        }

        return (<>
                <div className="text-center">
                    {(() => {
                        if (data.datasetfields.metadataquality && typeof data.datasetfields.metadataquality.quality_score === 'undefined') return <></>
                        else if (data.datasetfields.metadataquality.quality_score <= 50) {
                            return (<div ref={target} onClick={() => setShow(!show)} style={{ cursor: 'pointer' }} ><div style={{lineHeight: 1}}><MetadataNotRated className="" /></div><div style={{lineHeight: 1}}><span className="gray800-14-opacity">Not rated</span></div></div>)
                        }
                        else if (data.datasetfields.metadataquality.quality_score <= 70) {
                            return (<div ref={target} onClick={() => setShow(!show)} style={{ cursor: 'pointer' }} ><div style={{lineHeight: 1}}><MetadataBronze className="" /></div><div style={{lineHeight: 1}}><span className="gray800-14-opacity">Bronze metadata</span></div></div>)
                        } 
                        else if (data.datasetfields.metadataquality.quality_score <= 80) {
                            return (<div ref={target} onClick={() => setShow(!show)} style={{ cursor: 'pointer' }} ><div style={{lineHeight: 1}}><MetadataSilver className="" /></div><div style={{lineHeight: 1}}><span className="gray800-14-opacity">Silver metadata</span></div></div>)
                        } 
                        else if (data.datasetfields.metadataquality.quality_score <= 90) {
                            return (<div ref={target} onClick={() => setShow(!show)} style={{ cursor: 'pointer' }} ><div style={{lineHeight: 1}}><MetadataGold className="" /></div><div style={{lineHeight: 1}}><span className="gray800-14-opacity">Gold metadata</span></div></div>)
                        } 
                        else if (data.datasetfields.metadataquality.quality_score > 90) {
                            return (<div ref={target} onClick={() => setShow(!show)} style={{ cursor: 'pointer' }} ><div style={{lineHeight: 1}}><MetadataPlatinum className="" /></div><div style={{lineHeight: 1}}><span className="gray800-14-opacity">Platinum metadata</span></div></div>)
                        }
                    })()} 
                </div>
                
                <Overlay target={target.current} show={show} placement="bottom">
                    {(props) => (
                    <Tooltip className="metadataOverlay" {...props}>
                        Metadata quality score: {score}
                        <br /><br />
                        The score relates to the amount of information available about the dataset, 
                        and not to the quality of the actual datasets. 
                        <br /><br />
                        <a href="https://github.com/HDRUK/datasets#about-the-reports" target="_blank" className="white-12">Click to read more about how the score is calculated.</a>
                        <br /><br />
                        {Math.trunc(data.datasetfields.metadataquality.completeness_percent)} Completeness %
                        <br />
                        {Math.trunc(data.datasetfields.metadataquality.weighted_completeness_percent)} Weighted completeness %
                        <br />
                        {Math.trunc(data.datasetfields.metadataquality.error_percent)} Error %
                        <br />
                        {Math.trunc(data.datasetfields.metadataquality.weighted_error_percent)} Weighted error %
                    </Tooltip>
                    )}
                </Overlay>
            </>
        )
    }

    return (
        <div>
            {/* { datasetSchema !== '' ? <DatasetSchema datasetSchema={datasetSchema}/> : null } */}
            <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
            <Container className="mb-5">
                <Row className="mt-4">
                    <Col sm={1} />
                    <Col sm={10}>
                        {alert ? <Alert variant={alert.type}>{alert.message}</Alert> : null}
                        <div className="rectangle">
                            <Row>
                                <Col xs={10}>
                                    <span className="black-20">{data.name} </span>
                                    <br />
                                    {data.datasetfields.publisher ? <span className="gray800-14">{data.datasetfields.publisher}</span> : <span className="gray800-14-opacity">Not specified</span>}
                                </Col>
                                <Col xs={2} className="text-right">
                                    <Metadata />
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col xs={12}>
                                    <span className="badge-dataset">
                                        <SVGIcon name="dataseticon" fill={'#ffffff'} className="badgeSvg mr-2"  viewBox="-2 -2 22 22"/>
                                        <span>Dataset</span>
                                    </span>
                                    {!data.tags.features || data.tags.features.length <= 0 ? '' : 
                                    data.tags.features.map((keyword) => { return <a href={'/search?search=' + keyword}><div className="ml-2 badge-tag">{keyword}</div></a>})}
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col xs={12}>
                                    <span className='gray800-14'>
                                        {data.counter === undefined ? 1 : data.counter + 1}
                                        {data.counter === undefined ? ' view' : ' views'}
                                    </span>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col sm={1}/>
                </Row>
            
                <Row>
                    <Col sm={1} />
                    <Col sm={10}>
                        <div>
                            <Tabs className='tabsBackground gray700-13'>
                                <Tab eventKey="About" title={'About'}>
                                    <Row className="mt-2">
                                        <Col sm={12}>
                                            <div className="rectangle">
                                                <Row className="gray800-14-bold">
                                                    <Col sm={12}>
                                                        Description
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col sm={12} className="gray800-14">
                                                        {(() => {
                                                            if (data.description) {
                                                                return <span className="gray800-14"><ReactMarkdown source={data.description} /></span>
                                                            }
                                                            else if (data.datasetfields.abstract) {
                                                                return <span className="gray800-14">{data.datasetfields.abstract}</span>
                                                            }
                                                            else {
                                                                return <span className="gray800-14-opacity">Not specified</span>
                                                            }
                                                        })()}
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col sm={12}>
                                            <div className="rectangle">
                                                <Row className="gray800-14-bold">
                                                    <Col sm={12}>
                                                        Details
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col sm={2} className="gray800-14" >
                                                        Release date
                                                    </Col>
                                                    {data.datasetfields.releaseDate ? <Col sm={10} className="gray800-14">{moment(data.datasetfields.releaseDate).format('DD MMMM YYYY')}</Col> : <Col sm={10} className="gray800-14-opacity">Not specified</Col>}
                                                </Row>
                                                <Row className="mt-2">
                                                    <Col sm={2} className="gray800-14" >
                                                        License
                                                    </Col>
                                                    {data.license ? <Col sm={10} className="gray800-14">{data.license}</Col> : <Col sm={10} className="gray800-14-opacity">Not specified</Col>}
                                                </Row>
                                                <Row className="mt-2">
                                                    <Col sm={2} className="gray800-14" >
                                                        Request time
                                                    </Col>
                                                    {data.datasetfields.accessRequestDuration ? <Col sm={10} className="gray800-14">{data.datasetfields.accessRequestDuration}</Col> : <Col sm={10} className="gray800-14-opacity">Not specified</Col>}
                                                </Row>
                                                <Row className="mt-2">
                                                    <Col sm={2} className="gray800-14" >
                                                        Standard
                                                    </Col>
                                                    {data.datasetfields.conformsTo ? <Col sm={10} className="gray800-14 overflowWrap">{data.datasetfields.conformsTo}</Col> : <Col sm={10} className="gray800-14-opacity">Not specified</Col>}
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col sm={12}>
                                            <div className="rectangle">
                                                <Row className="gray800-14-bold">
                                                    <Col sm={12}>
                                                        Data access
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                        <Col sm={2} className="gray800-14" >
                                                            Access rights
                                                        </Col>
                                                        {data.datasetfields.accessRights ? 
                                                        <Col sm={10} className="gray800-14">
                                                            <Linkify properties={{ target: '_blank' }}>{data.datasetfields.accessRights}</Linkify>
                                                        </Col> 
                                                        : <Col sm={10} className="gray800-14-opacity">Not specified</Col> }
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col sm={12}>
                                            <div className="rectangle">
                                                <Row className="gray800-14-bold">
                                                    <Col sm={10}>
                                                        Coverage
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col sm={3} className="gray800-14" >
                                                        Jurisdiction
                                                    </Col>
                                                    {data.datasetfields.jurisdiction ? <Col sm={9} className="gray800-14">{data.datasetfields.jurisdiction}</Col> : <Col sm={9} className="gray800-14-opacity">Not specified</Col> }
                                                </Row>
                                                <Row className="mt-2">
                                                    <Col sm={3} className="gray800-14" >
                                                        Geographic coverage
                                                    </Col>
                                                    {data.datasetfields.geographicCoverage ? <Col sm={9} className="gray800-14">{data.datasetfields.geographicCoverage}</Col> : <Col sm={9} className="gray800-14-opacity">Not specified</Col> }
                                                </Row>
                                                <Row className="mt-2">
                                                    <Col sm={3} className="gray800-14" >
                                                        Dataset start date
                                                    </Col>
                                                    {data.datasetfields.datasetStartDate ? <Col sm={9} className="gray800-14">{data.datasetfields.datasetStartDate}</Col> : <Col sm={9} className="gray800-14-opacity">Not specified</Col> }
                                                </Row>
                                                <Row className="mt-2">
                                                    <Col sm={3} className="gray800-14" >
                                                        Dataset end date
                                                    </Col>
                                                    {data.datasetfields.datasetEndDate ? <Col sm={9} className="gray800-14">{data.datasetfields.datasetEndDate}</Col> : <Col sm={9} className="gray800-14-opacity">Not specified</Col> }
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col sm={12}>
                                            <div className="rectangle">
                                                <Row className="gray800-14-bold">
                                                    <Col sm={12}>
                                                        Demographics
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col sm={3} className="gray800-14" >
                                                        Statistical population
                                                    </Col>
                                                    {data.datasetfields.statisticalPopulation ? <Col sm={9} className="gray800-14">{data.datasetfields.statisticalPopulation}</Col> : <Col sm={9} className="gray800-14-opacity">Not specified</Col> }
                                                </Row>
                                                <Row className="mt-2">
                                                    <Col sm={3} className="gray800-14" >
                                                        Age band 
                                                    </Col>
                                                    {data.datasetfields.ageBand ? <Col sm={9} className="gray800-14">{data.datasetfields.ageBand}</Col> : <Col sm={9} className="gray800-14-opacity">Not specified</Col> }
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col sm={12}>
                                            <div className="rectangle">
                                                <Row className="gray800-14-bold">
                                                    <Col sm={12}>
                                                        Related resources
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col sm={3} className="gray800-14" >
                                                        Physical sample availability 
                                                    </Col>
                                                    {data.datasetfields.physicalSampleAvailability ? <Col sm={9} className="gray800-14">{data.datasetfields.physicalSampleAvailability}</Col> : <Col sm={9} className="gray800-14-opacity">Not specified</Col> }
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="Collaboration" title={`Discussion (${discourseTopic && discourseTopic.posts ? discourseTopic.posts.length : 0})`}>
                                    <DiscourseTopic topic={discourseTopic} toolId={data.id} userState={userState} />
                                </Tab>
                                <Tab eventKey="Projects" title={'Related resources (' + data.relatedObjects.length + ')'}>
                                    {data.relatedObjects.length <= 0 ? <NotFound word="related resources" /> : data.relatedObjects.map(object => <RelatedObject relatedObject={object} activeLink={true} showRelationshipAnswer={true} />)}
                                </Tab>
                            </Tabs>
                        </div>
                    </Col>
                    <Col sm={1}/>
                </Row>
            </Container>
            <div className="actionBar">
                <Button variant='white' href={'https://metadata-catalogue.org/hdruk/#/catalogue/dataModel/' + data.datasetid} target="_blank" className="techDetailButton mr-2" >Technical details</Button>
                
                {(() => {
                    if(!userState[0].loggedIn) {
                        return <Button variant="primary" className="btn btn-primary addButton pointer" onClick={() => this.showLoginModal(data.name, data.datasetfields.contactPoint)}>Request Access</Button>
                    }
                    else if (alert) {
                        return <Button variant="primary" className="btn btn-primary addButton pointer" disabled>Request Access</Button>
                    }   
                    else {
                        return (
                            <Link className="btn btn-primary addButton pointer" 
                                to={{pathname: `/data-access-request/dataset/${data.datasetid}`}} 
                                onClick={() => Event("Buttons", "Click", "Request Access")}>
                                Request Access
                            </Link>
                        )
                    }                                     
                })()}
            </div>
        </div>
        );
    }
}

export default DatasetDetail;