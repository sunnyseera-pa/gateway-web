
// /ShowObjects.js
import React, { Component } from 'react';
import axios from 'axios';
import PersonTitle from './components/PersonTitle';
import Tags from './components/Tags';
import Reviews from './components/Reviews';
import Creators from './components/Creators';
import Project from './components/Project';
import ToolsUsed from './components/ToolsUsed';
import ToolsCreated from './components/ToolsCreated';
import Container from 'react-bootstrap/Container';
import SearchBar from './components/SearchBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tool from './components/Tool';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DataSet from '../pages/components/DataSet';

var baseURL = require('./../BaseURL').getURL();

/* 
{"success":true,"data":[
  {"tags":["Host","Repository"],
  "_id":"5e3beea31c9d440000e8d49a",
  "id":17383930,
  "type":"tool",
  "name":"Github GISTs",
  "description":"Development platform to host and review code, and to manage projects to build software, as well as to share code, notes and snippets across a community developers.",
  "rating":4,
  "link":"https://gist.github.com/discover",
  "_v":0}]
}
*/

class PersonDetail extends Component {

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
      firstName: null
    }]
  };

  constructor(props) {
    super(props);
    this.state.userState = props.userState;
  }

  // on loading of tool detail page
  componentDidMount() {
    this.getDataSearchFromDb();
  }

  // on loading of tool detail page were id is different
  componentDidUpdate() {
    if (this.props.match.params.personID != this.state.id && this.state.id != '' && !this.state.isLoading) {
      this.getDataSearchFromDb();
    }
  }

  getDataSearchFromDb = () => {
    //need to handle error if no id is found
    this.setState({ isLoading: true });
    axios.get(baseURL + '/api/person/' + this.props.match.params.personID)
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
        window.location.href = window.location.search + "/search?search=" + this.state.searchString + '&type=all';
      }
    }
  }

  updateSearchString = (searchString) => {
    this.setState({ searchString: searchString });
  }

  render() {
    const { searchString, data, isLoading, userState } = this.state;

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
        <Container className="mb-5">

          <PersonTitle data={data} />

          <Row className="mt-3">

            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <div>
                <Tabs className='TabsBackground Gray700-13px'>
                  <Tab eventKey="Tools" title="Tools (2)">
                    <Tool data={data} />
                  </Tab>
                  <Tab eventKey="Reviews" title="Reviews (5)">
                    <Reviews data={data} />
                  </Tab>
                  <Tab eventKey="Data sets" title="Data sets (1)">
                    <DataSet />
                  </Tab>
                  <Tab eventKey="Projects" title="Projects (1)">
                    <Project data={data} />
                  </Tab>
                </Tabs>
              </div>
            </Col>
            <Col sm={1} lg={1} />
          </Row>

          {/*  <Row className="mt-5">
            <Col sm={12} className="Black-16px"> Tools created (x) </Col>
          </Row>
          <Tool data={data} />

          <Row className="mt-5">
            <Col sm={12} className="Black-16px"> Tools reviewed (x) </Col>
          </Row>
          <ToolsUsed data={data} />

          <Row className="mt-5">
            <Col sm={12} className="Black-16px"> Research projects (x) </Col>
          </Row>
          <Project data={data} /> */}

        </ Container>
      </div>
    );
  }
}

export default PersonDetail;