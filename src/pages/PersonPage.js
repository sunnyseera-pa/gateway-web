
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
    data: [],
    tags: [],
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
    axios.get(baseURL+'/api/person/'+this.props.match.params.personID)
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
      <Container style={{width: 800}}>
        <SearchBar />
        <PersonTitle id={id} type={type} name={name} description={description} rating={rating} link={link} />
        {/* <Tags /> */}
        {/* <Reviews /> */}
        {/* <Creators /> */}

        <Row className="mt-5">
              <Col sm={12} className="Black-16px"> Tools created (x) </Col>
        </Row>
        <Tool />

        <Row className="mt-5">
              <Col sm={12} className="Black-16px"> Tools reviewed (x) </Col>
        </Row>
        <ToolsUsed />
        {/* <ToolsCreated /> */}

        <Row className="mt-5">
              <Col sm={12} className="Black-16px"> Research projects (x) </Col>
        </Row>
        <Project />

     </ Container>
    );
  }
}

export default PersonDetail;