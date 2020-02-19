
// /ShowObjects/Title.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ProjectTitle extends Component {

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
        <div>
            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <div className="Rectangle">
                        <Row>
                            <Col xs={12} md={12}>
                                <p>
                                    <span className="Black-20px">{data.name}</span>
                                </p>
                                
                                {data.tags.length <= 0 ? 'NO SEARCH RESULT' : data.tags.map((tag) => {
                                    return <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2">{tag}</div>
                                })}
                            </Col>
                            <Col xs={12} md={12} className="mb-2 mt-2">
                                <span className="Gray800-14px">
                                {data.description}
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
                                {data.tags.length <= 0 ? 'NO SEARCH RESULT' : data.tags.map((tag) => {
                                    return <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2">{tag}</div>
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
                                <a href={data.link} className="Purple-14px"> 
                                    {data.link}
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

export default ProjectTitle;