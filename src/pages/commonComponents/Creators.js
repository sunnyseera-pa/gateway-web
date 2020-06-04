
// /ShowObjects/Title.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as PersonPlaceholderSvg } from '../../images/person-placeholder.svg';
import '../../css/hdruk.css';

class  Creators extends Component {

  constructor(props) {
    super(props)
  }

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { author } = this.state;
    return (
      <span>
        <Row className="mt-2">
          <Col sm={12} lg={12}>
            <a data-testid="href" href={'/person/' + author.id} >
              <div className="Rectangle">

                <Row className="AuthorCard">
                  <Col sm={2}>
                    <PersonPlaceholderSvg />
                  </Col>
                  <Col sm={10} className="text-left ">
                    <p className="Black-16px" data-testid="name"> {author.firstname} {author.lastname} </p>
                    <p className="Gray700-13px" data-testid="bio"> {author.bio} </p>
                  </Col>
                  <Col sm={2} />
                </Row>
              </div>
            </a>
          </Col>
        </Row>
      </span>
    );
  }
}

export default Creators;