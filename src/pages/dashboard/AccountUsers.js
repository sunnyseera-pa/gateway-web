import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import { Row, Col, Button, Modal, Tabs, Tab, DropdownButton, Dropdown } from 'react-bootstrap';

import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading'

import { Event, initGA } from '../../tracking';

var baseURL = require('../commonComponents/BaseURL').getURL();

class AccountUsers extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        userState: [],
        key: 'user',
        data: [],
        isLoading: true
    };

    handleSelect = (key) => {
        this.setState({ key: key });
    }

    componentDidMount() {
        initGA('UA-166025838-1');
        this.doUsersCall();
    }

    doUsersCall() {
        axios.get(baseURL + '/api/v1/accounts/admin?type=project')
            .then((res) => {
                this.setState({ data: res.data.data, isLoading: false });
            });
    }

    approveProject = (id) => {
        axios.put(baseURL + '/api/v1/accounts/status', {
            id: id,
            activeflag: "active"
        })
            .then((res) => {
                window.location.href = '/account?tab=projects&projectApproved=true';
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

        var userCount = 0;
        var dataCustodianCount = 0;
        var adminCount = 0;

        data.forEach((user) => {
            if (user.role === "Creator") userCount++;
            else if (user.role === "DataCustodian") dataCustodianCount++;
            else if (user.role === "Admin") adminCount++;
        });

        return (
            <div>
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <Row className="accountHeader mt-4">
                            <Col xs={8}>
                                <Row>
                                    <span className="black-20">Users and roles</span>
                                </Row>
                                <Row>
                                    <span className="gray700-13 ">Manage permissions by changing user roles</span>
                                </Row>
                            </Col>
                            <Col xs={4}></Col>
                        </Row>

                        <Row className="tabsBackground">
                            <Col sm={12} lg={12}>
                                <Tabs className='dataAccessTabs gray700-13' activeKey={this.state.key} onSelect={this.handleSelect}>
                                    <Tab eventKey="user" title={"Users (" + userCount + ")"}> </Tab>
                                    <Tab eventKey="datacustodian" title={"Data Custodian (" + dataCustodianCount + ")"}> </Tab>
                                    <Tab eventKey="admin" title={"Admin (" + adminCount + ")"}> </Tab>
                                </Tabs>
                            </Col>
                        </Row>

                        {(() => {
                            switch (key) {
                                case "user":
                                    return (
                                        <div>
                                            <Row className="subHeader mt-3 gray800-14-bold">
                                                <Col xs={2}>Account created</Col>
                                                <Col xs={3}>Name</Col>
                                                <Col xs={4}>Institution</Col>
                                                <Col xs={3}></Col>
                                            </Row>

                                            {userCount <= 0 ? <NotFound word="users" /> : data.map((dat) => {
                                                if (dat.activeflag !== "active") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={3} className="pt-2"><a href={'/project/' + dat.id} className="black-14">{dat.name}</a></Col>
                                                            <Col sm={12} lg={4} className="pt-2 gray800-14">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="floatRight">
                                                                    <Dropdown.Item href={'/editproject/' + dat.id} className="black-14">Edit</Dropdown.Item>
                                                                    <DeleteButton id={dat.id} />
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
                window.location.href = '/account?tab=projects&projectDeleted=true';
            });
    }

    return (
        <>
            <Dropdown.Item href="#" onClick={handleShow} className="black-14">Archive</Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Archive this project?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This project will be archived from the directory.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No, nevermind</Button>
                    <Button variant="primary" onClick={deleteObject}>Yes, archive</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AccountUsers;