
// /ShowObjects.js
import React, { Component } from 'react';
import axios from 'axios';
import Title from './components/Title';
import Tags from './components/Tags';
import Reviews from './components/Reviews';
import Creators from './components/Creators';
import Project from './components/Project';
import ToolsUsed from './components/ToolsUsed';
import ToolsCreated from './components/ToolsCreated';

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
    axios.get('http://localhost:3001/api/tool/'+this.props.match.params.toolID)
    .then((res) => {
      this.setState({ 
        data: res.data.data, 
        id: res.data.data[0].id, 
        type: res.data.data[0].type,
        name: res.data.data[0].name,
        description: res.data.data[0].description,
        rating: res.data.data[0].rating,
        link: res.data.data[0].link,
        isLoading: false 
      });
    })
  };

  render() {
    const {id, type, name, description, rating, link, isLoading } = this.state;
    
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    
    return (
      <div>
        <Title id={id} type={type} name={name} description={description} rating={rating} link={link} />
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