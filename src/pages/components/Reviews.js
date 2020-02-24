
// /ShowObjects/Reviews.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from 'react-rating';
import { ReactComponent as EmptyStarIconSvg} from '../../images/starempty.svg';
import { ReactComponent as FullStarIconSvg} from '../../images/star.svg';

class Reviews extends Component {
  // initialize our state
  state = {
    
  };


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    // const Rating = require('react-rating');
    return (
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
    );
  }
}

export default Reviews;