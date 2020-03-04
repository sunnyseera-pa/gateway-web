
// /ShowObjects/Reviews.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from 'react-rating';
import { ReactComponent as EmptyStarIconSvg} from '../../images/starempty.svg';
import { ReactComponent as FullStarIconSvg} from '../../images/star.svg';
import Button from 'react-bootstrap/Button';

class Reviews extends Component {

  constructor(props) {
    super(props)
    this.state.data = props.data;
  }

  // initialize our state
  state = {
    data: [],
    // isLoading: true 
  };


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const {data } = this.state;
    // const Rating = require('react-rating');
    return (
      <div>
        <Row className="mt-4 mb-3">
          <Col xs={12} md={12}>
          <Button variant="light" href={'/addreview/' + data.id} id="AddReviewButton">
           {/* <Button variant="light" href='/addreview' id="AddReviewButton"> */}
              + Add a review
              {/* {data.id} */}
            </Button>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col>
            <div className="Rectangle">
        <Row>
                <Col xs={12} md={12}>
                  <span className="Gray800-14px">“Bloody brilliant”</span>
                </Col>

                <Col xs={6} md={6} className="mt-2">
                  <span className="text-left Purple-13px">Danny Dust</span>
                  <span className="text-left Gray500-13px">  on 12 Jun 2018</span>
                </Col>
                <Col xs={6} md={6} className="mb-1 text-right">
                  <Rating emptySymbol={<EmptyStarIconSvg />} fullSymbol={<FullStarIconSvg />} placeholderSymbol={<FullStarIconSvg />} placeholderRating={4.3} readonly={true} />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        </div>
    );
  }
}

export default Reviews;