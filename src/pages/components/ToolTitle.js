
// /ShowObjects/Title.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Rating from 'react-rating';
import { ReactComponent as EmptyStarIconSvg} from '../../images/starempty.svg';
import { ReactComponent as FullStarIconSvg} from '../../images/star.svg';

class ToolTitle extends Component {

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
                                {data.categories.length <= 0 ? 'NO SEARCH RESULT' : data.categories.map((category) => {
                                    return <div className="mr-2 Gray800-14px tagBadges">{category}</div>
                                })}
                            </Col>
                            <Col xs={3} md={3} className="mb-3 pl-5">
                            <span className="Gray500-13px">
                                            150 reviews
                                            <span className="reviewTitleGap">·</span>
                                            4.2 average
                            </span>
                            </Col>
                            <Col xs={3} md={3} className="mb-1 pr-5 text-right">
                                <Rating emptySymbol={<EmptyStarIconSvg />} fullSymbol={<FullStarIconSvg />} placeholderSymbol={<FullStarIconSvg />} placeholderRating={4.3} />
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
                            <Col xs={12} md={12} className="mb-3">
                                {data.tags.length <= 0 ? 'NO SEARCH RESULT' : data.tags.map((tag) => {
                                    return <div className="mr-2 Gray800-14px tagBadges">{tag}</div>
                                })}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12} className="mb-3">
                                <span className="Gray800-14px">
                                    {data.description}
                                    {/* Software to analyse data and with powerful graphics to create interactive visualisations - focused on business intelligence. Including data access to data prep to get data ready for analysis, to data analytics and discovery. */}
                                </span>
                            </Col> 
                        </Row>
                        <Row>
                            <span className="Gray800-14px ml-3"> License </span>
                            <span className='Purple-14px ml-2'> Apache License 2.0</span>
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