import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import { Row, Col, Button, Modal, Tabs, Tab, DropdownButton, Dropdown, Collapse } from 'react-bootstrap';

import SVGIcon from "../../images/SVGIcon";
import NotFound from '../commonComponents/NotFound';
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
        userState: [],
        key: 'active',
        isLoading: true
    };

    handleSelect = (key) => {
        this.setState({ key: key });
    }

    componentDidMount() {
        this.doReviewCall();
    } 

    doReviewCall() {
        if (this.state.userState[0].role === "Admin") {
            axios.get(baseURL + '/api/v1/reviews/admin/pending')
            .then((res) => {
                this.setState({ data: res.data.data, isLoading: false });
            });
        }
        else {
            axios.get(baseURL + '/api/v1/reviews/pending?type=tool&id=' + this.state.userState[0].id)
            .then((res) => {
                this.setState({ data: res.data.data, isLoading: false });
            });
        }
    }

    render() {
        const { data, key, isLoading, userState } = this.state;

        if (isLoading) {
            return (
                <Row className="mt-4">
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <Loading />
                    </Col>
                    <Col xs={1}></Col>
                </Row>
            );
        }
        
        var activeCount = 0;
        var reviewCount = 0;
        var archiveCount = 0;
        var rejectedCount = 0;

        data.forEach((review) => {
            if (review.activeflag === "active") activeCount++;
            else if (review.activeflag === "review") reviewCount++;
            else if (review.activeflag === "archive") archiveCount++;
            else if (review.activeflag === "rejected") rejectedCount++;
        });

        return (
            <div>
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <Row className="accountHeader mt-4">
                            <Col xs={8}>
                                <Row>
                                    <span className="black-20">Reviews</span>
                                </Row>
                                <Row>
                                    <span className="gray700-13 ">View and manage your reviews</span>
                                </Row>
                            </Col>
                            <Col xs={4}>
                            </Col>
                        </Row>

                        <Row className="tabsBackground">
                            <Col sm={12} lg={12}>
                                <Tabs className='dataAccessTabs gray700-13' activeKey={this.state.key} onSelect={this.handleSelect}>
                                    <Tab eventKey="active" title={"Active (" + activeCount + ")"}> </Tab>
                                    <Tab eventKey="pending" title={"Pending approval (" + reviewCount + ")"}> </Tab>
                                    <Tab eventKey="rejected" title={"Rejected (" + rejectedCount + ")"}> </Tab>
                                    <Tab eventKey="archive" title={"Archive (" + archiveCount + ")"}> </Tab>
                                </Tabs>
                            </Col>
                        </Row>



                        {(() => {
                            switch (key) {
                                case "active":
                                    return (
                                        <div>
                                            <Row className="subHeader mt-3 gray800-14-bold">
                                                <Col xs={2}>Added</Col>
                                                <Col xs={5}>Name of reviewed</Col>
                                                <Col xs={2}>Author of review</Col>
                                                <Col xs={3}></Col>
                                            </Row>

                                            {activeCount <= 0 ? 
                                            <Row className="margin-right-15">
                                                <NotFound word="reviews" /> 
                                            </Row>
                                         : data.map((dat) => {
                                                
                                                if (dat.activeflag !== "active") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{moment(dat.createdAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={'/paper/' + dat.id} className="black-14">{dat.review}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{dat.person[0].firstname} {dat.person[0].lastname}</Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="floatRight">
                                                                    <ArchiveButton id={dat.reviewID} />
                                                                </DropdownButton>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                            })}

                                        </div>
                                    );
                                case "pending":
                                    return (
                                        <div>
                                            <Row className="subHeader mt-3 gray800-14-bold">
                                                <Col xs={2}>Added</Col>
                                                <Col xs={5}>Name of reviewed</Col>
                                                <Col xs={2}>Author of review</Col>
                                                <Col xs={3}></Col>
                                            </Row>

                                            {reviewCount <= 0 ? 
                                            <Row className="margin-right-15">
                                                <NotFound word="reviews" /> 
                                            </Row>
                                            : data.map((dat) => {
                                                if (dat.activeflag !== "review") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={'/paper/' + dat.id} className="black-14">{dat.review}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{dat.person[0].firstname} {dat.person[0].lastname}</Col>

                                                            </Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                {userState[0].role === 'Admin' ?
                                                                    <DropdownButton variant="outline-secondary" alignRight title="Actions" className="floatRight">
                                                                        <ApproveButton id={dat.reviewID} />
                                                                        <RejectButton id={dat.reviewID} />
                                                                    </DropdownButton>
                                                                    : ""}
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                            })}

                                        </div>
                                    ); 
                                    //TODO
                                    case "rejected":
                                            return (
                                                <div>
                                                    <Row className="subHeader mt-3 gray800-14-bold">
                                                        <Col xs={2}>Added</Col>
                                                        <Col xs={5}>Name of reviewed</Col>
                                                        <Col xs={2}>Author of review</Col>
                                                        <Col xs={3}></Col>
                                                    </Row>
        
                                                    {rejectedCount <= 0 ? 
                                                    <Row className="margin-right-15">
                                                        <NotFound word="reviews" /> 
                                                    </Row>
                                                    : data.map((dat) => {
                                                        if (dat.activeflag !== "rejected") {
                                                            return (<></>)
                                                        }
                                                        else {
                                                            return (
                                                                <Row className="entryBox">
                                                                    <Col sm={12} lg={2} className="pt-2 gray800-14">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                                    <Col sm={12} lg={5} className="pt-2"><a href={'/paper/' + dat.id} className="black-14">{dat.review}</a></Col>
                                                                    <Col sm={12} lg={2} className="pt-2 gray800-14">{dat.person[0].firstname} {dat.person[0].lastname}</Col>

        
                                                                    <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                        <DropdownButton variant="outline-secondary" alignRight title="Actions" className="floatRight">
                                                                            <ApproveButton id={dat.reviewID} />
                                                                        </DropdownButton>
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            );
                                case "archive":
                                    return (
                                        <div>
                                            <Row className="subHeader mt-3 gray800-14-bold">
                                                <Col xs={2}>Added</Col>
                                                <Col xs={5}>Name of reviewed</Col>
                                                <Col xs={2}>Author of review</Col>
                                                <Col xs={3}></Col>
                                            </Row>

                                            {archiveCount <= 0 ? 
                                                <Row className="margin-right-15">
                                                    <NotFound word="reviews" /> 
                                                </Row>
                                                : data.map((dat) => {
                                                if (dat.activeflag !== "archive") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={'/paper/' + dat.id} className="black-14">{dat.review}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{dat.person[0].firstname} {dat.person[0].lastname}</Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="floatRight">
                                                                    <ApproveButton id={dat.reviewID} />
                                                                    <RejectButton id={dat.reviewID} />
                                                                </DropdownButton>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                            })}
                                        </div>
                                    );
                            }
                        })()}
                    </Col>
                    <Col xs={1}></Col>
                </Row>
            </div>
        );
    }
}

function RejectButton(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const rejectObject = () => {
        axios.put(baseURL + '/api/v1/tools/review/approve', {  
            id: props.id,
            activeflag: "rejected"
        })
            .then((res) => {
                window.location.href = '/account?tab=reviews&reviewRejected=true';
            });
    }

    return (
        <>
            <Dropdown.Item href="#" onClick={handleShow} className="black-14">Reject</Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reject this review?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Let the person who added this know know why their review is being rejected.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={rejectObject}>Reject and send message</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function ApproveButton(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const rejectObject = () => {
        axios.put(baseURL + '/api/v1/tools/review/approve', {  
            id: props.id,
            activeflag: "active"
        })
            .then((res) => {
                window.location.href = '/account?tab=reviews&reviewApproved=true';
            });
    }

    return (
        <>
            <Dropdown.Item href="#" onClick={handleShow} className="black-14">Approve</Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Approve this review?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Let the person who added this know their review is being approved.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={rejectObject}>Approve</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function ArchiveButton(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const rejectObject = () => {
        axios.put(baseURL + '/api/v1/tools/review/approve', {  
            id: props.id,
            activeflag: "archive"
        })
            .then((res) => {
                window.location.href = '/account?tab=reviews&reviewArchived=true';
            });
    }

    return (
        <>
            <Dropdown.Item href="#" onClick={handleShow} className="black-14">Archive</Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Archive this review?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This review will be archived.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={rejectObject}>Archive</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
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
            <div className="rectangle mt-1">
                <Row>
                    <Col sm={12} lg={5} className="pl-2 pt-2 gray800-14-bold"><a href="#" onClick={() => setOpen(!open)} aria-controls="collapse-review" aria-expanded={open} >{props.dat.review}</a></Col>
                    <Col sm={12} lg={2} className="pl-2 pt-2 gray800-14-bold"> {props.dat.person[0].firstname} {props.dat.person[0].lastname} </Col>
                    <Col sm={12} lg={5} className="pl-5 toolsButtons">

                        {props.userState.role === 'Admin' ?
                            <div>
                                <Button variant='white' onClick={() => rejectReview(props.dat.reviewID)} className="accountButton mr-2">
                                    Reject
                                </Button>
                                <Button variant='white' onClick={() => approveReview(props.dat.reviewID)} className="accountButton ">
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
                                                <span className="black-16"><a href={'/tool/' + props.dat.tool[0].id} >{props.dat.tool[0].name.substr(0, 75) + (props.dat.tool[0].name.length > 75 ? '...' : '')}</a></span>
                                            </p>
                                        </Col>
                                        <Col xs={12} lg={12}>
                                            <p>
                                                <span className="gray800-14">"{props.dat.tool[0].description}"</span>
                                            </p>
                                        </Col>
                                        <Col xs={12} lg={12}>
                                            <span className="purple-13">{props.dat.person[0].firstname} {props.dat.person[0].lastname}</span><span className="gray700-13"> on {updatedOnDate}</span>
                                            {!props.dat.projectName? '' : <><span className="reviewTitleGap">·</span><span className="gray700-13"> in relation to project </span><span className="purple-13">{props.dat.projectName}</span></>}
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
            <div className="rectangle mt-1">
                <Row>
                    <Col sm={12} lg={5} className="pl-2 pt-2 gray800-14-bold"><a href="#" onClick={() => setOpen(!open)} aria-controls="collapse-review" aria-expanded={open} >{props.dat.review}</a></Col>
                    <Col sm={12} lg={2} className="pl-2 pt-2 gray800-14-bold"> {props.dat.person[0].firstname} {props.dat.person[0].lastname} </Col>
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
                                                <span className="black-16"><a href={'/tool/' + props.dat.tool[0].id} >{props.dat.tool[0].name.substr(0, 75) + (props.dat.tool[0].name.length > 75 ? '...' : '')}</a></span>
                                            </p>
                                        </Col>
                                        <Col xs={12} lg={12}>
                                            <p>
                                                <span className="gray800-14">"{props.dat.tool[0].description}"</span>
                                            </p>
                                        </Col>
                                        <Col xs={12} lg={12}>
                                            <span className="purple-13">{props.dat.person[0].firstname} {props.dat.person[0].lastname}</span><span className="gray700-13"> on {updatedOnDate}</span>
                                            {!props.dat.projectName? '' : <><span className="reviewTitleGap">·</span><span className="gray700-13"> in relation to project </span><span className="purple-13">{props.dat.projectName}</span></>}
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