
// /ShowObjects.js
import React, { Component } from 'react';
import axios from 'axios';
import ProjectTitle from './components/ProjectTitle';
import Creators from './components/Creators';
import Container from 'react-bootstrap/Container';
import SearchBar from './components/SearchBar';
import Tool from './components/Tool';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DataSet from '../pages/components/DataSet';
import NotFound from './components/NotFound';
import Alert from 'react-bootstrap/Alert';
import queryString from 'query-string';
import Loading from './components/Loading'

var baseURL = require('./../BaseURL').getURL();

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
    axios.get(baseURL + '/api/project/' + this.props.match.params.projectID)
      .then((res) => {
        console.log(res.data.data[0])
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
    const { searchString, data, isLoading, projectAdded, projectEdited, userState } = this.state;

    if (isLoading) {
      return <Container><Loading /></Container>;
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


          <ProjectTitle data={data} />

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
                  <Tab eventKey="Tools" title={'Tools used in this (' + data.toolids.length + ')'}>
                    {data.toolids.length <= 0 ? <NotFound word="tools" /> : data.toolids.map((id) => {
                      return <Tool id={id} />
                    })}
                  </Tab>
                  <Tab eventKey="Data sets" title={'Data sets used in this (' + data.datasetids.length + ')'}>
                    {data.datasetids.length <= 0 ? <NotFound word="data sets" /> : data.datasetids.map(id => <DataSet id={id} />)}
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