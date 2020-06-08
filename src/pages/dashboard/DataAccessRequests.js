import React, { useState } from 'react';
import axios from 'axios';

import { Row, Col, Button, Modal, Container, Tabs, Tab } from 'react-bootstrap';

import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading';

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
        key: 'presubmission',
        data: [],
        isLoading: true
    };

    componentDidMount() {
        this.getDARsFromDb();
      }

    getDARsFromDb = () => {
        this.setState({ isLoading: true });
        axios.get(baseURL + '/api/v1/dar')
          .then((res) => {
            this.setState({
              data: res.data.data,
              isLoading: false
            });
          })
    }

    handleSelect = (key) => {
        this.setState({ key: key });
    }

    render() {
        const { userState, key, isLoading, data } = this.state;


        if (isLoading) {
            return <Container><Loading /></Container>;
          }

        return (
            
            <div>
                <Row>
                    <Col xs={2}></Col>
                    <Col xs={8}>
                        <Row className="AccountHeader mt-3">
                            <Col xs={8}>
                                <Row>
                                    <span className="Black-20px">Data access request applications</span>
                                </Row>
                                <Row>
                                    <span className="Gray700-13px ">Manage forms and applications</span>   
                                </Row>
                            </Col>
                            <Col xs={4} style={{ textAlign: "center" }}>
                            { this.state.userState[0].role === "Admin" ? 
                                <Button variant="primary" href="" className="AddButton">
                                    + Add a new form
                                </Button>
                            : ""}
                            </Col>
                        </Row>
                        <Row className="TabsBackground">
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
                        {/* AND DAR FOR THIS CUSTODIAN */}
                    { this.state.userState[0].role === "Admin" ? 
                        (() => {
                            switch (key) {
                                case "presubmission":
                                return ( 
                                    <div className="DARDiv">
                                        <Row className="SubHeader mt-3"> <Col sm={2} lg={2}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={3} lg={3}>Applicant</Col> <Col sm={4} lg={4}>Progress</Col> </Row>
                                    
                                    {data.map(dat => (
                                        
                                        <Row className="SubHeader mt-1">
                                            <PreSubCustodian data={dat}/> 
                                        </Row>          
                                    ))}
   
                                    </div>
                                );
                                case "inreview":
                                    return ( 
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-3"> <Col sm={2} lg={2}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={3} lg={3}>Applicant</Col> <Col sm={4} lg={4}>Progress</Col> </Row>
                                            {data.map(dat => (
                                                
                                                <Row className="SubHeader mt-1">
                                                    <InReviewCustodian data={dat}/> 
                                                </Row>          
                                            ))}
                                        </div>
                                );
                                case "approved":
                                    return ( 
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-3"> <Col sm={2} lg={2}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={3} lg={3}>Applicant</Col> <Col sm={4} lg={4}>Progress</Col> </Row>
                                            {data.map(dat => (
                                                
                                                <Row className="SubHeader mt-1">
                                                    <ApprovedCustodian data={dat}/> 
                                                </Row>          
                                            ))}
                                        </div>
                                );
                                case "rejected":
                                    return ( 
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-3"> <Col sm={2} lg={2}>Updated</Col> <Col sm={3} lg={3}>Dataset</Col> <Col sm={3} lg={3}>Applicant</Col> <Col sm={4} lg={4}>Progress</Col> </Row>
                                            {data.map(dat => (
                                                
                                                <Row className="SubHeader mt-1">
                                                    <RejectedCustodian data={dat}/> 
                                                </Row>          
                                            ))}
                                        </div>
                                );
                                case "forms":
                                    return ( 
                                        <div className="DARDiv">
                                            <Row className="SubHeader mt-1"> <span className="ml-5">Forms placeholder</span> </Row> 
                                        </div>
                                );
                            }
                        })() 
                    : "" }

                        {/* AND ROLE IS INNOVATOR */}
                        {/* AND DARs MADE WITH THIS USER ID */}

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
                    </Col>

                    <Col xs={2}></Col>
                </Row>
            </div>
        );
    }
}

export default DataAccessRequests;