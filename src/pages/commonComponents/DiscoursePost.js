import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Moment from 'react-moment';

class DiscoursePost extends React.Component {
  constructor(props) {
    super(props);
    this.state.post = props.post;
  }

  // initialize our state
  state = {
    post: null,
  };

  render() {
    const { post } = this.state;
    return (
      <Row className="mt-2">
        <Col>
          <div className="Rectangle">
            <Row>
              <Col xs={12} md={12}>
                <span className="Gray800-14px"><div dangerouslySetInnerHTML={ {__html: post.cooked} } /></span>
              </Col>
              <Col xs={6} md={6} className="mt-2">
                <span className="text-left Purple-13px">{post.username}</span>
                <span className="text-left Gray500-13px"> on <Moment format="DD MMM YYYY">{post.created_at}</Moment></span>
              </Col>
              <Col xs={6} md={6} className="mb-1 text-right">
                {/* <Rating emptySymbol={<EmptyStarIconSvg />} fullSymbol={<FullStarIconSvg />} placeholderSymbol={<FullStarIconSvg />} placeholderRating={review.rating} readonly={true} /> */}
              </Col>
              <Col xs={12} md={12} className="text-right">
                {/* <ReplyButton data={data} userState={userState} review={review} /> */}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}

export default DiscoursePost;
