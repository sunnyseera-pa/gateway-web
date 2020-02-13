
// /ShowObjects/Reviews.js
import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import SVGIcon from "../../images/SVGIcon"
import '../../css/hdruk.css';

class Reviews extends Component {
  // initialize our state
  state = {
    
  };


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    return (
      <div>
        <p>Reviews</p>

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
                                <Col sm={2} className="text-left Gray700-13px">Written by </Col>
                                <Col sm={3} className="text-left Purple-13px"> reviewer name </Col>
                                <Col sm={7} className="text-left Gray700-13px">on this date </Col>
                            </Row>
                            
                        {/* </Container> */}
                        </Card.Body>
                    </Card>
            </Col>
            <Col></Col>
            </Row>

      </div>
    );
  }
}

export default Reviews;