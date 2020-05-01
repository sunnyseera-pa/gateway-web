import React, { useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon";
import Button from 'react-bootstrap/Button';
import NotFound from '../commonComponents/NotFound';
import Collapse from 'react-bootstrap/Collapse'
import Loading from '../commonComponents/Loading'

var baseURL = require('../commonComponents/BaseURL').getURL();

class ReviewTools extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        data: [],
        allReviews: [],
        userState: [],
        isLoading: true
    };

    componentDidMount() {
        this.doSearchCall();
    }

    doSearchCall() {
        if (this.state.userState[0].role === "Admin") {
            axios.get(baseURL + '/api/v1/reviews/admin/pending')
            .then((res) => {
                this.setState({ data: res.data.data, allReviews: res.data.allReviews, isLoading: false });
            });
        }
        else {
            axios.get(baseURL + '/api/v1/reviews/pending?type=tool&id=' + this.state.userState[0].id)
            .then((res) => {
                this.setState({ data: res.data.data, allReviews: res.data.allReviews, isLoading: false });
            });
        }
    }

    render() {
        const { data, allReviews, isLoading, userState } = this.state;
        if (isLoading) {
            return <Loading />;
        }

        return (
            <div>
                <Row className="mt-3">
                    <Col>
                        <span className="Black-16px ml-2">Pending approval</span>
                    </Col>
                </Row>

                <Row className="mt-1">
                    <Col lg={12}>
                        <div className="ToolsHeader">
                            <Row>
                                <Col xs={4} lg={5} className="pl-4 pt-2 Gray800-14px-bold">Name</Col>
                                <Col xs={4} lg={2} className="pl-1 pt-2 Gray800-14px-bold">Author</Col>
                                <Col xs={4} lg={5}></Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {data.length <= 0 ? <NotFound word='reviews' /> : data.map((dat) => {
                            return (<ReviewReview dat={dat} userState={userState[0]} />)
                        })}
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <span className="Black-16px ml-2">Active</span>
                    </Col>
                </Row>

                <Row className="mt-1">
                    <Col lg={12}>
                        <div className="ToolsHeader">
                            <Row>
                                <Col xs={4} lg={5} className="pl-4 pt-2 Gray800-14px-bold">Name</Col>
                                <Col xs={4} lg={2} className="pl-1 pt-2 Gray800-14px-bold">Author</Col>
                                <Col xs={4} lg={5}></Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {allReviews.length <= 0 ? <NotFound word='reviews' /> : allReviews.map((dat) => {
                            return (<ReviewReviewActive dat={dat} userState={userState[0]} />)
                        })}
                    </Col>
                </Row>
            </div>
        );
    }
}


const ReviewReview = (props) => {
    const [open, setOpen] = useState(false);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var updatedDate = new Date(props.dat.date);
    var updatedOnDate = updatedDate.getDate() + " " + monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear();
    
    const rejectReview = (id) => {
        axios.delete(baseURL + '/api/v1/tools/review/reject', {
            data: {
                id: id
            },
        })
        .then((res) => {
            window.location.href = '/account?tab=reviews&reviewRejected=true';
        });
    }

    const approveReview = (id) => {
        axios.post(baseURL + '/api/v1/tools/review/approve', {
            id: id,
            activeflag: "active"
        })
        .then((res) => {
            window.location.href = '/account?tab=reviews&reviewApproved=true';
        });
    }

    return (
        <>
            <div className="Rectangle mt-1">
                <Row>
                    <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href="#" onClick={() => setOpen(!open)} aria-controls="collapse-review" aria-expanded={open} >{props.dat.review}</a></Col>
                    <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold"> {props.dat.person[0].firstname} {props.dat.person[0].lastname} </Col>
                    <Col sm={12} lg={5} className="pl-5 toolsButtons">

                        {props.userState.role === 'Admin' ?
                            <div>
                                <Button variant='white' onClick={() => rejectReview(props.dat.reviewID)} className="AccountButtons mr-2">
                                    Reject
                                </Button>
                                <Button variant='white' onClick={() => approveReview(props.dat.reviewID)} className="AccountButtons ">
                                    Approve
                                </Button>
                            </div> : ""}
                    </Col>
                    <Col sm={12}>
                        <Collapse in={open}>
                            <div id="collapse-review">
                                <div className="reviewReviewHolder">
                                    <Row>
                                        <Col xs={2} lg={1} className="iconHolder">
                                            <SVGIcon name="toolicon" width={18} height={18} fill={'#3db28c'} />
                                        </Col>
                                        <Col xs={10} lg={8}>
                                            <p>
                                                <span className="Black-16px"><a className="searchHolder" href={'/tool/' + props.dat.tool[0].id} >{props.dat.tool[0].name.substr(0, 75) + (props.dat.tool[0].name.length > 75 ? '...' : '')}</a></span>
                                            </p>
                                        </Col>
                                        <Col xs={12} lg={12}>
                                            <p>
                                                <span className="Gray800-14px">"{props.dat.tool[0].description}"</span>
                                            </p>
                                        </Col>
                                        <Col xs={12} lg={12}>
                                            <span className="Purple-13px">{props.dat.person[0].firstname} {props.dat.person[0].lastname}</span><span className="Gray700-13px"> on {updatedOnDate}</span>
                                            {!props.dat.projectName? '' : <><span className="reviewTitleGap">·</span><span className="Gray700-13px"> in relation to project </span><span className="Purple-13px">{props.dat.projectName}</span></>}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Collapse>
                    </Col>
                </Row>
            </div>
        </>
    );
}

const ReviewReviewActive = (props) => {
    const [open, setOpen] = useState(false);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var updatedDate = new Date(props.dat.date);
    var updatedOnDate = updatedDate.getDate() + " " + monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear();

    return (
        <>
            <div className="Rectangle mt-1">
                <Row>
                    <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href="#" onClick={() => setOpen(!open)} aria-controls="collapse-review" aria-expanded={open} >{props.dat.review}</a></Col>
                    <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold"> {props.dat.person[0].firstname} {props.dat.person[0].lastname} </Col>
                    <Col sm={12} lg={5} className="pl-5 toolsButtons"></Col>
                    <Col sm={12}>
                        <Collapse in={open}>
                            <div id="collapse-review">
                                <div className="reviewReviewHolder">
                                    <Row>
                                        <Col xs={2} lg={1} className="iconHolder">
                                            <SVGIcon name="toolicon" width={18} height={18} fill={'#3db28c'} />
                                        </Col>
                                        <Col xs={10} lg={8}>
                                            <p>
                                                <span className="Black-16px"><a className="searchHolder" href={'/tool/' + props.dat.tool[0].id} >{props.dat.tool[0].name.substr(0, 75) + (props.dat.tool[0].name.length > 75 ? '...' : '')}</a></span>
                                            </p>
                                        </Col>
                                        <Col xs={12} lg={12}>
                                            <p>
                                                <span className="Gray800-14px">"{props.dat.tool[0].description}"</span>
                                            </p>
                                        </Col>
                                        <Col xs={12} lg={12}>
                                            <span className="Purple-13px">{props.dat.person[0].firstname} {props.dat.person[0].lastname}</span><span className="Gray700-13px"> on {updatedOnDate}</span>
                                            {!props.dat.projectName? '' : <><span className="reviewTitleGap">·</span><span className="Gray700-13px"> in relation to project </span><span className="Purple-13px">{props.dat.projectName}</span></>}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Collapse>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default ReviewTools;