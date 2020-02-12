
// /ShowObjects/Title.js
import React, { Component } from 'react';
import axios from 'axios';

class Title extends Component {

  constructor(props) {
    super(props)
    this.state.id = props.id;
    this.state.type = props.type;
    this.state.name = props.name;
    this.state.description = props.description;
    this.state.rating = props.rating;
    this.state.link = props.link;
  }

  // initialize our state
  state = {
    id: '',
    type: '',
    name: '',
    description: '',
    rating: '',
    link: ''
  };


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { id, type, name, description, rating, link } = this.state;
    return (
      <div className="Rectangle">
        <p>Title = {id} = {type}</p>

        
      </div>
    );
  }
}

export default Title;