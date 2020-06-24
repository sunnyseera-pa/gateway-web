
// /ShowObjects.js
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Row, Col, Container, Tabs, Tab, Navbar, Nav, Button, Alert } from 'react-bootstrap/';
import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading'
import About from '../commonComponents/About';
import RelatedObject from '../commonComponents/RelatedObject';
import SearchBar from '../commonComponents/SearchBar';
import LoginModal from '../commonComponents/LoginModal';
// import ReactGA from 'react-ga'; 
import { PageView, initGA } from '../../tracking';
import { Event } from '../../tracking';


import 'react-tabs/style/react-tabs.css';

var baseURL = require('../commonComponents/BaseURL').getURL();
var cmsURL = require('../commonComponents/BaseURL').getCMSURL();

class DatasetDetail extends Component {

  // initialize our state
  state = {
    id: '',
    data: [],
    projectsData: [],
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
    alert: null
  };

  constructor(props) {
    super(props);
    this.state.userState = props.userState;
  }

  // on loading of tool detail page
  componentDidMount() {
    this.getDetailsSearchFromMDC();
    this.getRelatedProjects();
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

    // on loading of tool detail page
    componentDidMount() {
        this.getDetailsSearchFromMDC();
        this.checkAlerts();
        initGA('UA-166025838-1');
        PageView();
    }

  getDetailsSearchFromMDC = () => {
    this.setState({ isLoading: true });
    axios.get(baseURL + '/api/v1/datasets/detail/' + this.props.match.params.datasetID+'?&id=' + this.state.userState[0].id)
      .then((res) => {
        this.setState({
          data: res.data.data,
          datarequest: res.data.datarequest,
          isLoading: false
        });
      })
  };

  getRelatedProjects = () => {
    axios.get(baseURL + '/api/v1/datasets/relatedobjects/' + this.props.match.params.datasetID)
      .then((res) => {
        this.setState({
          projectsData: res.data.data
        })
      })
  };

  doSearch = (e) => { //fires on enter on searchbar
    if (e.key === 'Enter') {
      if (!!this.state.searchString) {
        window.location.href = "/search?search=" + this.state.searchString;
      }
    }
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

  
  render() {
    const { searchString, data, datarequest, isLoading, userState, alert } = this.state;

    if (isLoading) {
      return <Container><Loading /></Container>;
    }

    if (data.relatedObjects === null || typeof data.relatedObjects === 'undefined') {
        data.relatedObjects = [];
    }

    return (
      
      <div>
        <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
        <Container className="mb-5">
          <DatasetTitle data={data} datarequest={datarequest} userState={userState} alert={alert} />
          <Row className="mt-1">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <div>
                <Tabs className='TabsBackground Gray700-13px'>
                  <Tab eventKey="About" title={'About'}>
                    <About data={data}/>
                  </Tab>  
                    <Tab eventKey="Projects" title={'Related resources (' + data.relatedObjects.length + ')'}>
                        {data.relatedObjects.length <= 0 ? <NotFound word="related resources" /> : data.relatedObjects.map(object => <RelatedObject relatedObject={object} activeLink={true} showRelationshipAnswer={true} />)}
                    </Tab>
                </Tabs>
              </div>
            </Col>
            <Col sm={1} lg={1} />
          </Row> 
        </Container>
        <Navbar fixed="bottom" className="mr-5 mb-2" >
          <Nav className="ml-auto">
            <Row>
              <p>
                <a href={cmsURL + '/HDRUKGatewaySupportPortal'} target="_blank" rel="noopener noreferrer" className="Purple-14px" id="UnderlinedLink">
                  Suggest Feedback
                </a>
              </p>
            </Row>
          </Nav>
        </Navbar>
      <Row className='AuthorCard' />
    </div>
        );
    }
}

class DatasetTitle extends Component {

  constructor(props) {
    super(props);
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
  /**
   * [render request access]
   * @desc Sets the correct Request Access button for the user
   * @return  {[type]}  null : button
   */
  renderRequestAccess = () => {
    const {userState: [user, ...rest], data: {title, id, contactPoint, publisher}, alert=null, datarequest} = this.props;
    const hasRequestedAccess = (datarequest.length === 1 ? true : false);
    // const hasRequestedAccess = false;
    if(!user.loggedIn) {
      var isRequest=true;
      return <LoginModal isRequest={isRequest} requestDetails={title} requestContact={contactPoint} />;
    } else if (alert) {
      return <Button variant="primary" className="AddButton" disabled>Request Access</Button>
    } else {
      return <Link className="btn btn-primary AddButton" to={{pathname: 
        // '/request-access'
        `/data-access-request/${id}`
        , state: {title, dataSetId: id, custodianEmail: contactPoint, publisher: publisher }}} onClick={() => Event("Buttons", "Click", "Request Access")}>Request Access</Link>
    }
  }

  render() {
      const { data, alert } = this.props;

      var keywords = (data.keywords ? data.keywords.split(",") : '');
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var releaseDate = new Date(data.releaseDate);
      var releasedOnDate = (data.releaseDate ? releaseDate.getDate() + " " + monthNames[releaseDate.getMonth()] + " " + releaseDate.getFullYear() : "");

      var metadataQuality         = "";
      var metadataQualityClass    = "MetadataQuality ";

      if (data.quality) {
          if (data.quality.quality_score <= 50) {
              metadataQuality      = "Not rated";
              metadataQualityClass += "NotRatedBackground";

          } else if (data.quality.quality_score <= 70) {
              metadataQuality      = "Bronze";
              metadataQualityClass += "RatingBronzeBackground";

          } else if (data.quality.quality_score <= 80) {
              metadataQuality      = "Silver";
              metadataQualityClass += "RatingSilverBackground";

          } else if (data.quality.quality_score <= 90) {
              metadataQuality      = "Gold";
              metadataQualityClass += "RatingGoldBackground";

          } else if (data.quality.quality_score > 90) {
              metadataQuality      = "Platinum";
              metadataQualityClass += "RatingPlatinumBackground";
          }
      }
        return (
            <div>
                <Row className="mt-2">
                    <Col sm={1} lg={1} />
                    <Col sm={10} lg={10}>
                        {alert ? <Alert variant={alert.type}>{alert.message}</Alert> : null}
                        <div className="Rectangle">
                            <Row>
                                <Col xs={7} md={8}>
                                    <p>
                                        <span className="Black-20px">{data.title} </span>
                                    </p>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={2} lg={2}>
                                    <Button variant='white' href={'https://metadata-catalogue.org/hdruk/#/catalogue/dataModel/' + data.id} target="_blank" className="TechDetailButton mr-2" >
                                        Technical details
                                </Button>
                                </Col>
                                <Col xs={8} lg={8} >
                                    {this.renderRequestAccess()}
                                </Col>
                            </Row>

                            <Row className="mt-5">
                                <Col sm={2} lg={2} className="Gray800-14px" >
                                    Release date
                                </Col>
                                {releasedOnDate ? <Col sm={8} lg={8} className="Gray800-14px">{releasedOnDate}</Col> : <Col sm={8} lg={8} className="Gray800-14px-Opacity">Not specified</Col>}
                            </Row>

                            <Row className="mt-3">
                                <Col sm={2} lg={2} className="Gray800-14px" >
                                    Publisher
                                </Col>
                                {data.publisher ? <Col sm={8} lg={8} className="Gray800-14px">{data.publisher}</Col> : <Col sm={8} lg={8} className="Gray800-14px-Opacity">Not specified</Col>}
                            </Row>

                            <Row className="mt-3">
                                <Col sm={2} lg={2} className="Gray800-14px" >
                                    License
                                </Col>
                                {data.license ? <Col sm={8} lg={8} className="Gray800-14px">{data.license}</Col> : <Col sm={8} lg={8} className="Gray800-14px-Opacity">Not specified</Col>}
                            </Row>

                            <Row className="mt-3">
                                <Col sm={2} lg={2} className="Gray800-14px" >
                                    Request time
                                </Col>
                                {data.accessRequestDuration ? <Col sm={8} lg={8} className="Gray800-14px">{data.accessRequestDuration}</Col> : <Col sm={8} lg={8} className="Gray800-14px-Opacity">Not specified</Col>}
                            </Row>

                            <Row className="mt-3">
                                <Col sm={2} lg={2} className="Gray800-14px" >
                                    Standard
                                </Col>
                                {data.conformsTo ? <Col sm={8} lg={8} className="Gray800-14px overflowWrap">{data.conformsTo}</Col> : <Col sm={8} lg={8} className="Gray800-14px-Opacity">Not specified</Col>}
                            </Row>

                            <Row className="mt-3">
                                <Col sm={2} lg={2} className="Gray800-14px" >
                                    Keywords
                                </Col>
                                <Col sm={10} lg={10}>
                                    {!keywords || keywords.length <= 0 ? <span className="Gray800-14px-Opacity">Not specified</span> : keywords.map((keyword) => { return <div className="mr-2 Gray800-14px tagBadges mb-2"> <a href={'/search?search=' + keyword}> {keyword} </a> </div> })}
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col sm={2} lg={2} className="Gray800-14px" >
                                    Metadata quality
                                </Col>
                                <Col sm={10} lg={10}>
                                    {data.quality ? <div><div className={metadataQualityClass}> {metadataQuality} </div> <a href="https://github.com/HDRUK/datasets#about-the-reports" className="ml-2 Purple-14px" target="_blank">How is this calculated? </a></div> : <Col sm={8} lg={8} className="Gray800-14px-Opacity">Not specified</Col>}
                                </Col>
                            </Row>
                            
                        </div>
                    </Col>
                    <Col sm={1} lg={10} />
                </Row>

            </div>
        );
    }
}

export default DatasetDetail;