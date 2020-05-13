import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class DiscourseAddPost extends Component {
  constructor(props) {
    super(props);
    this.state.topicLink = props.topicLink;
  }

  // initialize our state
  state = {
    topicLink: null,
  };

  render() {
    const { topicLink } = this.state;
    return (
      topicLink ? 
      <Button variant='light' id='discourse-add-comment' className='discourse-button mb-1' onClick={() => { window.open(topicLink) }}> 
        + Add a comment
      </Button>
      :
      <Button variant='light' id='discourse-add-comment' className='discourse-button mb-1' onClick={() => { window.open(topicLink) }}> 
        + Add a comment
      </Button>
    );
  }
}

export default DiscourseAddPost;
