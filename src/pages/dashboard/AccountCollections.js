import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import { Row, Col, Button, Modal, Tabs, Tab, DropdownButton, Dropdown } from 'react-bootstrap';

import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading'

import { Event, initGA } from '../../tracking';

var baseURL = require('../commonComponents/BaseURL').getURL();

class AccountCollections extends React.Component {

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
        this.doCollectionsCall();
    }

    doCollectionsCall() {
        if (this.state.userState[0].role === "Admin") {
            axios.get(baseURL + '/api/v1/accounts/admin/collections') 
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
        else {
            axios.get(baseURL + '/api/v1/accounts/collections?id=' + this.state.userState[0].id + '')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
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
        var archiveCount = 0;

        data.forEach((collection) => {
            if (collection.activeflag === "active") activeCount++;
            else if (collection.activeflag === "archive") archiveCount++;
        });

        return (
            <div>
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <Row className="accountHeader mt-4">
                            <Col xs={8}>
                                <Row>
                                    <span className="black-20">Collections</span>
                                </Row>
                                <Row>
                                    <span className="gray700-13 ">Manage your existing collections or create new ones</span>
                                </Row>
                            </Col>
                            <Col xs={4} style={{ textAlign: "right" }}>
                                <Button variant="primary" href="/addcollection" className="addButton" onClick={() => Event("Buttons", "Click", "Add a new collection")} >
                                    + Create a collection
                                </Button> 
                            </Col>
                        </Row>

                        <Row className="tabsBackground">
                            <Col sm={12} lg={12}>
                                <Tabs className='dataAccessTabs gray700-13' activeKey={this.state.key} onSelect={this.handleSelect}>
                                    <Tab eventKey="active" title={"Active (" + activeCount + ")"}> </Tab>
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
                                                <Col xs={2}>Updated</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Author</Col>
                                                <Col xs={3}></Col>
                                            </Row>

                                            {activeCount <= 0 ? <NotFound word="collections" /> : data.map((dat) => {
                                                if (dat.activeflag !== "active") { 
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={'/collection/' + dat.id} className="black-14">{dat.name}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="floatRight">
                                                                    <Dropdown.Item href={'/editcollection/' + dat.id} className="black-14">Edit</Dropdown.Item>
                                                                    {/* <Dropdown.Item className="black-14">Archive</Dropdown.Item> */}
                                                                    <ArchiveButton id={dat.id} />
                                                                    {/* <Dropdown.Item className="black-14">Delete</Dropdown.Item> */}
                                                                    <DeleteButton id={dat.id} />
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
                                                <Col xs={2}>Updated</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Author</Col>
                                                <Col xs={3}></Col>
                                            </Row>

                                            {archiveCount <= 0 ? <NotFound word="collections" /> : data.map((dat) => {
                                                if (dat.activeflag !== "archive") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={'/collection/' + dat.id} className="black-14">{dat.name}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col> 

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="floatRight">
                                                                    <Dropdown.Item href={'/editcollection/' + dat.id} className="black-14">Edit</Dropdown.Item>
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

function ArchiveButton(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const archiveObject = () => {
        axios.put(baseURL + '/api/v1/collections/archive', { 
            id: props.id,
            activeflag: "archive"
        })
            .then((res) => {
                window.location.href = '/account?tab=collections&collectionArchived=true';
            });
    }

    return (
        <>
            <Dropdown.Item href="#" onClick={handleShow} className="black-14">Archive</Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Archive this collection?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This collection will be archived from the directory.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No, nevermind</Button>
                    <Button variant="primary" onClick={archiveObject}>Yes, archive</Button> 
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
        axios.delete(baseURL + '/api/v1/collections/delete/' + props.id) 
            .then((res) => {
                window.location.href = '/account?tab=collections&collectionDeleted=true';
            });
    }

    return (
        <>
            <Dropdown.Item href="#" onClick={handleShow} className="black-14">Delete</Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete this collection?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This collection will be deleted from the directory.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No, nevermind</Button>
                    <Button variant="primary" onClick={deleteObject}>Yes, delete</Button> 
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AccountCollections;