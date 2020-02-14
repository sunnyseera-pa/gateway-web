
// /ShowObjects.js
import React, { Component } from 'react';
import axios from 'axios';
// import PersonTitle from './components/PersonTitle';
// import ProjectTitle from './components/ProjectTitle';
import Tags from './components/Tags';
import Reviews from './components/Reviews';
import Creators from './components/Creators';
import Project from './components/Project';
import ToolsUsed from './components/ToolsUsed';
import ToolsCreated from './components/ToolsCreated';
import ToolTitle from './components/ToolTitle';

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
      <div>
        <ToolTitle id={id} type={type} name={name} description={description} rating={rating} link={link} tags={tags} />
        <Tags />
        <Reviews />
        <Creators />
        <Project />
        <ToolsUsed />
        <ToolsCreated />
      </div>
    );
  }
}

export default ToolDetail;