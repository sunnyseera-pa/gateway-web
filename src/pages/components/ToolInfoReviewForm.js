// /ShowObjects/Title.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ToolInfoReviewForm extends Component {

  constructor(props) {
    super(props)
    this.state.data = props.data;
  }

  // initialize our state
  state = {
    data: []
  };

  render() {
    const { data } = this.state;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var updatedDate = new Date(data.updatedon);
    var updatedOnDate = monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear();

    return (
        <div>
            <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <div className="Rectangle">
                        <Row>
                            <Col xs={7} md={8}>
                                <p>
                                    <span className="Black-16px">{data.name}</span>
                                    <br />
                                    <span >
                                        <a href={data.link} className="Purple-14px"> 
                                            {data.link}
                                        </a>
                                    </span>
                                </p>
                            </Col>
                            <Col xs={5} md={4} className="iconHolder">
                                <p>
                                <span className="Gray700-13px pr-1">
                                    Updated
                                </span>
                                <span className="Gray700-13px pr-1"> 
                                    {updatedOnDate}
                                </span>
                                </p>
                                <p>

                                </p>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col xs={6} md={6} className="mb-3">

                                {!data.categories.category ? '' : <div className="mr-2 Gray800-14px tagBadges">{data.categories.category}</div> }

                                {!data.categories.programmingLanguage || data.categories.programmingLanguage <= 0 ? '' : data.categories.programmingLanguage.map((language) => {
                                    return <div className="mr-2 Gray800-14px tagBadges">{language}</div>
                                })}

                                {!data.categories.programmingLanguageVersion ? '' : <div className="mr-2 Gray800-14px tagBadges">{data.categories.programmingLanguageVersion}</div> }
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

export default ToolInfoReviewForm;