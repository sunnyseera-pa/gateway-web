import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from 'react-rating';
import { ReactComponent as EmptyStarIconSvg } from '../../images/starempty.svg';
import { ReactComponent as FullStarIconSvg } from '../../images/star.svg';
import axios from 'axios';

var baseURL = require('./../../BaseURL').getURL();

class ToolTitle extends Component {

    constructor(props) {
        super(props)
        this.state.data = props.data;
        this.state.reviewData = props.reviewData;
    }

    // initialize our state
    state = {
        data: [],
        id: this.props.data.id,
        counter: this.props.data.counter,
        reviewData: []
    };

    componentDidMount(props) {
        let counter = !this.props.data.counter ? 1 : this.props.data.counter + 1;
        this.UpdateCounter(this.props.data.id, counter);
    }

    UpdateCounter = (id, counter) => {
        axios.post(baseURL + '/api/counter/update', { id: id, counter: counter });
    }

    render() {
        const { data, reviewData } = this.state;
        var ratingsTotal = 0;

        if (reviewData.length > 0) {
            reviewData.forEach(review => {
                ratingsTotal = ratingsTotal + review.rating;
            });
        }

        const ratingsCount = (reviewData ? reviewData.length : 0);
        const avgRating = (reviewData.length > 0) ? (ratingsTotal / ratingsCount) : '';
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
                                            <a href={data.link} rel="noopener noreferrer" target="_blank" className="Purple-14px">
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
                                    {!data.categories.category ? '' : <div className="mr-2 Gray800-14px tagBadges"><a href={'/search?search=' + data.categories.category + '&type=all'}>{data.categories.category}</a></div>}

                                    {!data.categories.programmingLanguage || data.categories.programmingLanguage <= 0 ? '' : data.categories.programmingLanguage.map((language) => {
                                        return <div className="mr-2 Gray800-14px tagBadges"><a href={'/search?search=' + language + '&type=all'}>{language}</a></div>
                                    })}

                                    {!data.categories.programmingLanguageVersion ? '' : <div className="mr-2 Gray800-14px tagBadges"><a href={'/search?search=' + data.categories.programmingLanguageVersion + '&type=all'}>{data.categories.programmingLanguageVersion}</a></div>}
                                </Col>
                                <Col md={12} lg={6} className="mb-1 pr-3 text-right">
                                    <div className="Gray500-13px">
                                        {!!ratingsTotal && ratingsCount === 1 ? ratingsCount + ' review' : ratingsCount + ' reviews'}
                                        <span className="reviewTitleGap">·</span>
                                        {avgRating === 0 ? 'No average rating' : (Math.round(avgRating * 10) / 10) + ' average'}
                                        <span className="reviewTitleGap">·</span>
                                        <Rating emptySymbol={<EmptyStarIconSvg />} fullSymbol={<FullStarIconSvg />}
                                            placeholderSymbol={<FullStarIconSvg />}
                                            placeholderRating={avgRating}
                                            readonly='true'
                                        />
                                    </div>
                                </Col>
                                <Row>
                                    <Col className="ml-3">
                                        <span className='Gray800-14px'>
                                            {data.counter === undefined ? 1 : data.counter + 1}
                                            {data.counter === undefined ? ' view' : ' views'}
                                        </span>
                                    </Col>
                                </Row>
                            </Row>
                        </div>
                    </Col>
                    <Col sm={1} lg={10} />
                </Row>
                <Row>
                    <Col sm={1} lg={1} />
                    <Col sm={10} lg={10}>
                        <div className="Rectangle">
                            <Row>
                                <Col xs={12} md={12} className="mb-3">

                                    {!data.tags.features || data.tags.features.length <= 0 ? '' : data.tags.features.map((feature) => {
                                        return <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2"><a href={'/search?search=' + feature + '&type=all'}>{feature}</a></div>
                                    })}

                                    {!data.tags.topics || data.tags.topics.length <= 0 ? '' : data.tags.topics.map((topic) => {
                                        return <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2"><a href={'/search?search=' + topic + '&type=all'}>{topic}</a></div>
                                    })}

                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={12} className="mb-3">
                                    <span className="Gray800-14px">
                                        {data.description}
                                    </span>
                                </Col>
                            </Row>
                            {!data.license ? '' :
                                <Row>
                                    <span className="Gray800-14px ml-3"> License </span>
                                    <span className='Purple-14px ml-2'> {data.license}</span>
                                </Row>}
                        </div>
                    </Col>
                    <Col sm={1} lg={10} />
                </Row>
            </div>
        );
    }
}

export default ToolTitle;