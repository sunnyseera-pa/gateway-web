
// /ShowObjects/Title.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ProjectTitle extends Component {

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
    const { id, type, name, description, rating, link, tags } = this.state;
    return (
        <div>
            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <div className="Rectangle">
                        <Row>
                            <Col xs={12} md={12}>
                                <p>
                                    <span className="Black-20px">{name}</span>
                                </p>
                                
                                {tags.length <= 0 ? 'NO SEARCH RESULT' : tags.map((tag) => {
                                    return <div className="mr-2 Gray800-14px tagBadges mb-3 mt-2">{tag}</div>
                                })}
                            </Col>
                            <Col xs={12} md={12} className="mb-3">
                                <span className="Gray800-14px">
                                The ketogenic diet is a medically supervised high-fat, low-carbohydrate diet that has been found useful in patients with refractory epilepsy. It has been shown to be effective in treating multiple seizure types and epilepsy syndromes. In this paper, we review the use of the ketogenic diet in epileptic encephalopathies such as Ohtahara syndrome, West syndrome, Dravet syndrome, epilepsy with myoclonic atonic seizures, and Lennox-Gastaut syndrome.
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

export default ProjectTitle;