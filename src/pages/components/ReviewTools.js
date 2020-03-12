import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon";
import Button from 'react-bootstrap/Button';
import ToolsHeader from './ToolsHeader';
import ActiveTool from './ActiveTool';
import ArchivedTool from './ArchivedTool';
import PendingTools from './PendingTools';
import Container from 'react-bootstrap/Container';
import NotFound from './NotFound';

var baseURL = require('../../BaseURL').getURL();

class ReviewTools extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        data: [],
        userState: [],
        isLoading: true
    };

    componentDidMount() {
        this.doSearchCall();
    }

    doSearchCall() {
        if (this.state.userState[0].role === "Admin") {
            axios.get(baseURL + '/api/pendingreviewsadmin')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
        else {
            axios.get(baseURL + '/api/pendingreviews?type=tool&id=' + this.state.userState[0].id)
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
    }

    rejectReview = (id) => {
        axios.delete(baseURL + '/api/tool/review/reject', {
            data: {
                id: id
            },
        })
            .then((res) => {
                window.location.href = '/account?tab=reviews&reviewRejected=true';
            });
    }

    approveReview = (id) => {
        axios.post(baseURL + '/api/tool/review/approve', {
            id: id,
            activeflag: "active"
        })
            .then((res) => {
                window.location.href = '/account?tab=reviews&reviewApproved=true';
            });
    }

    render() {
        const { data, isLoading, userState } = this.state;
console.log(data)
        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
                <Row className="mt-3">
                    <Col>
                        <span className="Black-16px ml-2">Pending approval</span>
                    </Col>
                </Row>

                <ToolsHeader />

                <Row>
                    <Col>
                        {data.length <= 0 ? <NotFound word='reviews' /> : data.map((dat) => {
                            return (<a /* href={'/tool/'+dat.id} */>

                                <div className="Rectangle mt-1">
                                    <Row>
                                        <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/tool/' + dat.id} >{dat.review}</a></Col>
                                        <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold"> {dat.person[0].firstname} {dat.person[0].lastname} </Col>
                                        <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                            {userState[0].role === 'Admin' ?
                                                <div>
                                                    <Button variant='white' onClick={() => this.rejectReview(dat.reviewID)} className="AccountButtons mr-2">
                                                        Reject
                            </Button>
                                                    <Button variant='white' onClick={() => this.approveReview(dat.reviewID)} className="AccountButtons ">
                                                        Approve
                            </Button>
                                                </div> : ""}
                                        </Col>
                                    </Row>
                                </div>

                            </a>)
                        })}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ReviewTools;