// /ShowObjects/Title.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

class PersonTitle extends Component {

  constructor(props) {
    super(props)
    this.state.id = props.id;
    this.state.type = props.type;
    // this.state.name = props.name;
    // this.state.description = props.description;
    // this.state.rating = props.rating;
    this.state.link = props.link;
  }

  // initialize our state
  state = {
    id: '',
    type: '',
    // name: '',
    // description: '',
    // rating: '',
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
                        {/* <Container> */}
                            <Row className="mb-2">
                                <Col sm={10} className="text-left ">
                                   <p className="Black-20px"> Name </p> 
                                   <p className="Gray800-14px"> Company </p>
                                </Col>
                                <Col sm={2}> <Image src={require("../../images/bob.jpg")} id="BigPicture" roundedCircle /> </Col>
                            </Row> 
                            <Row>
                            <Col sm={12} className="text-left" className="Purple-14px">link1</Col>
                            </Row> 
                            <Row>
                            <Col sm={12} className="text-left" className="Purple-14px">Link2</Col>
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

export default PersonTitle;