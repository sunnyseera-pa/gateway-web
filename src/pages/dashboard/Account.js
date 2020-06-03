import React, { Component } from 'react';
import queryString from 'query-string';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import SearchBar from '../commonComponents/SearchBar';
import AccountTools from './AccountTools';
import AccountProjects from './AccountProjects';
import ReviewTools from './ReviewTools';
import YourAccount from './YourAccount';
import DataAccessRequests from './DataAccessRequests';

import 'react-web-tabs/dist/react-web-tabs.css';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import SVGIcon from "../../images/SVGIcon";


class Account extends Component {

    state = {
        searchString: null,
        id: '',
        data: [],
        isLoading: true,
        userState: [{
            loggedIn: false,
            role: "Reader",
            id: null,
            name: null
        }],
        // key: "youraccount",
        // tabId: "youraccount",
        tabId: "",
        isDeleted: false,
        isApproved: false,
        isRejected: false,
        isProjectDeleted: false,
        isProjectApproved: false
    };

    constructor(props) {
        super(props);
        this.state.userState = props.userState;
    }

    componentWillMount() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            console.log('values: ' + JSON.stringify(values.tab))
            console.log('tab: ' + this.state.tabId)
            if (values.tab !== this.state.tabId) {
                this.setState({ tabId: values.tab });
                this.handleChange(values.tab);
            }
        }
    }  

    componentDidMount() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            console.log('values: ' + JSON.stringify(values.tab))
            console.log('tab: ' + this.state.tabId)
            if (values.tab !== this.state.tabId) {
                this.setState({ tabId: values.tab });
                this.handleChange(values.tab);
                this.setState({ isDeleted: values.toolDeleted });
                this.setState({ isApproved: values.toolApproved });
                this.setState({ isRejected: values.toolRejected });
                this.setState({ isProjectApproved: values.projectApproved });
                this.setState({ isProjectRejected: values.projectRejected });
                this.setState({ isReviewApproved: values.reviewApproved });
                this.setState({ isReviewRejected: values.reviewRejected });
            }
        }
    }

    componentWillReceiveProps() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            console.log('props values: ' + JSON.stringify(values.tab))
            console.log('props tab: ' + this.state.tabId)
            if (values.tab !== this.state.tabId) {
                this.setState({ tabId: values.tab });
                this.setState({ isDeleted: values.accountDeleted });
                this.setState({ isApproved: values.toolApproved });
                this.setState({ isRejected: values.toolRejected });
                this.setState({ isProjectApproved: values.projectApproved });
                this.setState({ isProjectRejected: values.projectRejected });
                this.setState({ isReviewApproved: values.reviewApproved });
                this.setState({ isReviewRejected: values.reviewRejected });
            }
        }
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
        
            if (!!this.state.searchString) {
                window.location.href = "/search?search=" + this.state.searchString;
            }
        }
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
    }

    handleChange = (tabId) => {
        console.log('tab changed to ' + tabId)
        this.setState({ tabId: tabId });
        // console.log('state tab is ' + this.state.tabId)
        this.props.history.push(window.location.pathname + '?tab=' + tabId);
    }

    render() {
        const { searchString, data, userState, isDeleted, isApproved, isRejected, isProjectApproved, isProjectRejected, isReviewApproved, isReviewRejected, tabId } = this.state;
        if (typeof data.datasetids === 'undefined') {
            data.datasetids = [];
        }
        
        console.log('state tab is ' + this.state.tabId)
        console.log('plain old tab is ' + tabId)
        // const defaultTab = this.state.tabId;

        return (
            <div>
                <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />

                    {isDeleted ?
                        <Row className="">
                            <Col sm={1} lg={1} />
                            <Col sm={10} lg={10}>
                                <Alert variant="success" className="mt-3">Done! The tool has been archived</Alert>
                            </Col>
                            <Col sm={1} lg={10} />
                        </Row>
                        : ""}

                    {isApproved ?
                        <Row className="">
                            <Col sm={1} lg={1} />
                            <Col sm={10} lg={10}>
                                <Alert variant="success" className="mt-3">Done! The tool has been approved and is now live.</Alert>
                            </Col>
                            <Col sm={1} lg={10} />
                        </Row>
                        : ""}

                    {isRejected ?
                        <Row className="">
                            <Col sm={1} lg={1} />
                            <Col sm={10} lg={10}>
                                <Alert variant="success" className="mt-3">Done! This tool has been rejected and is now archived</Alert>
                            </Col>
                            <Col sm={1} lg={10} />
                        </Row>
                        : ""}

                    {isProjectApproved ?
                        <Row className="">
                            <Col sm={1} lg={1} />
                            <Col sm={10} lg={10}>
                                <Alert variant="success" className="mt-3">Done! The project has been approved and is now live.</Alert>
                            </Col>
                            <Col sm={1} lg={10} />
                        </Row>
                        : ""}

                    {isProjectRejected ?
                        <Row className="">
                            <Col sm={1} lg={1} />
                            <Col sm={10} lg={10}>
                                <Alert variant="success" className="mt-3">Done! This project has been rejected and is now archived</Alert>
                            </Col>
                            <Col sm={1} lg={10} />
                        </Row>
                        : ""}

                    {isReviewApproved ?
                        <Row className="">
                            <Col sm={1} lg={1} />
                            <Col sm={10} lg={10}>
                                <Alert variant="success" className="mt-3">Done! The review has been approved and is now live.</Alert>
                            </Col>
                            <Col sm={1} lg={10} />
                        </Row>
                        : ""}

                    {isReviewRejected ?
                        <Row className="">
                            <Col sm={1} lg={1} />
                            <Col sm={10} lg={10}>
                                <Alert variant="success" className="mt-3">Done! This review has been rejected and is now deleted</Alert>
                            </Col>
                            <Col sm={1} lg={10} />
                        </Row>
                        : ""}

                        {console.log('WHAT?! ' + this.state.tabId)}
                        {console.log('WHAT?! tab ' + tabId)}

                    <Row className="mt-1">
                        <Col sm={12} lg={12}>
                            <Tabs vertical 
                            // activeKey={this.state.tabId}
                            // defaultTab="youraccount"
                            // defaultTab="dataaccessrequests"
                            defaultTab={this.state.tabId}
                            // defaultTab={defaultTab}
                            onChange={this.handleChange}
                             >
                            {/* {console.log('in tabs: ' + defaultTab)} */}
                                    <TabList className="TabList" >

                                    
                                        <Tab tabFor="youraccount" className="VerticalTabsBackground Gray800-14px mt-2 mb-2">
                                            <Row >
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="accounticon" fill={'#b3b8bd'} className="AccountSvgs" />
                                                </Col>                                             
                                                <Col sm={10} lg={10} className="pl-4">
                                                    Your account
                                                </Col>
                                            </Row>
                                        </Tab>
                                        <Tab tabFor="tools" className="VerticalTabsBackground Gray800-14px mt-2 mb-2">
                                            <Row>
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="newtoolicon" fill={'#b3b8bd'} className="AccountSvgs" />
                                                </Col>
                                                <Col sm={10} lg={10} className="pl-4">
                                                    Tools
                                                </Col>
                                            </Row>
                                        </Tab>
                                        {/* <Tab tabFor="youraccount" className="VerticalTabsBackground Gray800-14px mt-2 mb-2">
                                            <Row >
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="accounticon" fill={'#b3b8bd'} className="AccountSvgs" />
                                                </Col>                                             
                                                <Col sm={10} lg={10} className="pl-4">
                                                    Your account
                                                </Col>
                                            </Row>
                                        </Tab> */}
                                        <Tab tabFor="reviews" className="VerticalTabsBackground Gray800-14px mt-2 mb-2">
                                            <Row>
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="reviewsicon" fill={'#b3b8bd'} className="AccountSvgs" />
                                                </Col>
                                                <Col sm={10} lg={10} className="pl-4">
                                                    Reviews
                                                </Col>
                                            </Row>
                                        </Tab>
                                        <Tab tabFor="projects" className="VerticalTabsBackground Gray800-14px mt-2 mb-2">
                                            <Row>
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="newprojecticon" fill={'#b3b8bd'} className="AccountSvgs"/>
                                                </Col>
                                                <Col sm={10} lg={10} className="pl-4">
                                                    Projects    
                                                </Col>
                                            </Row>
                                        </Tab>
                                        <Tab tabFor="dataaccessrequests" className="VerticalTabsBackground Gray800-14px mt-2 mb-2">
                                            <Row>
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="dataaccessicon" fill={'#b3b8bd'} className="AccountSvgs" />
                                                </Col>
                                                <Col sm={10} lg={10} className="pl-4">
                                                    Data access requests
                                                </Col>
                                            </Row>
                                        </Tab>
                                        <Tab tabFor="usersroles" className="VerticalTabsBackground Gray800-14px mt-2 mb-2">
                                            <Row>
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="rolesicon" fill={'#b3b8bd'} className="AccountSvgs" />
                                                </Col>
                                                <Col sm={10} lg={10} className="pl-4">
                                                    Users and roles
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </TabList>

                                <Row>
                                    <Col sm={1} lg={1} />
                                    <Col sm={10} lg={10}>
                                        <TabPanel tabId="youraccount">
                                            <YourAccount userState={userState} />
                                        </TabPanel>
                                    </Col>
                                    <Col sm={1} lg={1} />
                                </Row>

                                <Row>
                                    <Col sm={1} lg={1} />
                                    <Col sm={10} lg={10}>
                                        <TabPanel tabId="tools">
                                            <AccountTools userState={userState} />
                                        </TabPanel>
                                    </Col>
                                    <Col sm={1} lg={1} />
                                </Row>

                                <Row>
                                    <Col sm={1} lg={1} />
                                    <Col sm={10} lg={10}>
                                        <TabPanel tabId="reviews">
                                            <ReviewTools userState={userState} />
                                        </TabPanel>
                                    </Col>
                                    <Col sm={1} lg={1} />
                                </Row>

                                <Row>
                                    <Col sm={1} lg={1} />
                                    <Col sm={10} lg={10}>
                                        <TabPanel tabId="projects">
                                            <AccountProjects userState={userState} />
                                        </TabPanel>
                                    </Col>
                                    <Col sm={1} lg={1} />
                                </Row>

                                <Row>
                                    {/* <Col sm={1} lg={1} /> */}
                                    {/* <Col sm={10} lg={10}> */}
                                    <Col sm={12} lg={12}>
                                        <TabPanel tabId="dataaccessrequests">
                                            <DataAccessRequests userState={userState} />
                                        </TabPanel>
                                    </Col>
                                    {/* <Col sm={1} lg={1} /> */}
                                </Row>

                                <Row>
                                    <Col sm={1} lg={1} />
                                    <Col sm={10} lg={10}>
                                        <TabPanel tabId="usersroles">
                                            <p>Users and roles</p>
                                        </TabPanel>
                                    </Col>
                                    <Col sm={1} lg={1} />
                                </Row>
                            </Tabs>
                          
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default Account;