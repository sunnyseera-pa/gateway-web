import React, { useState } from 'react';
import axios from 'axios';

import { Row, Col, Button, Modal, Tabs, Tab, DropdownButton, Dropdown} from 'react-bootstrap';

import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading'

import { Event, initGA } from '../../tracking';

var baseURL = require('../commonComponents/BaseURL').getURL();

class AccountProjects extends React.Component {

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
        this.doProjectsCall();
    }

    doProjectsCall() {
        if (this.state.userState[0].role === "Admin") {
            axios.get(baseURL + '/api/v1/accounts/admin?type=project')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
        else {
            axios.get(baseURL + '/api/v1/accounts?type=project&id=' + this.state.userState[0].id + '')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
    }

    render() {
        const { userState, key, isLoading, data } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        var activeCount = 0;
        var reviewCount = 0;
        var archiveCount = 0;
        var rejectedCount = 0;
        
        data.forEach((project) => {
            if (project.activeflag === "active") activeCount++;
            else if (project.activeflag === "review") reviewCount++;
            else if (project.activeflag === "archive") archiveCount++;
            else if (project.activeflag === "rejected") rejectedCount++;
        });

        return (
            <div>
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <Row className="AccountHeader mt-5">
                            <Col xs={8}>
                                <Row>
                                    <span className="Black-20px">Projects</span>
                                </Row>
                                <Row>
                                    <span className="Gray700-13px ">Manage your existing projets or add new ones</span>   
                                </Row>
                            </Col>
                            <Col xs={4} style={{ textAlign: "center" }}>
                            { this.state.userState[0].role === "Admin" ? 
                                <Button variant="primary" href="/addproject" className="AddButton" onClick={() => Event("Buttons", "Click", "Add a new project")} >
                                    + Add a new project
                                </Button>
                            : ""}
                            </Col>
                        </Row>
                        
                        <Row className="TabsBackground">
                            <Col sm={12} lg={12}>
                                <Tabs className='DataAccessTabs Gray700-13px' activeKey={this.state.key} onSelect={this.handleSelect}>
                                    <Tab eventKey="active" title={"Active ("+activeCount+")"}> </Tab>
                                    <Tab eventKey="pending" title={"Pending approval ("+reviewCount+")"}> </Tab>
                                    <Tab eventKey="rejected" title={"Rejected ("+rejectedCount+")"}> </Tab>
                                    <Tab eventKey="archive" title={"Archive ("+archiveCount+")"}> </Tab>
                                </Tabs>
                            </Col>
                        </Row>



                    { this.state.userState[0].role === "Admin" ? 
                        (() => {
                            switch (key) {
                                case "active":
                                return ( 
                                    <div className="DARDiv">
                                        <Row className="SubHeader mt-3"> 
                                            <Col xs={5}>Name</Col> 
                                            <Col xs={2}>Author</Col> 
                                            <Col xs={4}></Col> 
                                        </Row>

                                        {activeCount <= 0 ? <NotFound word="projects" /> : data.map((dat) => {
                                            if (dat.activeflag !== "active") {
                                                return (<></>)
                                            }
                                            else {
                                                return (
                                                    <Row className="Rectangle mt-1">
                                                        <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/project/' + dat.id} >{dat.name}</a></Col>
                                                        <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                                            {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                return <span>{person.firstname} {person.lastname} <br /></span>
                                                            })}
                                                        </Col>

                                                        <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                                            <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                                                                <Dropdown.Item href={'/editproject/' + dat.id}>Edit</Dropdown.Item>
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
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-3"> 
                                                <Col xs={4}>Name</Col> 
                                                <Col xs={4}>Author</Col> 
                                                <Col xs={4}></Col> 
                                            </Row>
                                            
                                            {reviewCount <= 0 ? <NotFound word="projects" /> : data.map((dat) => {
                                                if (dat.activeflag !== "review") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="Rectangle mt-1">
                                                            <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/project/' + dat.id} >{dat.name}</a></Col>
                                                            <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                                                                    <Dropdown.Item href={'/editproject/' + dat.id}>Edit</Dropdown.Item>
                                                                    <DeleteButton id={dat.id} />
                                                                </DropdownButton>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                            })}
                                            
                                        </div>
                                );
                                case "rejected":
                                    return ( 
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-3"> 
                                                <Col xs={4}>Name</Col> 
                                                <Col xs={4}>Author</Col> 
                                                <Col xs={4}></Col> 
                                            </Row>
                                            
                                            {rejectedCount <= 0 ? <NotFound word="projects" /> : data.map((dat) => {
                                                if (dat.activeflag !== "rejected") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="Rectangle mt-1">
                                                            <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/project/' + dat.id} >{dat.name}</a></Col>
                                                            <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                                                                    <Dropdown.Item href={'/editproject/' + dat.id}>Edit</Dropdown.Item>
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
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-3"> 
                                                <Col xs={4}>Name</Col> 
                                                <Col xs={4}>Author</Col> 
                                                <Col xs={4}></Col> 
                                            </Row>
                                            
                                            {archiveCount <= 0 ? <NotFound word="projects" /> : data.map((dat) => {
                                                if (dat.activeflag !== "archive") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="Rectangle mt-1">
                                                            <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/project/' + dat.id} >{dat.name}</a></Col>
                                                            <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                                                                    <Dropdown.Item href={'/editproject/' + dat.id}>Edit</Dropdown.Item>
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
                        })() 
                    : "" }

                    { this.state.userState[0].role === "Creator" ? 
                        (() => {
                            switch (key) {
                                case "active":
                                return ( 
                                    <div className="DARDiv">
                                        <Row className="SubHeader mt-3"> 
                                            <Col xs={4}>Name</Col> 
                                            <Col xs={4}>Author</Col> 
                                            <Col xs={4}></Col> 
                                        </Row>

                                        {activeCount <= 0 ? <NotFound word="projects" /> : data.map((dat) => {
                                            if (dat.activeflag !== "active") {
                                                return (<></>)
                                            }
                                            else {
                                                return (
                                                    <Row className="Rectangle mt-1">
                                                        <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/project/' + dat.id} >{dat.name}</a></Col>
                                                        <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                                            {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                return <span>{person.firstname} {person.lastname} <br /></span>
                                                            })}
                                                        </Col>

                                                        <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                                            <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                                                                <Dropdown.Item href={'/editproject/' + dat.id}>Edit</Dropdown.Item>
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
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-3"> 
                                                <Col xs={4}>Name</Col> 
                                                <Col xs={4}>Author</Col> 
                                                <Col xs={4}></Col> 
                                            </Row>
                                            
                                            {reviewCount <= 0 ? <NotFound word="projects" /> : data.map((dat) => {
                                                if (dat.activeflag !== "review") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="Rectangle mt-1">
                                                            <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/project/' + dat.id} >{dat.name}</a></Col>
                                                            <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                                                                    <Dropdown.Item href={'/editproject/' + dat.id}>Edit</Dropdown.Item>
                                                                    <DeleteButton id={dat.id} />
                                                                </DropdownButton>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                            })}
                                            
                                        </div>
                                );
                                case "rejected":
                                    return ( 
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-3"> 
                                                <Col xs={4}>Name</Col> 
                                                <Col xs={4}>Author</Col> 
                                                <Col xs={4}></Col> 
                                            </Row>
                                            
                                            {rejectedCount <= 0 ? <NotFound word="projects" /> : data.map((dat) => {
                                                if (dat.activeflag !== "rejected") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="Rectangle mt-1">
                                                            <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/project/' + dat.id} >{dat.name}</a></Col>
                                                            <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                                                                    <Dropdown.Item href={'/editproject/' + dat.id}>Edit</Dropdown.Item>
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
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-3"> 
                                                <Col xs={4}>Name</Col> 
                                                <Col xs={4}>Author</Col> 
                                                <Col xs={4}></Col> 
                                            </Row>
                                            
                                            {archiveCount <= 0 ? <NotFound word="projects" /> : data.map((dat) => {
                                                if (dat.activeflag !== "archive") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="Rectangle mt-1">
                                                            <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/project/' + dat.id} >{dat.name}</a></Col>
                                                            <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                                                {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                                                    return <span>{person.firstname} {person.lastname} <br /></span>
                                                                })}
                                                            </Col>

                                                            <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                                                                    <Dropdown.Item href={'/editproject/' + dat.id}>Edit</Dropdown.Item>
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
                        })() 
                    : "" }
                    </Col>

                    <Col xs={1}></Col>
                </Row>
            </div>
        );
    }
}








class PendingProjects extends React.Component {
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
            axios.get(baseURL + '/api/v1/accounts/admin?type=project&toolState=review')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
        else {
            axios.get(baseURL + '/api/v1/accounts?type=project&id=' + this.state.userState[0].id + '&toolState=review')
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
                window.location.href = '/account?tab=projects&projectRejected=true';
            });
    }

    approveTool = (id) => {
        axios.put(baseURL + '/api/v1/accounts/status', {
            id: id,
            activeflag: "active"
        })
            .then((res) => {
                window.location.href = '/account?tab=projects&projectApproved=true';
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
                    {data.length <= 0 ? <NotFound word='projects' /> : data.map((dat) => {
                        return (<a /* href={'/tool/'+dat.id} */>
                            <div className="Rectangle mt-1">
                                <Row>
                                    <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/project/' + dat.id} >{dat.name}</a></Col>
                                    <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                        {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                            return <span>{person.firstname} {person.lastname} <br /></span>
                                        })}
                                    </Col>
                                    <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                        {userState[0].role === 'Admin' ?
                                            <div>
                                                <Button variant='white' href={'/editproject/' + dat.id} className="AccountButtons mr-2">
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

class ActiveProjects extends React.Component {

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
            axios.get(baseURL + '/api/v1/accounts/admin?type=project&toolState=active')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
        else {
            axios.get(baseURL + '/api/v1/accounts?type=project&id=' + this.state.userState[0].id + '&toolState=active')
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
                    {data.length <= 0 ? <NotFound word="projects" /> : data.map((dat) => {
                        return (<div className="Rectangle mt-1">
                            <Row>
                                <Col sm={12} lg={5} className="pl-2 pt-2 Gray800-14px-bold"><a href={'/project/' + dat.id} >{dat.name}</a></Col>
                                <Col sm={12} lg={2} className="pl-2 pt-2 Gray800-14px-bold">
                                    {dat.persons <= 0 ? 'Author not listed' : dat.persons.map((person) => {
                                        return <span>{person.firstname} {person.lastname} <br /></span>
                                    })}
                                </Col>


                                <Col sm={12} lg={5} className="pl-5 toolsButtons">
                                    <DeleteButton id={dat.id} />
                                    <Button variant='white' href={'/editproject/' + dat.id} className="AccountButtons" >
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
                window.location.href = '/account?tab=projects&projectDeleted=true';
            });
    }

    return (
        <>
            <Dropdown.Item href="#" onClick={handleShow}>Archive</Dropdown.Item>
            
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

class ArchiveProjects extends React.Component {

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
            axios.get(baseURL + '/api/v1/accounts/admin?type=project&toolState=archive')
                .then((res) => {
                    this.setState({ data: res.data.data, isLoading: false });
                });
        }
        else {
            axios.get(baseURL + '/api/v1/accounts?type=project&id=' + this.state.userState[0].id + '&toolState=archive')
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
                window.location.href = '/account?tab=projects&projectApproved=true';
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
                    {data.length <= 0 ? <NotFound word="projects" /> : data.map((dat) => {
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
                                    <Button variant='white' href={'/editproject/' + dat.id} className="AccountButtons" >
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


export default AccountProjects;