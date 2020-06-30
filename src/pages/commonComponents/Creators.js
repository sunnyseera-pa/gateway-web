
// /ShowObjects/Title.js
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ReactComponent as PersonPlaceholderSvg } from '../../images/person-placeholder.svg';
import '../../css/styles.scss';

class  Creators extends Component {
  render() {
    const { author } = this.props;
    return (
      <span>
        <Row className="mt-2">
          <Col sm={12} lg={12}>
            <a data-testid="href" href={'/person/' + author.id} >
              <div className="rectangle">

                <Row className="authorCard">
                  <Col sm={2}>
                    <PersonPlaceholderSvg />
                  </Col>
                  <Col sm={10} className="text-left ">
                    <p className="black-16" data-testid="name"> {author.firstname} {author.lastname} </p>
                    <p className="gray700-13" data-testid="bio"> {author.bio} </p>
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