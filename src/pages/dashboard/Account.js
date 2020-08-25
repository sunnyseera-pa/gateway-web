import React, { Component } from 'react';
import queryString from 'query-string';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
//import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import SearchBar from '../commonComponents/SearchBar';
import AccountTools from './AccountTools';
import AccountProjects from './AccountProjects';
import AccountPapers from './AccountPapers';
import AccountCollections from './AccountCollections';
import AccountAnalyticsDashboard from './AccountAnalyticsDashboard';
import AccountUsers from './AccountUsers';
import ReviewTools from './ReviewTools';
import YourAccount from './YourAccount';
import DataAccessRequests from './DataAccessRequests';
import 'react-web-tabs/dist/react-web-tabs.css';
import SVGIcon from "../../images/SVGIcon";
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer'; 
import UserMessages from "../commonComponents/userMessages/UserMessages";
import DataSetModal from "../commonComponents/dataSetModal/DataSetModal";

class Account extends Component {

    state = {
        searchString: '',
        id: '',
        data: [],
        isLoading: true,
        userState: [{
            loggedIn: false,
            role: "Reader",
            id: null,
            name: null
        }],
        tabId: "",
        isDeleted: false,
        isApproved: false,
        isRejected: false,
        isProjectDeleted: false,
        isProjectApproved: false,
        showDrawer: false,
        showModal: false,
        context: {}
    };

    constructor(props) {
        super(props);
        this.state.userState = props.userState;
        this.searchBar = React.createRef();
    }

    componentWillMount() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            if (values.tab !== this.state.tabId) {
                this.setState({ tabId: values.tab });
                this.handleChange(values.tab);
            }
        }
    }  

    componentDidMount() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
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
        if (e.key === 'Enter') window.location.href = "/search?search=" + this.state.searchString;
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
    }

    handleChange = (tabId) => {
        this.setState({ tabId: tabId });
        this.props.history.push(window.location.pathname + '?tab=' + tabId);
    }

    toggleDrawer = () => {
        this.setState( ( prevState ) => {
            if(prevState.showDrawer === true) {
                this.searchBar.current.getNumberOfUnreadMessages();
            }
            return { showDrawer: !prevState.showDrawer };
        });
    }

    toggleModal = (showEnquiry = false, context = {}) => {
        this.setState( ( prevState ) => {
            return { showModal: !prevState.showModal, context, showDrawer: showEnquiry };
        });
    }

    render() {
        const { searchString, data, userState, isDeleted, isApproved, isRejected, isProjectApproved, isProjectRejected, isReviewApproved, isReviewRejected, tabId, showDrawer, showModal ,context } = this.state;
        if (typeof data.datasetids === 'undefined') {
            data.datasetids = [];
        }

        return (
            <div>
                <SearchBar ref={this.searchBar} searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} doToggleDrawer={this.toggleDrawer} userState={userState} />
                <Tab.Container defaultActiveKey={tabId} onSelect={this.handleChange}>
                    <Row>
                        <Col xs={2}>
                            <div className="tabList">
                                <Nav className="flex-column" className="verticalNavBarHolder">
                                <Nav.Item>
                                        <Nav.Link eventKey="dashboard" className="verticalNavBar gray700-13">
                                            <Row>
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="dashboard" fill={'#b3b8bd'} className="AccountSvgs" />
                                                </Col>                                             
                                                <Col sm={10} lg={10} className="pl-4 pt-1">
                                                    Dashboard
                                                </Col>
                                            </Row>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="youraccount" className="verticalNavBar gray700-13">
                                            <Row>
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="accounticon" fill={'#b3b8bd'} className="AccountSvgs" />
                                                </Col>                                             
                                                <Col sm={10} lg={10} className="pl-4 pt-1">
                                                    Your account
                                                </Col>
                                            </Row>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="tools" className="verticalNavBar gray700-13">
                                            <Row>
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="newtoolicon" fill={'#b3b8bd'} className="AccountSvgs" />
                                                </Col>
                                                <Col sm={10} lg={10} className="pl-4 pt-1">
                                                    Tools
                                                </Col>
                                            </Row>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="reviews" className="verticalNavBar gray700-13">
                                            <Row>
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="reviewsicon" fill={'#b3b8bd'} className="AccountSvgs" />
                                                </Col>
                                                <Col sm={10} lg={10} className="pl-4 pt-1">
                                                    Reviews
                                                </Col>
                                            </Row>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="projects" className="verticalNavBar gray700-13">
                                            <Row>
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="newestprojecticon" fill={'#b3b8bd'} className="AccountSvgs"/>
                                                </Col>
                                                <Col sm={10} lg={10} className="pl-4 pt-1">
                                                    Projects    
                                                </Col>
                                            </Row>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="papers" className="verticalNavBar gray700-13">
                                            <Row>
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="newprojecticon" fill={'#b3b8bd'} className="AccountSvgs"/>
                                                </Col>
                                                <Col sm={10} lg={10} className="pl-4 pt-1">
                                                    Papers    
                                                </Col>
                                            </Row>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="dataaccessrequests" className="verticalNavBar gray700-13">
                                            <Row>
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="dataaccessicon" fill={'#b3b8bd'} className="AccountSvgs"/>
                                                </Col>
                                                <Col sm={10} lg={10} className="pl-4 pt-1">
                                                    Data access requests    
                                                </Col>
                                            </Row>
                                        </Nav.Link>
                                    </Nav.Item> 
                                    <Nav.Item>
                                        <Nav.Link eventKey="collections" className="verticalNavBar gray700-13">
                                            <Row>
                                                <Col sm={2} lg={2}>
                                                    <SVGIcon name="collections" fill={'#b3b8bd'} className="AccountSvgs"/>
                                                </Col>
                                                <Col sm={10} lg={10} className="pl-4 pt-1">
                                                    Collections   
                                                </Col>
                                            </Row>
                                        </Nav.Link>
                                    </Nav.Item>
                                    {userState[0].role === 'Admin' ?
                                        <Nav.Item>
                                            <Nav.Link eventKey="usersroles" className="verticalNavBar gray700-13">
                                                <Row>
                                                    <Col sm={2} lg={2}>
                                                        <SVGIcon name="rolesicon" fill={'#b3b8bd'} className="AccountSvgs"/>
                                                    </Col>
                                                    <Col sm={10} lg={10} className="pl-4 pt-1">
                                                        Users and roles
                                                    </Col>
                                                </Row>
                                            </Nav.Link>
                                        </Nav.Item>
                                    : ''}
                                </Nav>
                            </div>
                        </Col>

                        <Col xs={10}>
                            <Tab.Content>
                                {tabId === 'dashboard' ?
                                    <Tab.Pane eventKey="dashboard">
                                        <AccountAnalyticsDashboard userState={userState} />
                                    </Tab.Pane>
                                : ''}

                                {tabId === 'youraccount' ?
                                    <Tab.Pane eventKey="youraccount">
                                        <YourAccount userState={userState} />
                                    </Tab.Pane>
                                : ''}

                                {tabId === 'tools' ?
                                    <Tab.Pane eventKey="tools">
                                        <AccountTools userState={userState} />
                                    </Tab.Pane>
                                : ''}
                                
                                {tabId === 'reviews' ?
                                    <Tab.Pane eventKey="reviews">
                                        <ReviewTools userState={userState} />
                                    </Tab.Pane>
                                : ''}   

                                {tabId === 'projects' ?
                                    <Tab.Pane eventKey="projects">
                                        <AccountProjects userState={userState} />
                                    </Tab.Pane>
                                : ''}  

                                {tabId === 'papers' ?
                                    <Tab.Pane eventKey="papers">
                                        <AccountPapers userState={userState} />
                                    </Tab.Pane>
                                : ''}  
                                
                                {tabId === 'dataaccessrequests' ?
                                    <Tab.Pane eventKey="dataaccessrequests">
                                        <DataAccessRequests userState={userState} />
                                    </Tab.Pane>
                                : ''}  

                                {tabId === 'collections' ?
                                    <Tab.Pane eventKey="collections">
                                        <AccountCollections userState={userState} /> 
                                    </Tab.Pane>
                                : ''}  
                                
                                {tabId === 'usersroles' ?
                                    <Tab.Pane eventKey="usersroles"> 
                                        <AccountUsers userState={userState} />
                                    </Tab.Pane>
                                : ''}  
                                    
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                <SideDrawer
                    open={showDrawer}
                    closed={this.toggleDrawer}>
                    <UserMessages 
                        closed={this.toggleDrawer}
                        toggleModal={this.toggleModal}
                        drawerIsOpen={this.state.showDrawer} 
                    />
                </SideDrawer>

                <DataSetModal 
                    open={showModal} 
                    context={context}
                    closed={this.toggleModal}
                    userState={userState[0]}
                />
            </div>
        );
    }
}

export default Account;
