
// /ShowObjects.js
import React, { Component } from 'react';
import axios from 'axios';
import ProjectTitle from './components/ProjectTitle';
import Tags from './components/Tags';
import Reviews from './components/Reviews';
import Creators from './components/Creators';
import Project from './components/Project';
import ToolsUsed from './components/ToolsUsed';
import ToolsCreated from './components/ToolsCreated';
import Container from 'react-bootstrap/Container';
import SearchBar from './components/SearchBar';
import Tool from './components/Tool';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

var baseURL = window.location.href;

if (!baseURL.includes('localhost')) {
    var rx = /^([http|https]+\:\/\/[a-z]+)(.*)/;
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
    data: [],
    id: '',
    type: '',
    name: '',
    description: '',
    rating: '',
    link: '',
    isLoading: true
  };

  constructor(props) {
    super(props);
  }

  // on loading of tool detail page
  componentDidMount() {
    this.getDataSearchFromDb();

    document.body.style.backgroundColor = "#f6f7f8";
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
        data: res.data.data, 
        id: res.data.data[0].id, 
        type: res.data.data[0].type,
        name: res.data.data[0].name,
        description: res.data.data[0].description,
        rating: res.data.data[0].rating,
        link: res.data.data[0].link,
        tags: res.data.data[0].tags,
        isLoading: false 
      });
    })
  };

  render() {
    const {id, type, name, description, rating, link, tags, isLoading } = this.state;
    
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    
    return (
      <div>
      {/* <Container style={{width: 800}}> */}
        <SearchBar />
        <Container style={{width: 800}}>
        <ProjectTitle id={id} type={type} name={name} description={description} rating={rating} link={link} tags={tags} />
        {/* <Tags /> */}
        {/* <Reviews /> */}

        <Row className="mt-5">
              <Col sm={12} className="Black-16px"> Authors (x) </Col>
        </Row>
        <Creators />
        {/* <Project /> */}
        <Row className="mt-5">
              <Col sm={12} className="Black-16px"> Tools created as part of this research project (x) </Col>
        </Row>
        <Tool />

        <Row className="mt-5">
              <Col sm={12} className="Black-16px"> Tools used (x) </Col>
        </Row>
        <ToolsUsed />
        {/* <ToolsCreated /> */}
      </Container>
     </div>
    );
  }
}

export default ProjectDetail;