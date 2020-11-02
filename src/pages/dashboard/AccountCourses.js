import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import { Row, Col, Button, Modal, Tabs, Tab, DropdownButton, Dropdown } from 'react-bootstrap';

import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading'
import './Dashboard.scss'; 
import ActionModal from '../commonComponents/ActionModal/ActionModal'
import _ from 'lodash';

import { Event, initGA } from '../../tracking';

var baseURL = require('../commonComponents/BaseURL').getURL();

class AccountCourses extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        userState: [],
        key: 'active',
        data: [],
        isLoading: true,
        activeCount: 0,
        reviewCount: 0,
        archiveCount: 0,
        rejectedCount: 0,
        actionModalConfig: {
            id: '',
            title: 'Reject this course?'
        }
    };

    handleSelect = (key) => {
        this.setState({ key: key });
    }

    componentDidMount() {
        initGA('UA-166025838-1');
        this.doCoursesCall();
    }

    doCoursesCall() {
        this.setState({isLoading: true});
        axios.get(baseURL + '/api/v1/course/getList')
        .then((res) => {
            this.setState({ data: res.data.data, isLoading: false });

            let activeCount = 0;
            let reviewCount = 0;
            let archiveCount = 0;
            let rejectedCount = 0;
        
            res.data.data.forEach((course) => {
                if (course.activeflag === "active") activeCount++;
                else if (course.activeflag === "review") reviewCount++;
                else if (course.activeflag === "archive") archiveCount++;
                else if (course.activeflag === "rejected") rejectedCount++;
                });
        
            this.setState({ 
                activeCount: activeCount,
                reviewCount: reviewCount,
                archiveCount: archiveCount,
                rejectedCount: rejectedCount
            });
        })
    }

    approveCourse = (id) => {
        axios.patch(baseURL + '/api/v1/course/' + id, {
            activeflag: "active"
        })
        .then((res) => {
            this.doCoursesCall();
            if(shouldChangeTab(this.state)){
                this.setState({key: "active"});
            }
        });
    }

    updateCounters = (data) => {
        let activeCount = 0;
        let reviewCount = 0;
        let archiveCount = 0;
        let rejectedCount = 0;
    
        data.forEach((course) => {
            if (course.activeflag === "active") activeCount++;
            else if (course.activeflag === "review") reviewCount++;
            else if (course.activeflag === "archive") archiveCount++;
            else if (course.activeflag === "rejected") rejectedCount++;
        });
    
        this.setState({ 
            activeCount: activeCount,
            reviewCount: reviewCount,
            archiveCount: archiveCount,
            rejectedCount: rejectedCount});
    }

    rejectObject = (id, rejectionReason) => {
        axios.patch(baseURL + '/api/v1/course/'+ id, {
            id: id,
            activeflag: "rejected",
            rejectionReason: rejectionReason
        })
        .then((res) => {
            this.doCoursesCall();
            if(shouldChangeTab(this.state)){
                this.setState({key: "active"});
            }
        });
    }

    deleteObject = (id) => {
        axios.patch(baseURL + '/api/v1/course/'+ id, {
            id: id,
            activeflag: "archive"
        })
        .then((res) => {
            this.doCoursesCall();
            if(shouldChangeTab(this.state)){
                this.setState({key: "active"});
            }
        });
    }

    toggleActionModal = () => {
		this.setState((prevState) => {
			return {
				showActionModal: !prevState.showActionModal,
				actionModalConfig: this.state.actionModalConfig
			};
		});
	};

    render() {
        const { userState, key, isLoading, data, activeCount, reviewCount, archiveCount, rejectedCount, showActionModal, actionModalConfig } = this.state;

        if (isLoading) {
            return (
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <Loading />
                    </Col>
                    <Col xs={1}></Col>
                </Row>
            );
        }

        return (
            <div>
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <Row className="accountHeader">
                            <Col sm={12} md={8}>
                                <Row>
                                    <span className="black-20">Courses</span>
                                </Row>
                                <Row>
                                    <span className="gray700-13 ">Manage your existing courses or add new ones</span>
                                </Row>
                            </Col>
                            <Col sm={12} md={4} style={{ textAlign: "right" }}>
                                <Button variant="primary" href="/course/add" className="addButton" onClick={() => Event("Buttons", "Click", "Add a new course")} >
                                    + Add a new course
                                </Button>
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
                                            {activeCount <= 0 ? '' :
                                            <Row className="subHeader mt-3 gray800-14-bold">
                                                <Col xs={2}>Updated</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Author</Col>
                                                <Col xs={3}></Col>
                                            </Row>}

                                            {activeCount <= 0 ? 
                                            <Row className="margin-right-15">
                                                <NotFound word="courses" /> 
                                            </Row>
                                            : data.map((dat, i) => {
                                                if (dat.activeflag !== "active") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox" key={i}>
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={'/course/' + dat.id} className="black-14">{dat.title}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="floatRight">
                                                                    <Dropdown.Item href={'/course/' + dat.id} className="black-14">View</Dropdown.Item>
                                                                    <Dropdown.Item href={'/course/edit/' + dat.id} className="black-14">Edit</Dropdown.Item>
                                                                    <DeleteButton id={dat.id} deleteObject={this.deleteObject}/>
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
                                            {reviewCount <= 0 ? '' :
                                            <Row className="subHeader mt-3 gray800-14-bold">
                                                <Col xs={2}>Updated</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Author</Col>
                                                <Col xs={3}></Col>
                                            </Row>}

                                            {reviewCount <= 0 ? 
                                            <Row className="margin-right-15">
                                                <NotFound word="courses" /> 
                                            </Row>
                                            : data.map((dat) => {
                                                if (dat.activeflag !== "review") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={'/course/' + dat.id} className="black-14">{dat.title}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                {userState[0].role === 'Admin' ?
                                                                    <DropdownButton variant="outline-secondary" alignRight title="Actions" className="floatRight">
                                                                        <Dropdown.Item href={'/course/edit/' + dat.id} className="black-14">Edit</Dropdown.Item>
                                                                        <Dropdown.Item href='#' onClick={() => this.approveCourse(dat.id)} className="black-14">Approve</Dropdown.Item>
                                                                        <Dropdown.Item href='#' onClick={() => this.toggleActionModal()} className="black-14">Reject</Dropdown.Item>
                                                                        <ActionModal id={dat.id} open={showActionModal} context={actionModalConfig}  updateApplicationStatus={this.rejectObject} close={this.toggleActionModal}/>
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
                                            {rejectedCount <= 0 ? '' :
                                            <Row className="subHeader mt-3 gray800-14-bold">
                                                <Col xs={2}>Updated</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Author</Col>
                                                <Col xs={3}></Col>
                                            </Row>}

                                            {rejectedCount <= 0 ? 
                                            <Row className="margin-right-15">
                                                <NotFound word="courses" /> 
                                            </Row>
                                            : data.map((dat) => {
                                                if (dat.activeflag !== "rejected") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={'/course/' + dat.id} className="black-14">{dat.title}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">
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
                                            {archiveCount <= 0 ? '' :
                                            <Row className="subHeader mt-3 gray800-14-bold">
                                                <Col xs={2}>Updated</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Author</Col>
                                                <Col xs={3}></Col>
                                            </Row>}

                                            {archiveCount <= 0 ? 
                                            <Row className="margin-right-15">
                                                <NotFound word="courses" /> 
                                            </Row>
                                            : data.map((dat) => {
                                                if (dat.activeflag !== "archive") {
                                                    return (<></>)
                                                } 
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{moment(dat.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={'/course/' + dat.id} className="black-14">{dat.title}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="floatRight">
                                                                    <Dropdown.Item href={'/course/edit/' + dat.id} className="black-14">Edit</Dropdown.Item>
                                                                    <Dropdown.Item href='#' onClick={() => this.approveCourse(dat.id)} className="black-14">Approve</Dropdown.Item>
                                                                    <Dropdown.Item href='#' onClick={() => this.toggleActionModal()} className="black-14">Reject</Dropdown.Item>
                                                                    <ActionModal id={dat.id} open={showActionModal} context={actionModalConfig}  updateApplicationStatus={this.rejectObject} close={this.toggleActionModal}/>
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
    const deleteObject = () => props.deleteObject(props.id); 

    return (
        <>
            <Dropdown.Item href="#" onClick={handleShow} className="black-14">Archive</Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Archive this course?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This course will be archived from the directory.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No, nevermind</Button>
                    <Button variant="primary" onClick={deleteObject}>Yes, archive</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function shouldChangeTab(state){
    return (state.key === 'pending' && state.reviewCount <= 1) || (state.key === 'archive' && state.archiveCount <= 1)? true : false;
}

export default AccountCourses;