import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import UnmetDemand from './DARComponents/UnmetDemand';

import { Row, Col, Button, Modal, Tabs, Tab, DropdownButton, Dropdown } from 'react-bootstrap';

import Loading from '../commonComponents/Loading'

import { Event, initGA } from '../../tracking';

var baseURL = require('../commonComponents/BaseURL').getURL();

class AccountAnalyticsDashboard extends React.Component {

    // initialize our state
    state = {
        userState: [],
        key: 'Datasets',
        data: [],
        //TODO temporary dates used to check functionality of date dropdown - update to use actual values (ordered so the most recent month is the first option, and therefore the selected option, in the array)
        dates: ["2020-06-13T00:00:00.000Z", "2020-05-13T00:00:00.000Z", "2020-04-13T00:00:00.000Z"],
        selectedOption: '',
        isLoading: false
    };

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
        this.state.selectedOption = moment(this.state.dates[0]).format("MMMM YYYY");
    }

    handleSelect = (key) => {
        this.setState({ key: key });
    }

    handleDateSelect(eventKey, event) {
        this.setState({ selectedOption: this.state.dates[eventKey] });
      }

    componentDidMount() {
        initGA('UA-166025838-1');
        this.getUnmetDemand();
    }

    //TODO update the below call to the api you set up for the stats needed for unmet demand - using this old one as a placeholder in the mean time
    getUnmetDemand(){
        axios.get(baseURL + '/api/v1/stats/unmet') 
        .then((res) => {
            this.setState({ data: res.data.data, isLoading: false });
        });
    }

    render() {
        const { userState, key, isLoading, data, dates } = this.state;

        console.log('data: ' + JSON.stringify(data))

        //TODO temporary date used to check moment format to be used in select options below
        let date = "2020-01-13T00:00:00.000Z"; 

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

        return (
            <div>
                <Row>
                    <Col sm={1} lg={1}></Col> 
                    <Col sm={10} lg={10} className="dashboardPadding">
                        <Row className="accountHeader mt-4">
                            <Col sm={12} lg={12}>
                                <Row >
                                    <Col sm={8} lg={8}>
                                    {/* <Col sm={12} lg={12}> */}
                                        <span className="black-20">Dashboard</span>
                                    </Col>
                                    <Col sm={4} lg={4}>
                                        {/*TODO use this moment format on the updated date */}
                                        <span className="gray700-13 floatRight">Last updated: {moment().format("DD MMM YYYY, hh:mm")}</span>
                                    </Col> 
                                </Row>
                                <Row>
                                    <Col sm={8} lg={8}>
                                        <span className="gray700-13">A collection of statistics, metrics and analytics; giving an overview of the sites data and performance</span>
                                    </Col> 
                                    <Col sm={4} lg={4}> 

                                        
                                        <div className="select_option">
                                            <DropdownButton variant="light" alignRight className="floatRight gray800-14" title={moment(this.state.selectedOption).format("MMMM YYYY")} id="dateDropdown" onSelect={this.handleDateSelect.bind(this)} >
                                                 {/*TODO loop through months with data available to display dropdown options - using temporary array dates here to check how this looks */}
                                                {dates.map((date, i) => (
                                                    <Dropdown.Item className="gray800-14" key={i} eventKey={i}>
                                                        {moment(date).format("MMMM YYYY")}
                                                    </Dropdown.Item>
                                                ))}
                                            </DropdownButton>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="accountHeader mt-4">
                            <Col sm={12} lg={12}>
                                <Row >
                                    <Col sm={12} lg={12}>
                                        <span className="black-20">Unmet demand</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} lg={12}>
                                        <span className="gray700-13">For each resource type, which searches yielded no results, ordered by highest number of repeat searches</span>
                                    </Col>
                                </Row>
                            </Col> 
                        </Row>

                        <Row className="tabsBackground">
                            <Col sm={12} lg={12}>
                                <Tabs className='dataAccessTabs gray700-13' activeKey={this.state.key} onSelect={this.handleSelect}>
                                    <Tab eventKey="Datasets" title={'Datasets'}></Tab>
                                    <Tab eventKey="Tools" title={'Tools'}></Tab>
                                    <Tab eventKey="Projects" title={'Projects'}></Tab>
                                    <Tab eventKey="Papers" title={'Papers'}></Tab>
                                    <Tab eventKey="People" title={'People'}></Tab>
                                </Tabs>
                            </Col>
                        </Row>


                        {(() => {
                            switch (key) {
                                case "Datasets":
                                    return (
                                        <div>
                                            <Row>
                                                <Col sm={12} lg={12}>
                                                <Row className="subHeader mt-3 gray800-14-bold">
                                                    <Col sm={8} lg={8}>Search term </Col>
                                                    <Col sm={2} lg={2}>Searches</Col>
                                                    <Col sm={2} lg={2}>Dataset results</Col>
                                                </Row>
                                                {/*TODO map here and return <UnmetDemand /> with the relevant data for the top 10 unmet demand search terms for datasets */}
                                                {/* using data from placeholder api call here */}
                                                    {data.map((dat) => {
                                                        return <UnmetDemand data={dat} />
                                                    })}
                                                </Col>
                                            </Row>
                                        </div> 
                                    );
                                case "Tools":
                                    return (
                                        <div>
                                            <Row>
                                                <Col sm={12} lg={12}>
                                                <Row className="subHeader mt-3 gray800-14-bold">
                                                    <Col sm={8} lg={8}>Search term </Col>
                                                    <Col sm={2} lg={2}>Searches</Col>
                                                    <Col sm={2} lg={2}>Tool results</Col>
                                                </Row>
                                                {/*TODO map here and return <UnmetDemand /> with the relevant data for the top 10 unmet demand search terms for tools */}
                                                    <UnmetDemand />
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                case "Projects":
                                    return (
                                        <div>
                                            <Row>
                                                <Col sm={12} lg={12}>
                                                <Row className="subHeader mt-3 gray800-14-bold">
                                                    <Col sm={8} lg={8}>Search term </Col>
                                                    <Col sm={2} lg={2}>Searches</Col>
                                                    <Col sm={2} lg={2}>Project results</Col>
                                                </Row>
                                                {/*TODO map here and return <UnmetDemand /> with the relevant data for the top 10 unmet demand search terms for projects */}
                                                    <UnmetDemand />
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                case "Papers":
                                    return (
                                        <div>
                                            <Row>
                                                <Col sm={12} lg={12}>
                                                <Row className="subHeader mt-3 gray800-14-bold">
                                                    <Col sm={8} lg={8}>Search term </Col>
                                                    <Col sm={2} lg={2}>Searches</Col>
                                                    <Col sm={2} lg={2}>Paper results</Col>
                                                </Row>
                                                {/*TODO map here and return <UnmetDemand /> with the relevant data for the top 10 unmet demand search terms for papers */}
                                                    <UnmetDemand />
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                case "People":
                                    return (
                                        <div>
                                            <Row>
                                                <Col sm={12} lg={12}>
                                                <Row className="subHeader mt-3 gray800-14-bold">
                                                    <Col sm={8} lg={8}>Search term </Col>
                                                    <Col sm={2} lg={2}>Searches</Col>
                                                    <Col sm={2} lg={2}>People results</Col>
                                                </Row>
                                                {/*TODO map here and return <UnmetDemand /> with the relevant data for the top 10 unmet demand search terms for people */}
                                                    <UnmetDemand />
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                        }})()}
                    </Col>
                    <Col sm={1} lg={10} />
                </Row>
            </div>
        );
    }
}

export default AccountAnalyticsDashboard;