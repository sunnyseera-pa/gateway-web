
// /ShowObjects.js
import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { Row, Col, Tabs, Tab, Container, Alert, Nav, Navbar } from 'react-bootstrap';
import NotFound from '../commonComponents/NotFound';
import Creators from '../commonComponents/Creators';
import Loading from '../commonComponents/Loading'
import Reviews from '../commonComponents/Reviews';
import RelatedObject from '../commonComponents/RelatedObject';
import SearchBar from '../commonComponents/SearchBar';
import DiscourseTopic from '../commonComponents/DiscourseTopic';
import ToolTitle from './components/ToolTitle';
import 'react-tabs/style/react-tabs.css';
import { baseURL } from '../../configs/url.config';
// import ReactGA from 'react-ga'; 
import { PageView, initGA } from '../../tracking';

class ToolDetail extends Component {

  // initialize our state
  state = {
    id: '',
    data: [],
    reviewData: [],
    key: 'Reviews',
    activeKey: false,
    selectedItem: 'tab-1',
    isLoading: true,
    userState: [{
      loggedIn: false,
      role: "Reader",
      id: null,
      name: null
    }],
    toolAdded: false,
    toolEdited: false,
    reviewAdded: false,
    replyAdded: false,
    discourseTopic: null
  };

  constructor(props) {
    super(props);
    this.state.userState = props.userState;
  }

  // on loading of tool detail page
  componentDidMount() {
    if (!!window.location.search) {
      var values = queryString.parse(window.location.search);
      this.setState({ toolAdded: values.toolAdded });
      this.setState({ toolEdited: values.toolEdited });
      this.setState({ reviewAdded: values.reviewAdded });
      this.setState({ replyAdded: values.replyAdded })
    }

    initGA('UA-166025838-1');
    PageView();
    
    this.getDataSearchFromDb(); 
  }


  // on loading of tool detail page were id is different
  componentDidUpdate() {
    if (this.props.match.params.toolID !== this.state.id && this.state.id !== '' && !this.state.isLoading) {
      this.getDataSearchFromDb();
    }
  }

  getDataSearchFromDb = () => {
    //need to handle error if no id is found
    this.setState({ isLoading: true });
    axios.get(baseURL + '/api/v1/tools/' + this.props.match.params.toolID)
      .then((res) => {
        this.setState({
          data: res.data.data[0],
          reviewData: res.data.reviewData,
          discourseTopic: res.data.discourseTopic,
          isLoading: false
        });
        document.title = res.data.data[0].name.trim();
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
    const { searchString, data, isLoading, userState, toolAdded, toolEdited, reviewAdded, replyAdded, reviewData, discourseTopic } = this.state;

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

          {toolAdded ?
            <Row className="">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <Alert variant="success" className="mt-3">Done! Someone will review your tool and let you know when it goes live</Alert>
              </Col>
              <Col sm={1} lg={10} />
            </Row>
            : ""}

          {toolEdited ?
            <Row className="">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <Alert variant="success" className="mt-3">Done! Your tool has been updated</Alert>
              </Col>
              <Col sm={1} lg={10} />
            </Row>
            : ""}

          {data.activeflag === "review" ?
            <Row className="">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <Alert variant="warning" className="mt-3">Your tool is pending review. Only you can see this page.</Alert>
              </Col>
              <Col sm={1} lg={10} />
            </Row>
            : ""}

          {reviewAdded ?
            <Row className="">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <Alert variant="warning" className="mt-3">Done! Your review is pending review.</Alert>
              </Col>
              <Col sm={1} lg={10} />
            </Row>
            : ""}

          {replyAdded ?
            <Row className="">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <Alert variant="success" className="mt-3">Done! Your reply has been added.</Alert>
              </Col>
              <Col sm={1} lg={10} />
            </Row>
            : ""}

          <ToolTitle data={data} reviewData={reviewData} />

          <Row>
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>

              <Row className="mt-4">
                <Col sm={10} lg={10}>
                  <span className="Black500-16px">Uploaded by ( {data.authors.length} )</span>
                </Col>
              </Row>

              <Row>
                {data.persons.map((author) =>
                  <Col sm={6} lg={6} key={author.id}>
                    <Creators key={author.id} author={author} />
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
                  <Tab eventKey="Reviews" title={'Reviews (' + reviewData.length + ')'}>
                    <Reviews data={data} userState={userState} reviewData={reviewData} />
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
            <Col sm={1} lg={1} />
          </Row>
        </Container>
        <Navbar fixed="bottom" className="mr-5 mb-5" >
          <Nav className="ml-auto">
            <Row>
              <p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeY13LesZ_oMAH_qFdb2cS6b3s7wSf3DQJdwdxGdBcn_gxrfw/viewform" target="_blank" rel="noopener noreferrer" className="Purple-14px" id="UnderlinedLink">
                  Send feedback
                </a>
              </p>
            </Row>
          </Nav>
        </Navbar>

        <Navbar fixed="bottom" className="mr-5 mb-2" >
          <Nav className="ml-auto">
            <Row>
              <p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfadX38bzD5qId2GARODJ7Mv4qHktYoEWY0fL7DcAFmbUuyxw/viewform" target="_blank" rel="noopener noreferrer" className="Purple-14px" id="UnderlinedLink">
                  Report a problem
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

export default ToolDetail;