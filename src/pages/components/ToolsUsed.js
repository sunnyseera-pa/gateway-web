
// /ShowObjects/ToolsUsed.js
import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import SVGIcon from "../../images/SVGIcon"

class ToolsUsed extends Component {

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
        link: '',
        data: []
  };


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data, id, type, name, description, rating, link } = this.state;
    return (
          <Row className="mt-2">
          <Col />
          <Col>
              {/* <Card bg="#ffffff" style={{ height: 196, width: 800}}> */}
              <a style={{ cursor: 'pointer' }} href={'/tool/'+data.id} >
              <Card className="Rectangle">
                  <Card.Body>   
                  {/* <Container> */}
                      <Row className="mb-1">
                          <Col sm={1}> <SVGIcon name="toolicon" width={18} height={18} fill={'#3db28c'} /> </Col>
                          <Col sm={11}>
                            <span className="text-left " className="Black-16px"> Tool|Name {name} </span>
                            <span className="Gray700-13px">  ·  x reviews  ·  x average </span>
                          </Col>
                      </Row>
                      <Row className="mb-2">
                          <Col sm={1}> </Col>
                          <Col sm={11} className="text-left" className="Gray800-14px">"Actual review goes here Actual review goes here Actual review goes here Actual review goes here Actual review goes here Actual review goes here Actual review goes here Actual review goes here Actual review goes here Actual review goes here Actual review goes here Actual review goes here Actual review goes here"</Col>
                      </Row>
                      <Row> 
                          <Col sm={1}> </Col>
                          <Col sm={11}>
                            <span className="Purple-13px">Name</span>
                            <span className="Gray700-13px"> on date  ·  in relation to project </span>
                            <span className="Purple-13px">Project title</span>
                          </Col>
                      </Row>
                  {/* </Container> */}
                  </Card.Body>
              </Card>
              </a>
      </Col>
      <Col />
      </Row>
    );
  }
}

export default ToolsUsed;