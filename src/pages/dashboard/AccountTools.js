import React, { useState } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading'

var baseURL = require('../commonComponents/BaseURL').getURL();

class AccountTools extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        userState: []
    };

    render() {
        const { userState } = this.state;

        return (
            <div>
                <Row className="mt-3">
                    <Col xs={5} lg={5}></Col>
                    <Col xs={2} lg={2} style={{ textAlign: "center" }}>
                        <Button variant="primary" href="/addtool" className="AddButton">
                            + Add a new tool
                            </Button>
                    </Col>
                    <Col xs={5} lg={5}></Col>
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
        axios.delete(baseURL + '/api/v1/accounts', {
            data: {
                id: id
            },
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
        axios.delete(baseURL + '/api/v1/accounts', {
            data: {
                id: props.id
            },
        })
            .then((res) => {
                window.location.href = '/account?tab=tools&toolDeleted=true';
            });
    }

    return (
        <>
            <Button variant="light" id="ArchiveButton" className="mr-2" onClick={handleShow}>
                Delete
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete this tool?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This tool will be completely removed from the directory and cannot be retrieved.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No, nevermind</Button>
                    <Button variant="primary" onClick={deleteObject}>Yes, delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AccountTools;