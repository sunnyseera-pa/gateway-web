
// /ShowObjects/Title.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class ToolTitle extends Component {

  constructor(props) {
    super(props)
    this.state.id = props.id;
    this.state.type = props.type;
    this.state.name = props.name;
    this.state.description = props.description;
    this.state.rating = props.rating;
    this.state.link = props.link;
    this.state.tags = props.tags;
  }

  // initialize our state
  state = {
    id: '',
    type: '',
    name: '',
    description: '',
    rating: '',
    link: '',
    tags: []
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { id, type, name, description, rating, link, tags} = this.state;

    return (
        <div>
            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <div className="Rectangle">
                        <Row>
                            <Col xs={7} md={8}>
                                <p>
                                    <span className="Black-16px">{name}</span>
                                    <br />
                                    <span className="Gray800-14px">Laure Santos</span>
                                </p>
                                
                                {tags.length <= 0 ? 'NO SEARCH RESULT' : tags.map((tag) => {
                                    return <div className="mr-2 Gray800-14px tagBadges mb-3 mt-2">{tag}</div>
                                })}
                            </Col>
                            <Col xs={5} md={4} className="iconHolder">
                                <Image src={require("../../images/tableau.jpg")} id="Logo" />
                            </Col>
                            <Col xs={12} md={12} className="mb-3">
                                <span className="Gray800-14px">
                                    Software to analyse data and with powerful graphics to create interactive visualisations - focused on business intelligence. Including data access to data prep to get data ready for analysis, to data analytics and discovery.
                                </span>
                            </Col>
                        </Row>    
                    </div>
                </Col>
                <Col sm={1} lg={10}/>
            </Row>
            <Row>
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <div className="Rectangle">
                        <Row>
                            <Col xs={12} md={12}>
                                {tags.length <= 0 ? 'NO SEARCH RESULT' : tags.map((tag) => {
                                    return <div className="mr-2 Gray800-14px tagBadges">{tag}</div>
                                })}
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col sm={1} lg={10}/>
            </Row>
            <Row>
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <div className="Rectangle">
                        <Row>
                            <Col>
                                <a href={link} className="Purple-14px"> 
                                    {link}
                                </a>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col sm={1} lg={10}/>
            </Row>
        </div>
    );
  }
}

export default ToolTitle;