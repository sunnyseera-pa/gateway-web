import React, { useState } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import PreSubCustodian from './DARComponents/PreSubCustodian';
import PreSubInnovator from './DARComponents/PreSubInnovator';
import InReviewCustodian from './DARComponents/InReviewCustodian';
import InReviewInnovator from './DARComponents/InReviewInnovator';
import ApprovedCustodian from './DARComponents/ApprovedCustodian';
import ApprovedInnovator from './DARComponents/ApprovedInnovator';
import RejectedCustodian from './DARComponents/RejectedCustodian';
import RejectedInnovator from './DARComponents/RejectedInnovator';

var baseURL = require('../commonComponents/BaseURL').getURL();

class DataAccessRequests extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        userState: [],
        key: 'presubmission'
    };

    handleSelect = (key) => {
        this.setState({ key: key });
    }

    render() {
        const { userState, key } = this.state;
        console.log('role here: ' + JSON.stringify(this.state.userState[0].role))

        return (
            
            <div>
                <Row>
                    <Row className="AccountHeader mt-3">
                        <Col sm={10} lg={10}>
                            <Row>
                                <span className="Black-20px">Data access request applications</span>
                            </Row>
                            <Row>
                                <span className="Gray700-13px ">Manage forms and applications</span>   
                            </Row>
                        </Col>
                        <Col sm={2} lg={2} style={{ textAlign: "center" }}>
                        { this.state.userState[0].role === "Admin" ? 
                            <Button variant="primary" href="" className="AddButton">
                                + Add a new form
                            </Button>
                        : ""}
                        </Col>
                    </Row>

                    <Row className="TabsBackground mt-1">
                            <Col sm={12} lg={12}>
                                    <Tabs className='DataAccessTabs Gray700-13px' activeKey={this.state.key} onSelect={this.handleSelect}>
                                        <Tab eventKey="presubmission" title="Pre-submission (x)"> </Tab>
                                        <Tab eventKey="inreview" title="In review (x)"> </Tab>
                                        <Tab eventKey="approved" title="Approved (x)"> </Tab>
                                        <Tab eventKey="rejected" title="Rejected (x)"> </Tab>
                                        { this.state.userState[0].role === "Admin" ? <Tab eventKey="forms" title="Forms (x)"> </Tab> : ""}
                                    </Tabs>
                            </Col>
                        </Row>

                        {/* AND ROLE IS CUSTODIAN */}
                       {/* { this.state.userState[0].role === "Admin" ? 
                            key === "presubmission" ? 
                                <div className="DARDiv">
                                    <Row className="SubHeader mt-3"> <Col sm={3} lg={3}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={6} lg={6}>Applicant</Col> </Row>
                                    <Row className="SubHeader mt-1"> <DataAccess /> </Row> 
                                </div>
                                            
                            : ""
                        : ""
                       } */}

                    { this.state.userState[0].role === "Admin" ? 
                        (() => {
                            switch (key) {
                                case "presubmission":
                                return ( 
                                    <div className="DARDiv">
                                        <Row className="SubHeader mt-3"> <Col sm={2} lg={2}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={3} lg={3}>Applicant</Col> <Col sm={4} lg={4}>Progress</Col> </Row>

                                        <Row className="SubHeader mt-1"> <PreSubCustodian /> </Row> 
                                    </div>
                                );
                                case "inreview":
                                    return ( 
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-3"> <Col sm={2} lg={2}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={3} lg={3}>Applicant</Col> <Col sm={4} lg={4}>Progress</Col> </Row>
                                            <Row className="SubHeader mt-1"> <InReviewCustodian /> </Row> 
                                        </div>
                                );
                                case "approved":
                                    return ( 
                                        <div className="DARDiv">
                                            {/* <Row className="SubHeader mt-3"> <Col sm={3} lg={3}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={6} lg={6}>Applicant</Col> </Row> */}
                                            <Row className="SubHeader mt-3"> <Col sm={2} lg={2}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={3} lg={3}>Applicant</Col> <Col sm={4} lg={4}>Progress</Col> </Row>
                                            <Row className="SubHeader mt-1"> <ApprovedCustodian /> </Row> 
                                        </div>
                                );
                                case "rejected":
                                    return ( 
                                        <div className="DARDiv">
                                            {/* <Row className="SubHeader mt-3"> <Col sm={3} lg={3}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={6} lg={6}>Applicant</Col> </Row> */}
                                            <Row className="SubHeader mt-3"> <Col sm={2} lg={2}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={3} lg={3}>Applicant</Col> <Col sm={4} lg={4}>Progress</Col> </Row>
                                            <Row className="SubHeader mt-1"> <RejectedCustodian /> </Row> 
                                        </div>
                                );
                                case "forms":
                                    return ( 
                                        <div className="DARDiv">
                                            {/* <Row className="SubHeader mt-3"> <Col sm={3} lg={3}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={6} lg={6}>Applicant</Col> </Row> */}
                                            <Row className="SubHeader mt-3"> <Col sm={2} lg={2}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={3} lg={3}>Applicant</Col> <Col sm={4} lg={4}>Progress</Col> </Row>
                                            <Row className="SubHeader mt-1"> <span>Forms</span> </Row> 
                                        </div>
                                );
                            }
                        })() 
                    : "" }

                        {/* AND ROLE IS INNOVATOR */}

                    {/* { this.state.userState[0].role === "Creator" ? 
                        key === "presubmission" ? 
                            <div className="DARDiv">
                                <Row className="SubHeader mt-3"> <Col sm={3} lg={3}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={6} lg={6}>Progress</Col> </Row>
                                <Row className="SubHeader mt-1"> <PreSubInnovator /> </Row> 
                            </div>
                        : ""
                    : ""
                    } */}

                    { this.state.userState[0].role === "Creator" ? 
                        (() => {
                            switch (key) {
                                case "presubmission":
                                return ( 
                                    <div className="DARDiv">
                                        <Row className="SubHeader mt-3"> <Col sm={3} lg={3}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={6} lg={6}>Progress</Col> </Row>
                                        <Row className="SubHeader mt-1"> <PreSubInnovator /> </Row> 
                                    </div>
                                );
                                case "inreview":
                                    return ( 
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-3"> <Col sm={3} lg={3}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={6} lg={6}>Progress</Col> </Row>
                                            <Row className="SubHeader mt-1"> <InReviewInnovator /> </Row> 
                                        </div>
                                );
                                case "approved":
                                    return ( 
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-3"> <Col sm={3} lg={3}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={6} lg={6}>Progress</Col> </Row> 
                                            <Row className="SubHeader mt-1"> <ApprovedInnovator /> </Row> 
                                        </div>
                                );
                                case "rejected":
                                    return ( 
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-3"> <Col sm={3} lg={3}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={6} lg={6}>Progress</Col> </Row>
                                            <Row className="SubHeader mt-1"> <RejectedInnovator /> </Row> 
                                        </div>
                                );
                            }
                        })() 
                    : "" }

                </Row>


                {/* <Row className="mt-3">
                    <Col style={{ textAlign: "center" }}>
                        <Button variant="primary" href="/addtool" className="AddButton" onClick={() => Event("Buttons", "Click", "Add a new tool")}>
                            + Add a new tool
                        </Button>
                    </Col>
                </Row>

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

                <PendingTools userState={userState} />

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

                <ActiveTool userState={userState} />

                <Row className="mt-3">
                    <Col>
                        <span className="Black-16px ml-2">Archive</span>
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

                <ArchiveTools userState={userState} /> */}

            </div>
        );
    }
}

class PendingTools extends React.Component {
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
            axios.get(baseURL + '/api/v1/accounts/admin?type=tool&toolState=review')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
        else {
            axios.get(baseURL + '/api/v1/accounts?type=tool&id=' + this.state.userState[0].id + '&toolState=review')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
    }

    rejectTool = (id) => {
        axios.put(baseURL + '/api/v1/accounts/status', {
            id: id,
            activeflag: "archive"
        })
            .then((res) => {
                window.location.href = '/account?tab=tools&toolRejected=true';
            });
    }

    approveTool = (id) => {
        axios.put(baseURL + '/api/v1/accounts/status', {
            id: id,
            activeflag: "active"
        })
            .then((res) => {
                window.location.href = '/account?tab=tools&toolApproved=true';
            });
    }


    render() {
        const { data, isLoading, userState } = this.state;

        if (isLoading) {
            return <Loading />;
        }
        return (
            <Row>
                <Col>
                    {data.length <= 0 ? <NotFound word='tools' /> : data.map((dat) => {
                        return (<a /* href={'/tool/'+dat.id} */>
                            <div className="Rectangle mt-1">
                                <Row>
                                    <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/tool/' + dat.id} >{dat.name}</a></Col>
                                    <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                        {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                            return <span>{person.firstname} {person.lastname} <br /></span>
                                        })}
                                    </Col>
                                    <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                        {userState[0].role === 'Admin' ?
                                            <div>
                                                <Button variant='white' href={'/edittool/' + dat.id} className="AccountButtons mr-2">
                                                    Edit
                            </Button>
                                                <Button variant='white' onClick={() => this.rejectTool(dat.id)} className="AccountButtons mr-2">
                                                    Reject
                            </Button>
                                                <Button variant='white' onClick={() => this.approveTool(dat.id)} className="AccountButtons ">
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
        );
    }
}

class ActiveTool extends React.Component {

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
            axios.get(baseURL + '/api/v1/accounts/admin?type=tool&toolState=active')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
        else {
            axios.get(baseURL + '/api/v1/accounts?type=tool&id=' + this.state.userState[0].id + '&toolState=active')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
    }

    render() {
        const { data, isLoading } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return (
            <Row className="mt-1">
                <Col>
                    {data.length <= 0 ? <NotFound word="tools" /> : data.map((dat) => {
                        return (<div className="Rectangle mt-1">
                            <Row>
                                <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/tool/' + dat.id} >{dat.name}</a></Col>
                                <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                    {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                        return <span>{person.firstname} {person.lastname} <br /></span>
                                    })}
                                </Col>

                                <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                    <DeleteButton id={dat.id} />
                                    <Button variant='white' href={'/edittool/' + dat.id} className="AccountButtons" >
                                        Edit
                            </Button>
                                </Col>
                            </Row>
                        </div>)
                    })}
                </Col>
            </Row>
        );
    }


}

function DeleteButton(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteObject = () => {
        axios.put(baseURL + '/api/v1/accounts/status', {
            id: props.id,
            activeflag: "archive"
        })
            .then((res) => {
                window.location.href = '/account?tab=tools&toolDeleted=true';
            });
    }

    return (
        <>
            <Button variant="light" id="ArchiveButton" className="mr-2" onClick={handleShow}>
                Archive
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Archive this tool?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This tool will be archived from the directory.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No, nevermind</Button>
                    <Button variant="primary" onClick={deleteObject}>Yes, archive</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

class ArchiveTools extends React.Component {

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
            axios.get(baseURL + '/api/v1/accounts/admin?type=tool&toolState=archive')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
        else {
            axios.get(baseURL + '/api/v1/accounts?type=tool&id=' + this.state.userState[0].id + '&toolState=archive')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
    }

    approveTool = (id) => {
        axios.put(baseURL + '/api/v1/accounts/status', {
            id: id,
            activeflag: "active"
        })
            .then((res) => {
                window.location.href = '/account?tab=tools&projectApproved=true';
            });
    }

    render() {
        const { data, isLoading } = this.state;


        if (isLoading) {
            return <Loading />;
        }

        return (
            <Row className="mt-1">
                <Col>
                    {data.length <= 0 ? <NotFound word="tools" /> : data.map((dat) => {
                        return (<div className="Rectangle mt-1">
                            <Row>
                                <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/project/' + dat.id} >{dat.name}</a></Col>
                                <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                    {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                        return <span>{person.firstname} {person.lastname} <br /></span>
                                    })}
                                </Col>


                                <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                    <Button variant="light" className="mr-2" onClick={() => this.approveTool(dat.id)}>
                                        Unarchive
                                    </Button>
                                    <Button variant='white' href={'/edittool/' + dat.id} className="AccountButtons" >
                                                Edit
                                    </Button>
                                </Col>
                            </Row>
                        </div>)
                    })}
                </Col>
            </Row>
        );
    }
}


export default DataAccessRequests;