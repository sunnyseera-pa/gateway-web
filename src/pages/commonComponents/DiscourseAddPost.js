import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

var baseURL = require('./BaseURL').getURL();

class DiscourseAddPost extends Component {
  constructor(props) {
    super(props);
    this.state.topicLink = props.topicLink;
    this.state.toolId = props.toolId;
  }

  // initialize our state
  state = {
    topicLink: null,
    toolId: null
  };

  render() {
    const { topicLink, toolId } = this.state;
    return (
      topicLink ? 
      <Button variant='light' id='discourse-add-comment' className='discourse-button mb-1' onClick={() => { window.open(topicLink) }}> 
        + Add a comment
      </Button>
      :
      <Button variant='light' id='discourse-add-comment' className='discourse-button mb-1' onClick={() => { createTopicAndRedirecToDiscourse(toolId) }}> 
        + Add a comment
      </Button>
    );
  }
}

const createTopicAndRedirecToDiscourse = async (toolId) => {

  if (!toolId) {
    return;
  }
  const res = await axios.put(baseURL + `/api/v1/discourse/topic/tool/${toolId}`);
  window.open(res.data.data.link);
}

export default DiscourseAddPost;
