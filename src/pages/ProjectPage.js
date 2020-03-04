
// /ShowObjects.js
import React, { Component } from 'react';
import axios from 'axios';
import ProjectTitle from './components/ProjectTitle';
import Creators from './components/Creators';
import ToolsUsed from './components/ToolsUsed';
import Container from 'react-bootstrap/Container';
import SearchBar from './components/SearchBar';
import Tool from './components/Tool';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DataSet from '../pages/components/DataSet';

var baseURL = require('./../BaseURL').getURL();

class ProjectDetail extends Component {
  // initialize our state
  state = {
    searchString: null,
    id: '',
    data: [],
    isLoading: true
  };

  constructor(props) {
    super(props);
  }

  // on loading of tool detail page
  componentDidMount() {
    this.getDataSearchFromDb();
    
  }

  // on loading of tool detail page were id is different
  componentDidUpdate() {
    if (this.props.match.params.projectID != this.state.id && this.state.id != '' && !this.state.isLoading) {
      this.getDataSearchFromDb();
    }
  }

  getDataSearchFromDb = () => {
    //need to handle error if no id is found
    this.setState({ isLoading: true });
    axios.get(baseURL+'/api/project/'+this.props.match.params.projectID)
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
            window.location.href = window.location.search+"/search?search="+this.state.searchString + '&type=all';
        }
    }
  }

  updateSearchString = (searchString) => {
    this.setState({ searchString: searchString});
  }

  render() {
    const {searchString, data, isLoading } = this.state;
    
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    if (typeof data.toolids === 'undefined') {
        data.toolids = [];
    }

    if (typeof data.datasetids === 'undefined') {
        data.datasetids = [];
    }

    if (typeof data.personids === 'undefined') {
        data.personids = [];
    }
    
    return (
      <div>
        <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} />
        <Container className="mb-5">
          <ProjectTitle data={data} />

          <Row className="mt-4">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <span className="Black500-16px">Authors (2)</span>
            </Col>
            <Col sm={1} lg={10} />
          </Row>
          <Row>
            <Col sm={1} lg={1} />
            <Col sm={5} lg={5}>
              <Creators data={data} />
            </Col>
            <Col sm={5} lg={5}>
              <Creators data={data} />
            </Col>
            <Col sm={1} lg={10} />
          </Row>

            <Row  className="mt-3">

              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <div>
                  <Tabs className='TabsBackground Gray700-13px'>
                    <Tab eventKey="Tools" title={'Tools ('+data.toolids.length+')'}>
                      <Tool data={data} />
                      {/* <ToolsUsed data={data} /> */}
                    </Tab>
                    <Tab eventKey="Data sets" title={'Data sets ('+data.datasetids.length+')'}>
                    { data.datasetids.map(id => <DataSet datasetid={id} />) }
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

export default ProjectDetail;