// /ShowObjects/Title.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { ReactComponent as PersonPlaceholderSvg } from '../../images/person-placeholder.svg';

class PersonTitle extends Component {

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
        <Row className="mt-1">
          <Col sm={1} lg={1} />
          <Col sm={10} lg={10}>
            <Card className="Rectangle">
              <Card.Body>
                <Row className="mb-2">
                  <Col sm={10} className="text-left ">
                    <p className="Black-20px"> {data.firstname} {data.lastname} </p>
                    {!data.bio ? '' : <p className='Gray800-14px'> {data.bio} </p>}
                  </Col>
                  <Col sm={2}>
                    <PersonPlaceholderSvg />
                  </Col>
                </Row>

                <Row>
                  {!data.orcid ? '' :
                    <Col xs={12} md={12}>

                      <span className='Gray800-14px'> ORCID </span>
                      <span className='Purple-14px'> {data.orcid} </span>
                    </Col>
                  }
                </Row>

                <Row>
                  {!data.link ? '' :
                    <Col xs={12} md={12}>
                      <span>
                        <a href={data.link} className="Purple-14px">
                          {data.link}
                        </a>
                      </span>
                    </Col>
                  }
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={1} lg={1} />
        </Row>
      </div>

    );
  }
}

export default PersonTitle;