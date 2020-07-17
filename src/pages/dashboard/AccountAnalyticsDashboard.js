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
        dates: getDatesForDropdown(),
        selectedOption: '',
        isLoading: false
    };

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
        this.state.selectedOption = moment(this.state.dates[0]).format("MMMM YYYY");
    }

    handleSelect = (key) => {
        this.setState({ key: key },
            ()=>{
                this.getUnmetDemand(this.state.selectedOption)
            });
    }

    handleDateSelect(eventKey, event) {
        this.setState({ selectedOption: this.state.dates[eventKey] });
        this.getUnmetDemand(this.state.dates[eventKey]);
      }

    componentDidMount() {
        initGA('UA-166025838-1');
        this.getUnmetDemand();
    }

    getUnmetDemand(selectedOption){
        let date = new Date(selectedOption);
        let selectedMonth = date.getMonth(selectedOption) +1 || new Date().getMonth() +1;
        let selectedYear = date.getFullYear(selectedOption) || new Date().getFullYear();
        
        axios.get(baseURL + '/api/v1/stats/unmet'+ this.state.key, {
            params: {
                month: selectedMonth,
                year: selectedYear
            }
        }) 
        .then((res) => {
            this.setState({data: []});
            res.data.data.entity = this.state.key;
            this.setState({ data: res.data.data, isLoading: false });
        });
    }

    render() {
        const { userState, key, isLoading, data, dates } = this.state;

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
                                <Tabs className='dataAccessTabs gray700-13' activeKey={this.state.key} onSelect={this.handleSelect.bind(this)}>
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
                                                    {data.map((dat) => {
                                                        return <UnmetDemand data={dat}/>
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
                                                    {data.map((dat) => {
                                                            return <UnmetDemand data={dat}/>
                                                        })}
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
                                                    {data.map((dat) => {
                                                                return <UnmetDemand data={dat}/>
                                                            })}
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
                                                    {data.map((dat) => {
                                                                return <UnmetDemand data={dat}/>
                                                            })}
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
                                                    {data.map((dat) => {
                                                                return <UnmetDemand data={dat}/>
                                                            })}
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

const getDatesForDropdown = (req, res) => {

    let startDate = new Date('2020-05-01T00:00:00.000Z');
    let stopDate = new Date();
    let dateArray = new Array();
    let currentDate = startDate;

    while (currentDate <= stopDate) {
    if(currentDate.getUTCDate() == 1)
        dateArray.push(currentDate)
    
    currentDate = currentDate.addDays(1);
    }
    return dateArray.reverse();
}

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}