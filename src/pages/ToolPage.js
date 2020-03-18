
// /ShowObjects.js
import React, { Component } from 'react';
import axios from 'axios';
import Reviews from './components/Reviews';
import Project from './components/Project';
import ToolTitle from './components/ToolTitle';
import SearchBar from './components/SearchBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import 'react-tabs/style/react-tabs.css';
import DataSet from '../pages/components/DataSet';
import Creators from '../pages/components/Creators';
import queryString from 'query-string';
import Alert from 'react-bootstrap/Alert';
import NotFound from './components/NotFound';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Loading from './components/Loading'

var baseURL = require('./../BaseURL').getURL();

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
    replyAdded: false
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
    axios.get(baseURL + '/api/tool/' + this.props.match.params.toolID)
      .then((res) => {
        this.setState({
          data: res.data.data[0],
          reviewData: res.data.reviewData,
          isLoading: false
        });
      })
  };

  doSearch = (e) => { //fires on enter on searchbar
    if (e.key === 'Enter') {
      if (!!this.state.searchString) {
        window.location.href = "/search?search=" + this.state.searchString + '&type=all';
      }
    }
  }

  updateSearchString = (searchString) => {
    this.setState({ searchString: searchString });
  }

  render() {
    const { searchString, data, isLoading, userState, toolAdded, toolEdited, reviewAdded, replyAdded, reviewData } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    if (typeof data.datasetids === 'undefined') {
      data.datasetids = [];
    }

    if (typeof data.projectids === 'undefined') {
      data.projectids = [];
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
                  <span className="Black500-16px">Authors ( {data.authors.length} )</span>
                </Col>
              </Row>

              <Row>
                {data.persons.map(author =>
                  <Col sm={6} lg={6}>
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
                  <Tab eventKey="Projects" title={'Projects using this (' + data.projectids.length + ')'}>
                    {data.projectids.length <= 0 ? <NotFound word="projects" /> : data.projectids.map(id => <Project id={id} />)}
                  </Tab>
                  <Tab eventKey="Data sets" title={'Data sets in the same projects (' + data.datasetids.length + ')'}>
                    {data.datasetids.length <= 0 ? <NotFound word="data sets" /> : data.datasetids.map(id => <DataSet id={id} />)}
                  </Tab>
                </Tabs>
              </div>
            </Col>
            <Col sm={1} lg={1} />
          </Row>
        </Container>

          {/* <Navbar sticky="bottom">  */}

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

          <Row className='AuthorCard'/>


      </div>
    );
  }
}

export default ToolDetail;