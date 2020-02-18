
// /ShowObjects.js
import React, { Component } from 'react';
import axios from 'axios';
// import PersonTitle from './components/PersonTitle';
// import ProjectTitle from './components/ProjectTitle';
// import Tool from './components/Tool';
// import Person from './components/Person';
import Tags from './components/Tags';
import Reviews from './components/Reviews';
import Creators from './components/Creators';
import Project from './components/Project';
import ToolsUsed from './components/ToolsUsed';
import ToolsCreated from './components/ToolsCreated';
import ToolTitle from './components/ToolTitle';
import SearchBar from './components/SearchBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

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

class ToolDetail extends Component {

  // initialize our state
  state = {
    data: [],
    id: '',
    type: '',
    name: '',
    description: '',
    rating: '',
    link: '',
    tags: [],
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
    if (this.props.match.params.toolID != this.state.id && this.state.id != '' && !this.state.isLoading) {
      this.getDataSearchFromDb();
    }
  }

  getDataSearchFromDb = () => {
    //need to handle error if no id is found
    this.setState({ isLoading: true });
    axios.get(baseURL+'/api/tool/'+this.props.match.params.toolID)
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
        <ToolTitle id={id} type={type} name={name} description={description} rating={rating} link={link} tags={tags} />
        {/* <Tags /> */}

        {/* <div> */}
        <Row className="mt-5">
          {/* <Col>
            <Card> */}
              <Col sm={12}>
              <span className="Black-16px">Reviews</span>
              <span className="Gray700-13px">  ·  x reviews  ·  x average</span>
              </Col>
            {/* </Card>
          </Col> */}
        </Row>

        <Reviews />
        {/* </div> */}

        {/* <Creators /> */}

        <Row className="mt-5">
              <Col sm={12} className="Black-16px"> Research projects using it (x) </Col>
        </Row>

        <Project id={id} type={type} name={name} description={description} rating={rating} link={link} tags={tags}  />
        {/* <ToolsUsed /> */}
        {/* <ToolsCreated /> */}
      </Container>
    );
  }
}

export default ToolDetail;