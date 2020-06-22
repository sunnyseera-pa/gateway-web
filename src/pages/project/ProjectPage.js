
// /ShowObjects.js
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import queryString from 'query-string';
import {Container, Row, Col, Tabs, Tab, Alert, Nav, Navbar } from 'react-bootstrap';

import RelatedObject from '../commonComponents/RelatedObject';
import NotFound from '../commonComponents/NotFound';
import SearchBar from '../commonComponents/SearchBar';
import Loading from '../commonComponents/Loading'
import Creators from '../commonComponents/Creators';
import ProjectTitle from './components/ProjectTitle';

// import ReactGA from 'react-ga'; 
import {PageView, initGA} from '../../tracking';

var baseURL = require('../commonComponents/BaseURL').getURL();
var cmsURL = require('../commonComponents/BaseURL').getCMSURL();


class ProjectDetail extends Component {
  // initialize our state
  state = {
    searchString: null,
    id: '',
    data: [],
    isLoading: true,
    userState: [{
      loggedIn: false,
      role: "Reader",
      id: null,
      name: null
    }],
    projectAdded: false,
    projectEdited: false
  };

  constructor(props) {
    super(props);
    this.state.userState = props.userState;
  }

  // on loading of tool detail page
  componentDidMount() {
    if (!!window.location.search) {
      var values = queryString.parse(window.location.search);
      this.setState({ projectAdded: values.projectAdded });
      this.setState({ projectEdited: values.projectEdited });
    }
    this.getDataSearchFromDb();
    initGA('UA-166025838-1');
    PageView();
  }

  // on loading of tool detail page were id is different
  componentDidUpdate() {
    if (this.props.match.params.projectID !== this.state.id && this.state.id !== '' && !this.state.isLoading) {
      this.getDataSearchFromDb();
    }
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
      })
  };

  doSearch = (e) => { //fires on enter on searchbar
    if (e.key === 'Enter') {
      if (!!this.state.searchString) {
        window.location.href = "/search?search=" + this.state.searchString;
      }
    }
  }

  updateSearchString = (searchString) => {
    this.setState({ searchString: searchString });
  }

  render() {
    const { searchString, data, isLoading, projectAdded, projectEdited, userState } = this.state;

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

          {projectAdded ?
            <Row className="">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <Alert variant="success" className="mt-3">Done! Someone will review your project and let you know when it goes live</Alert>
              </Col>
              <Col sm={1} lg={10} />
            </Row>
            : ""}

          {projectEdited ?
            <Row className="">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <Alert variant="success" className="mt-3">Done! Your project has been updated</Alert>
              </Col>
              <Col sm={1} lg={10} />
            </Row>
            : ""}

          {data.activeflag === "review" ?
            <Row className="">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <Alert variant="warning" className="mt-3">Your project is pending review. Only you can see this page.</Alert>
              </Col>
              <Col sm={1} lg={10} />
            </Row>
            : ""}


          <ProjectTitle data={data} activeLink={true}/>

          <Row>
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>

              <Row className="mt-4">
                <Col sm={10} lg={10}>
                  <span className="Black500-16px">Uploaded by ( {data.authors.length} )</span>
                </Col>
              </Row>
              <Row>
                {data.persons.map(author =>
                  <Col sm={6} lg={6}>
                    <Creators author={author} />
                  </Col>
                )}
              </Row>
            </Col>
            <Col sm={1} lg={1} />
          </Row>

          <Row className="mt-3">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <div>
                <Tabs className='TabsBackground Gray700-13px'>
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

export default ProjectDetail;