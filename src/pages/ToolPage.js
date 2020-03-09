
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
import PersonTitle from '../pages/components/PersonTitle';
import ToolsUsed from './components/ToolsUsed';
import Creators from '../pages/components/Creators';
// import AddProjectPage from './AddProjectPage';
import AddToolPage from './AddToolPage';
import ToolInfoReviewForm from './components/ToolInfoReviewForm';
import queryString from 'query-string';
import Alert from 'react-bootstrap/Alert';
import NotFound from './components/NotFound';

var baseURL = require('./../BaseURL').getURL();

class ToolDetail extends Component {

  // initialize our state
  state = {
    id: '',
    data: [],
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
    reviewAdded: false
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
      this.setState({ reviewAdded: values.reviewAdded });
  }
    this.getDataSearchFromDb();
  }


  // on loading of tool detail page were id is different
  componentDidUpdate() {
    if (this.props.match.params.toolID != this.state.id && this.state.id != '' && !this.state.isLoading) {
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
    const { searchString, data, isLoading, userState, toolAdded, reviewAdded } = this.state;

    if (typeof data.datasetids === 'undefined') {
      data.datasetids = [];
    }

    if (typeof data.projectids === 'undefined') {
      data.projectids = [];
    }

    if (isLoading) {
      return <p>Loading ...</p>;
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
          <Alert variant="success" className="mt-3">Done! Your review has been added.</Alert> 
          </Col>
            <Col sm={1} lg={10} />
          </Row>
          : ""}

          {/* <AddProjectPage /> */}
          {/* <AddToolPage /> */}

          <ToolTitle data={data} />
          {/* <ToolInfoReviewForm data={data} /> */}


          {/* <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((dat) => (
                <li style={{ padding: '10px' }} key={data.message}>
                  <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                </li>
              ))}
        </ul> */}


          
          <Row className="mt-4">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <span className="Black500-16px">Authors ( {data.authors.length} )</span>
            </Col>
            <Col sm={1} lg={10} />
          </Row>
  
          {data.authors.map(author => 
          <Row>
          <Col sm={1} lg={1} />
          <Col sm={5} lg={5}>
          
              <Creators id={author} />
         
          </Col>
           <Col sm={1} lg={1} />
          </Row>
         )}
       
       
       {/* {data.authors.map(author => 
          <Row>
          <Col sm={1} lg={1} />
          <Col sm={5} lg={5}>
              <Creators id={author} />
          </Col>
          <Col sm={5} lg={5}>
              <Creators id={author} />
          </Col>
           <Col sm={1} lg={1} />
          </Row>
         )} */}


          <Row className="mt-3">

            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <div>
                <Tabs className='TabsBackground Gray700-13px'>
                  <Tab eventKey="Reviews" title={'Reviews (' + data.reviews.length + ')'}>
                    <Reviews data={data} userState={userState} />
                  </Tab>
                  <Tab eventKey="Data sets" title={'Data sets (' + data.datasetids.length + ')'}>
                  {data.datasetids.length <= 0 ? <NotFound word="data sets" /> : data.datasetids.map(id => <DataSet id={id} />)}
                    {/* {data.datasetids.map(id => <DataSet id={id} />)} */}
                  </Tab>
                  <Tab eventKey="Projects" title={'Projects (' + data.projectids.length + ')'}>
                  {data.projectids.length <= 0 ? <NotFound word="projects" /> : data.projectids.map(id => <Project id={id} />)}
                    {/* {data.projectids.map(id => <Project id={id} />)} */}
                  </Tab>
                </Tabs>
              </div>
            </Col>
            <Col sm={1} lg={1} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default ToolDetail;