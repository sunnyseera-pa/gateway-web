
// /ShowObjects/Title.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import '../../css/hdruk.css';
// import logo from "../../images/tableau.jpg";

class Creators extends Component {

  constructor(props) {
    super(props)
    this.state.data = props.data;
  }

  // initialize our state
  state = {
    data: []
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <a className="searchHolder" href={'/tool/' + data.id} >
                        <div className="Rectangle">
           
                            <Row>
                                <Col sm={2}> 
                                  <Image src={require("../../images/bob.jpg")} id="Picture" roundedCircle />
                                </Col>
                                <Col sm={10} className="text-left "> 
                                    <p className="Black-16px"> name </p>
                                    <p className="Gray700-13px"> company </p>
                                </Col>
                                <Col sm={2} />
                            </Row>
                            </div>
                    </a>
                </Col>
                <Col sm={1} lg={10}/>
            </Row>       

     

    );
  }
}

export default Creators;