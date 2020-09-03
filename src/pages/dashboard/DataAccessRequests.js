import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import { Row, Col, Button, Modal, Tabs, Tab, DropdownButton, Dropdown } from 'react-bootstrap';

import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading'
import './Dashboard.scss'; 

import { Event, initGA } from '../../tracking';

var baseURL = require('../commonComponents/BaseURL').getURL();

class DataAccessRequestsNew extends React.Component {

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

    handleSelect = (key) => {
        this.setState({ key: key });
    }

    componentDidMount() {
        initGA('UA-166025838-1');
        this.doDataAccessRequestsCall();
    }

    doDataAccessRequestsCall() {
        axios.get(baseURL + '/api/v1/data-access-request')
            .then((res) => {
                this.setState({ data: res.data.data, isLoading: false });
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

        var preSubmissionCount = 0;
        var reviewCount = 0;

        data.forEach((dar) => {
            if (dar.applicationStatus === "inProgress") preSubmissionCount++;
            else if (dar.applicationStatus === "submitted") reviewCount++;
        });

        return (
            <div>
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <Row className="accountHeader">
                            <Col xs={8}>
                                <Row>
                                    <span className="black-20">Data access request applications</span>
                                </Row>
                                <Row>
                                    <span className="gray700-13 ">Manage forms and applications</span>
                                </Row>
                            </Col>
                            <Col xs={4} style={{ textAlign: "right" }}>
                                
                            </Col>
                        </Row>

                        <Row className="tabsBackground">
                            <Col sm={12} lg={12}>
                                <Tabs className='dataAccessTabs gray700-13' activeKey={this.state.key} onSelect={this.handleSelect}>
                                    <Tab eventKey="presubmission" title={"Pre-submission (" + preSubmissionCount + ")"}> </Tab>
                                    <Tab eventKey="inreview" title={"In review (" + reviewCount + ")"}> </Tab>
                                </Tabs>
                            </Col>
                        </Row>

                        {(() => {
                            switch (key) {
                                case "presubmission":
                                    return (
                                        <div>
                                            {preSubmissionCount <= 0 ? '' :
                                            <Row className="subHeader mt-3 gray800-14-bold">
                                                <Col xs={2}>Updated</Col>
                                                <Col xs={5}>Dataset(s)</Col>
                                                <Col xs={2}>Progress</Col> 
                                                <Col xs={3}></Col>
                                            </Row>}

                                            {preSubmissionCount <= 0 ? 
                                            <Row className="margin-right-15">
                                                <NotFound word="data access requests" /> 
                                            </Row>
                                            : data.map((app) => {
                                                if (app.applicationStatus !== "inProgress") {
                                                    return (<></>)
                                                } 
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{moment(app.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={`/data-access-request/${app._id}`} className="black-14">{app.datasets.map(ds => ds.name).join(', ')}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14"></Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="floatRight">
                                                                    <Dropdown.Item href={`/data-access-request/${app._id}`} className="black-14">View</Dropdown.Item>
                                                                </DropdownButton>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                            })}

                                        </div>
                                    );
                                case "inreview":
                                    return (
                                        <div>
                                            {reviewCount <= 0 ? '' :
                                            <Row className="subHeader mt-3 gray800-14-bold">
                                                <Col xs={2}>Updated</Col>
                                                <Col xs={5}>Dataset(s)</Col>
                                                <Col xs={2}>Progress</Col> 
                                                <Col xs={3}></Col>
                                            </Row>}

                                            {reviewCount <= 0 ? 
                                            <Row className="margin-right-15">
                                                <NotFound word="data access requests" /> 
                                            </Row>
                                            : data.map((app) => {
                                                if (app.applicationStatus !== "submitted") {
                                                    return (<></>)
                                                }
                                                else {
                                                    return (
                                                        <Row className="entryBox">
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14">{moment(app.updatedAt).format('D MMMM YYYY HH:mm')}</Col>
                                                            <Col sm={12} lg={5} className="pt-2"><a href={`/data-access-request/${app._id}`} className="black-14">{app.datasets.map(ds => ds.name).join(', ')}</a></Col>
                                                            <Col sm={12} lg={2} className="pt-2 gray800-14"></Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: "right" }} className="toolsButtons">
                                                                <DropdownButton variant="outline-secondary" alignRight title="Actions" className="floatRight">
                                                                    <Dropdown.Item href={`/data-access-request/${app._id}`} className="black-14">View</Dropdown.Item>
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

export default DataAccessRequestsNew;