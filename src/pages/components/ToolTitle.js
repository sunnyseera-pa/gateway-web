
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
    var ratingsTotal = 0;//(!!data.reviews && data.reviews.length > 0) ? data.ratings.reduce((a,b) => a + b, 0) : '';
    if (data.reviews && data.reviews.length > 0) {
        data.reviews.forEach(review => {
            ratingsTotal = ratingsTotal+review.rating;
        });
    }
    
    const ratingsCount = (!!data.reviews ? data.reviews.length : 0);
    const avgRating = (!!data.reviews && data.reviews.length > 0) ? (ratingsTotal / ratingsCount) : '';
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var updatedDate = new Date(data.updatedAt);
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
                            <Col md={12} lg={6} className="mb-3">
                                {!data.categories.category ? '' : <div className="mr-2 Gray800-14px tagBadges"><a href={'/search?search='+data.categories.category+'&type=all'}>{data.categories.category}</a></div> }

                                {!data.categories.programmingLanguage || data.categories.programmingLanguage <= 0 ? '' : data.categories.programmingLanguage.map((language) => {
                                    return <div className="mr-2 Gray800-14px tagBadges"><a href={'/search?search='+language+'&type=all'}>{language}</a></div>
                                })}

                                {!data.categories.programmingLanguageVersion ? '' : <div className="mr-2 Gray800-14px tagBadges"><a href={'/search?search='+data.categories.programmingLanguageVersion+'&type=all'}>{data.categories.programmingLanguageVersion}</a></div> }
                            </Col>
                            <Col md={12} lg={6} className="mb-1 pr-3 text-right">
                                <div className="Gray500-13px">
                                    {!!ratingsTotal && ratingsCount == 1 ? ratingsCount + ' review' : ratingsCount +' reviews'}
                                    <span className="reviewTitleGap">·</span>
                                    {avgRating == 0 ? 'No average rating' : (Math.round(avgRating * 10) / 10) + ' average' }
                                    <span className="reviewTitleGap">·</span>
                                    <Rating emptySymbol={<EmptyStarIconSvg />} fullSymbol={<FullStarIconSvg />} placeholderSymbol={<FullStarIconSvg />} placeholderRating={avgRating} readonly={true} />
                                </div>
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

                                {!data.tags.features || data.tags.features.length <= 0 ? '' :  data.tags.features.map((feature) => {
                                    return <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2"><a href={'/search?search='+feature+'&type=all'}>{feature}</a></div>
                                })} 

                                {!data.tags.topics || data.tags.topics.length <= 0 ? '' :  data.tags.topics.map((topic) => {
                                    return <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2"><a href={'/search?search='+topic+'&type=all'}>{topic}</a></div>
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
                        {!data.license ? '' : 
                        <Row>
                            <span className="Gray800-14px ml-3"> License </span>
                            <span className='Purple-14px ml-2'> {data.license}</span>
                        </Row> }
                    </div>
                </Col>
                <Col sm={1} lg={10}/>
            </Row>
        </div>
    );
  }
}

export default ToolTitle;