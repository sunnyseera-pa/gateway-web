import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import UnmetDemand from './DARComponents/UnmetDemand';
import { Row, Col, Button, Modal, Tabs, Tab, DropdownButton, Dropdown } from 'react-bootstrap';
import DashboardKPI from './DARComponents/DashboardKPI';
import Loading from '../commonComponents/Loading'
import { Event, initGA } from '../../tracking';

var baseURL = require('../commonComponents/BaseURL').getURL();

class AccountAnalyticsDashboard extends React.Component {

    // initialize our state
    state = {
        userState: [],
        key: 'Datasets',
        data: [],
        statsDataType: [],
        statsDataTime: [],
        totalGAUsers: 0,
        gaUsers: 0,
        searchesWithResults: 0,
        accessRequests: 0,
        uptime: 0,
        datasetsWithTechMetaData: 0,
        dates: getDatesForDropdown(),
        selectedOption: '',
        isLoading: true
    };
    

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
        this.state.selectedOption = this.state.dates[0];
    }

    handleSelect = (key) => {
        this.setState({ key: key },
            ()=>{
                this.getUnmetDemand(this.state.selectedOption)
            });
    }

    async handleDateSelect(eventKey, event) {
        this.setState({ selectedOption: this.state.dates[eventKey] });
        this.getUnmetDemand(this.state.dates[eventKey]);
        await Promise.all([
            this.getStats(),
            this.getTotalGAUsers(),
            this.getGAUsers(moment(this.state.dates[eventKey]).startOf('month').format("YYYY-MM-DD"), moment(this.state.dates[eventKey]).endOf('month').format("YYYY-MM-DD")),
            this.getKPIs(this.state.dates[eventKey]),
            this.getUptime(this.state.dates[eventKey]),
            this.getDatasetsWithTechMetadata()
        ])
        this.setState({isLoading: false})
      }

      async componentDidMount() {
        initGA('UA-166025838-1');
        this.getUnmetDemand()
        await Promise.all([
            this.getStats(),
            this.getTotalGAUsers(),
            this.getGAUsers(moment(this.state.selectedOption).startOf('month').format("YYYY-MM-DD"), moment(this.state.selectedOption).endOf('month').format("YYYY-MM-DD")),
            this.getKPIs(this.state.selectedOption),
            this.getUptime(this.state.selectedOption),
            this.getDatasetsWithTechMetadata()
        ])
        this.setState({isLoading: false})

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
            this.setState({ data: res.data.data}); 
        });
    }

    getStats(){
        return new Promise((resolve, reject) => {
        axios.get(baseURL + '/api/v1/stats')
        .then((res) => {
            this.setState({
                statsDataType: res.data.data.typecounts,
                statsDataTime: res.data.data.daycounts
            });
            resolve();
        });

    });

    }

    getTotalGAUsers(){
        return new Promise((resolve, reject) => {
        axios.get(baseURL + '/api/v1/analyticsdashboard/totalusers')
        .then((res) => {
            this.setState({ totalGAUsers: res.data.data.rows[0][0] });
            resolve();
        });


    });

    }   

    getGAUsers(startDate, endDate){
        return new Promise((resolve, reject) => {
        axios.get(baseURL + '/api/v1/analyticsdashboard/userspermonth?startDate=' + startDate + '&endDate=' + endDate)
        .then((res) => {
            this.setState({ gaUsers: res.data.data.rows[0][0] });
            resolve();
        });

    });

    } 

    getKPIs(selectedDate){
        return new Promise((resolve, reject) => {
        axios.get(baseURL + '/api/v1/stats/kpis/' + selectedDate )
        .then((res) => {
            let haveResultsMonth = res.data.data.totalMonth - res.data.data.noResultsMonth;
            let searchesWithResults = (haveResultsMonth / res.data.data.totalMonth) * 100;
            this.setState({ searchesWithResults: searchesWithResults,
                            accessRequests: res.data.data.accessRequestsMonth
                         });
            resolve();
        }); 

    });

    }

    getUptime(selectedDate){
        return new Promise((resolve, reject) => {
        axios.get(baseURL + '/api/v1/stats/uptime/' + selectedDate )
        .then((res) => {
            this.setState({ uptime: res.data.data});
            resolve();
        }); 

    });

    }

    getDatasetsWithTechMetadata(){
        return new Promise((resolve, reject) => {
        axios.get(baseURL + '/api/v1/stats/technicalmetadata')
        .then((res) => {
            let datasetsWithTechMetaData = (res.data.data.datasetsMetadata / res.data.data.totalDatasets) * 100;
            this.setState({ datasetsWithTechMetaData: datasetsWithTechMetaData});
            resolve();
        }); 

    });

    }

    render() {
        const { userState, key, isLoading, data, dates, statsDataType, gaUsers, totalGAUsers, searchesWithResults, accessRequests, datasetsWithTechMetaData, uptime } = this.state;

        let uniqueUsers = (statsDataType.person / totalGAUsers) * 100;

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

                        <Row className="kpiContainer"> 
                            <Col sm={3} lg={3} className="dashboardPadding"> 
                                <DashboardKPI kpiText="total datasets" kpiValue={statsDataType.datasets}/>
                            </Col>
                            <Col sm={3} lg={3} className="dashboardPadding">
                                <DashboardKPI kpiText="datasets with technical metadata" kpiValue={datasetsWithTechMetaData.toFixed(0)} percentageFlag={true}/>
                            </Col>
                            <Col sm={3} lg={3} className="dashboardPadding">
                                <DashboardKPI kpiText="unique users this month" kpiValue={gaUsers}/>
                            </Col>
                            <Col sm={3} lg={3} className="dashboardPadding">                               
                                <DashboardKPI kpiText="unique registered users" kpiValue={uniqueUsers.toFixed(0)} percentageFlag={true}/> 
                            </Col>                        
                        </Row>

                        <Row className="kpiContainer">
                            <Col sm={3} lg={3} className="dashboardPadding">
                                <DashboardKPI kpiText="searches with results this month" kpiValue={searchesWithResults.toFixed(0)} percentageFlag={true}/>
                            </Col>
                            <Col sm={3} lg={3} className="dashboardPadding">
                                <DashboardKPI kpiText="new access requests" kpiValue={accessRequests}/> 
                            </Col>
                            <Col sm={3} lg={3} className="dashboardPadding">
                                {this.state.selectedOption == 'Fri May 01 2020 01:00:00 GMT+0100 (British Summer Time)' ? 
                                <DashboardKPI kpiText="uptime this month" kpiValue={'not available'}/>
                                : 
                                <DashboardKPI kpiText="uptime this month" kpiValue={uptime.toFixed(2)} percentageFlag={true}/>
                                }
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