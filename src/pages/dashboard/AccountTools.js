import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import { Row, Col, Button, Modal, Tabs, Tab, DropdownButton, Dropdown } from 'react-bootstrap';

import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading';

import { Event, initGA } from '../../tracking';

var baseURL = require('../commonComponents/BaseURL').getURL();

class AccountTools extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        userState: [],
        key: 'active',
        data: [],
        isLoading: true
    };

    handleSelect = (key) => {
        this.setState({ key: key });
    }

    componentDidMount() {
        initGA('UA-166025838-1');
        this.doToolsCall();
    }

    doToolsCall() {
        if (this.state.userState[0].role === "Admin") {
            axios.get(baseURL + '/api/v1/accounts/admin?type=tool')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
        else {
            axios.get(baseURL + '/api/v1/accounts?type=tool&id=' + this.state.userState[0].id + '')
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
        const { userState, key, isLoading, data } = this.state;

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

        data.forEach((tool) => {
            if (tool.activeflag === "active") activeCount++;
            else if (tool.activeflag === "review") reviewCount++;
            else if (tool.activeflag === "archive") archiveCount++;
            else if (tool.activeflag === "rejected") rejectedCount++;
        });

        return (
            <div>
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <Row className="AccountHeader mt-4">
                            <Col xs={8}>
                                <Row>
                                    <span className="Black-20px">Tools</span>
                                </Row>
                                <Row>
                                    <span className="Gray700-13px ">Manage your existing tools or add new ones</span>
                                </Row>
                            </Col>
                            <Col xs={4} style={{ textAlign: "right" }}>
                                <Button variant="primary" href="/tool/add" className="AddButton" onClick={() => Event("Buttons", "Click", "Add a new tool")} >
                                    + Add a new tool
                                </Button>
                            </Col>
                        </Row>

                        <Row className="TabsBackground">
                            <Col sm={12} lg={12}>
                                <Tabs className='DataAccessTabs Gray700-13px' activeKey={this.state.key} onSelect={this.handleSelect}>
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
                                            <Row className="SubHeader mt-3 Gray800-14px-bold">
                                                <Col xs={2}>Updated</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Author</Col>
                                                <Col xs={3}></Col>
                                            </Row>

                                            {activeCount <= 0 ? <NotFound word="tools" /> : data.map((dat) => {
                                                if (dat.activeflag !== "active") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 Gray800-14px">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={'/tool/' + dat.id} className="Black-14px">{dat.name}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 Gray800-14px">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                                                                    <Dropdown.Item href={'/tool/edit/' + dat.id} className="Black-14px">Edit</Dropdown.Item>
                                                                    <DeleteButton id={dat.id} />
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
                                            <Row className="SubHeader mt-3 Gray800-14px-bold">
                                                <Col xs={2}>Updated</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Author</Col>
                                                <Col xs={3}></Col>
                                            </Row>

                                            {reviewCount <= 0 ? <NotFound word="tools" /> : data.map((dat) => {
                                                if (dat.activeflag !== "review") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 Gray800-14px">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={'/tool/' + dat.id} className="Black-14px">{dat.name}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 Gray800-14px">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                {userState[0].role === 'Admin' ?
                                                                    <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                                                                        <Dropdown.Item href={'/tool/edit/' + dat.id} className="Black-14px">Edit</Dropdown.Item>
                                                                        <Dropdown.Item href='#' onClick={() => this.approveTool(dat.id)} className="Black-14px">Approve</Dropdown.Item>
                                                                        <RejectButton id={dat.id} />
                                                                    </DropdownButton>
                                                                    : ""}
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                            })}

                                        </div>
                                    );
                                case "rejected":
                                    return (
                                        <div>
                                            <Row className="SubHeader mt-3 Gray800-14px-bold">
                                                <Col xs={2}>Updated</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Author</Col>
                                                <Col xs={3}></Col>
                                            </Row>

                                            {rejectedCount <= 0 ? <NotFound word="tools" /> : data.map((dat) => {
                                                if (dat.activeflag !== "rejected") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 Gray800-14px">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={'/tool/' + dat.id} className="Black-14px">{dat.name}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 Gray800-14px">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                
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
                                            <Row className="SubHeader mt-3 Gray800-14px-bold">
                                                <Col xs={2}>Updated</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Author</Col>
                                                <Col xs={3}></Col>
                                            </Row>

                                            {archiveCount <= 0 ? <NotFound word="tools" /> : data.map((dat) => {
                                                if (dat.activeflag !== "archive") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 Gray800-14px">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={'/tool/' + dat.id} className="Black-14px">{dat.name}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 Gray800-14px">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                                                                    <Dropdown.Item href={'/tool/edit/' + dat.id} className="Black-14px">Edit</Dropdown.Item>
                                                                    <Dropdown.Item href='#' onClick={() => this.approveTool(dat.id)} className="Black-14px">Approve</Dropdown.Item>
                                                                    <Dropdown.Item href='#' onClick={() => this.rejectTool(dat.id)} className="Black-14px">Reject</Dropdown.Item>
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
        axios.put(baseURL + '/api/v1/accounts/status', {
            id: props.id,
            activeflag: "rejected"
        })
            .then((res) => {
                window.location.href = '/account?tab=tools&toolRejected=true';
            });
    }

    return (
        <>
            <Dropdown.Item href="#" onClick={handleShow} className="Black-14px">Reject</Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reject this tool?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Let the person who added this know know why their submission is being rejected, especially if there’s anything in particular they should correct before re-submitting.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={rejectObject}>Reject and send message</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
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
            <Dropdown.Item href="#" onClick={handleShow} className="Black-14px">Archive</Dropdown.Item>

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

export default AccountTools;