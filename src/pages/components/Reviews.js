
// /ShowObjects/Reviews.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Rating from 'react-rating';
// const Rating = require('react-rating');
import SVGIcon from "../../images/SVGIcon";
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
                <Col></Col>
                <Col>
                    <Card className="Rectangle">
                        <Card.Body>   
                        {/* <Container> */}
                            <Row className="mb-2">
                                <Col sm={12} className="text-left Gray800-14px">"Review"</Col>
                            </Row>
                            <Row>
                                <Col sm={9}>
                                  <span className="text-left Gray700-13px"> Written by </span>
                                  <span className="text-left Purple-13px"> reviewer name </span>
                                  <span className="text-left Gray700-13px"> on this date </span>
                                </Col>
                                <Col sm={3}>
                                  {/* <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" 
                                  start={1} stop={5} placeholderRating={3.5}> </Rating> */}
                                 {/* <Rating placeholderRating={4}
                                emptySymbol={<img src="../../images/emptystar.svg" className="icon" />}
                                placeholderSymbol={<img src="assets/images/star-red.png" className="icon" />}
                                fullSymbol={<img src="assets/images/star-yellow.png" className="icon" />} /> */}

                                <Rating  emptySymbol={<EmptyStarIconSvg />}
                                         fullSymbol={<FullStarIconSvg />} 
                                         placeholderSymbol={<FullStarIconSvg />}
                                         placeholderRating={4}
                                         />

                                </Col>
                            </Row>
                            
                        {/* </Container> */}
                        </Card.Body>
                    </Card>
            </Col>
            <Col></Col>
            </Row>
    );
  }
}

export default Reviews;