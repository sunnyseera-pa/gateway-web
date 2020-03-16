import React, { useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon";
import Button from 'react-bootstrap/Button';
import ToolsHeader from './ToolsHeader';
import NotFound from './NotFound';
import Collapse from 'react-bootstrap/Collapse'

var baseURL = require('../../BaseURL').getURL();

class ReviewTitle extends React.Component {

    constructor(props) {
        super(props)
        this.state.id = props.id;
    }

    // initialize our state
    state = {
        id: '',
        data: [],
        isLoading: true
    };

    componentDidMount() {
        this.doSearchCall();
    }

    doSearchCall() {
        axios.get(baseURL + '/api/reviews?id=' + this.state.id)
        .then((res) => {
            console.log(this.state.id)
            console.log(res.data.data[0])
            this.setState({ data: res.data.data[0], isLoading: false });
        });
    }

    render() {
        const { data, isLoading } = this.state;
        
        if (isLoading) {
            return <p>Loading ...</p>;
        }

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var updatedDate = new Date(data.date);
        var updatedOnDate = updatedDate.getDate() + " " + monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear();

        return (
            <Row className="mt-2">
                <Col>
                    <div className="Rectangle">
                        <Row>  
                            <Col xs={2} lg={1} className="iconHolder">
                                <SVGIcon name="toolicon" width={18} height={18} fill={'#3db28c'} />
                            </Col>
                            <Col xs={10} lg={8}>
                                <p>
                                    <span className="Black-16px"><a className="searchHolder" href={'/tool/' + data.tool[0].id} >{data.tool[0].name.substr(0, 75) + (data.tool[0].name.length > 75 ? '...' : '')}</a></span>
                                </p>
                            </Col>
                            <Col xs={12} lg={12}>
                                <p>
                                    <span className="Gray800-14px">"{data.review}"</span>
                                </p>
                            </Col>
                            <Col xs={12} lg={12}>
                                <span className="Purple-13px">{data.person[0].firstname} {data.person[0].lastname}</span><span className="Gray700-13px"> on {updatedOnDate}</span>
                                {!data.projectName? '' : <><span className="reviewTitleGap">·</span><span className="Gray700-13px"> in relation to project </span><span className="Purple-13px">{data.projectName}</span></>}
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
    );
    }
}

export default ReviewTitle;