import React, { Component, Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DiscoursePost from './DiscoursePost';
import DiscourseAddPost from './DiscourseAddPost';
import NotFound from '../commonComponents/NotFound';

class DiscourseTopic extends Component {
  constructor(props) {
    super(props);
    this.state.topic = props.topic;
    this.state.toolId = props.toolId;
  }

  // initialize our state
  state = {
    topic: null,
    toolId: null,
  };

  render() {
    const { topic, toolId } = this.state;
    return (
      <div>
        <Row className='mt-4 mb-3'>
          <Col xs={12} md={12}>
            <DiscourseAddPost topicLink={topic && topic.link} toolId={toolId} />
          </Col>
        </Row>
        {topic && topic.posts && topic.posts.length ? (
          topic.posts.map((post) => <DiscoursePost post={post} />)
        ) : (
          <NotFound word='comments' />
        )}
      </div>
    );
  }
}

export default DiscourseTopic;
