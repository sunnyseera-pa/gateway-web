
// /ShowObjects/Title.js
import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import SVGIcon from "../../images/SVGIcon"
import '../../css/hdruk.css';
// import logo from "../../images/tableau.jpg";

class ProjectTitle extends Component {

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
      // <div className="Rectangle">
      //   <p>Title = {id} = {type}</p>
      <div>
          <Row className="mt-1">
                <Col></Col>
                <Col>
                    <Card className="Rectangle">
                        <Card.Body>   
                            <Row className="mb-2">
                                <Col sm={12} className="text-left " className="Black-20px">{name}</Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Category? </Badge>
                                </Col>
                            </Row>    
                            <Row id="projectTitleEmptyRow"></Row>
                            <Row>
                                <Col sm={12} className="Gray800-14px"> {description} </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
           </Row>

          <Row className="mt-0.5">
                <Col></Col>
                <Col>
                  <Card className="Rectangle">
                      <Card.Body>   
                      {/* <Container> */}
                          <Row>
                              <Col sm={12}>
                                  <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag1 </Badge>
                                  <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag2 </Badge>
                                  <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag3 </Badge>
                                  <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag4 </Badge>
                              </Col>
                          </Row>    
                      {/* </Container> */}
                      </Card.Body>
                  </Card>
              </Col>
             <Col></Col>
          </Row>

          <Row className="mt-0.5">
                <Col></Col>
                <Col>
                  <Card className="Rectangle">
                      <Card.Body>   
                      {/* <Container> */}
                          <Row className="mb-1">
                              <Col sm={12} className="text-left " className="Purple-14px"> {link} </Col>
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

export default ProjectTitle;