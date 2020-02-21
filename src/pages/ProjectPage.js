
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

var baseURL = window.location.href;

if (!baseURL.includes('localhost')) {
    var rx = /^([http|https]+\:\/\/[a-z]+)([^/]*)/;
    var arr = rx.exec(baseURL);
    if (arr.length > 0) {
        //add -api to the sub domain for API requests
        baseURL = arr[1]+'-api'+arr[2]
    }

} else {
    baseURL = 'http://localhost:3001'
}

class ProjectDetail extends Component {
  // initialize our state
  state = {
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

  render() {
    const {data, isLoading } = this.state;
    
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    
    return (
      <div>
        <SearchBar />
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
                    <Tab eventKey="Tools" title="Tools (3)">
                      <Tool data={data} />
                      {/* <ToolsUsed data={data} /> */}
                    </Tab>
                    <Tab eventKey="Data sets" title="Data sets (1)">
                      <DataSet />
                    </Tab>
                  </Tabs>
                </div>
              </Col>
              <Col sm={1} lg={1} />
            </Row>

          {/* <Row className="mt-4">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <span className="Black500-16px">Authors (2)</span>
            </Col>
            <Col sm={1} lg={10} />
          </Row>
          <Creators data={data} />
          <Row className="mt-4">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <span className="Black500-16px">Tools created as part of this research project (2)</span>
            </Col>
            <Col sm={1} lg={10} />
          </Row>
          <Row>
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <Tool data={data} />
            </Col>
            <Col sm={1} lg={1} />
          </Row>
          <Row className="mt-4">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <span className="Black500-16px">Tools used (2)</span>
            </Col>
            <Col sm={1} lg={10} />
          </Row>
          <ToolsUsed data={data} /> */}

        </Container>
      </div>
    );
  }
}

export default ProjectDetail;