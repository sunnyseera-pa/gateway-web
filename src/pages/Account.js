import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import 'react-tabs/style/react-tabs.css';
import AccountTools from './components/AccountTools';
import AccountProjects from './components/AccountProjects';
import ReviewTools from './components/ReviewTools';
import DataSet from './components/DataSet';
import YourAccount from './components/YourAccount';
import Messages from './components/Messages';
import queryString from 'query-string';
import Alert from 'react-bootstrap/Alert';

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
        key: "youraccount",
        isDeleted: false,
        isApproved: false,
        isRejected: false
    };

    constructor(props) {
        super(props);
        this.state.userState = props.userState;
    }

    componentDidMount() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            if (values.tab !== this.state.key) {
                this.setState({ key: values.tab });
                this.setState({ isDeleted: values.toolDeleted });
                this.setState({ isApproved: values.toolApproved });
                this.setState({ isRejected: values.toolRejected });
                this.setState({ isReviewApproved: values.reviewApproved });
                this.setState({ isReviewRejected: values.reviewRejected });
            }
        }
    }

    componentWillReceiveProps() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            if (values.tab !== this.state.key) {
                this.setState({ key: values.tab });
                this.setState({ isDeleted: values.accountDeleted });
                this.setState({ isApproved: values.toolApproved });
                this.setState({ isRejected: values.toolRejected });
                this.setState({ isReviewApproved: values.reviewApproved });
                this.setState({ isReviewRejected: values.reviewRejected });
            }
        }
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
            if (!!this.state.searchString) {
                window.location.href = "/search?search=" + this.state.searchString + '&type=all';
            }
        }
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
    }

    handleSelect = (key) => {
        this.setState({ key: key });
        this.props.history.push(window.location.pathname + '?tab=' + key);
    }

    render() {
        const { searchString, data, userState, isDeleted, isApproved, isRejected, isReviewApproved, isReviewRejected } = this.state;

        if (typeof data.datasetids === 'undefined') {
            data.datasetids = [];
        }

        return (
            <div>
                <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />

                <Container className="mb-5">

                    {isDeleted ?
                        <Row className="">
                            <Col sm={1} lg={1} />
                            <Col sm={10} lg={10}>
                                <Alert variant="success" className="mt-3">Done! The tool has been deleted</Alert>
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
                                <Alert variant="success" className="mt-3">Done! This tool has been rejected and is now deleted</Alert>
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





                    <Row className="mt-3">
                        <Col sm={1} lg={1} />
                        <Col sm={10} lg={10}>
                            <div>
                                <Tabs className='TabsBackground Gray700-13px' activeKey={this.state.key} onSelect={this.handleSelect}>
                                    <Tab eventKey="youraccount" title="Your account">
                                        <YourAccount userState={userState} />
                                    </Tab>
                                    <Tab eventKey="messages" title="Notifications">
                                        <Messages userState={userState} />
                                    </Tab>
                                    <Tab eventKey="datasets" title="Data sets">
                                    <Row className="mt-2">
                                        <Col>
                                            <div className="Rectangle">
                                                <div className="Gray800-14px" style={{textAlign: 'center'}}>
                                                    Data sets placeholder
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                        {/* {data.datasetids.map(id => <DataSet id={id} />)} */}
                                    </Tab>
                                    <Tab eventKey="projects" title="Projects">
                                        {/* Placeholder */}
                                        <AccountProjects userState={userState} />
                                    </Tab>
                                    <Tab eventKey="tools" title="Tools">
                                        <AccountTools userState={userState} />
                                    </Tab>
                                    <Tab eventKey="reviews" title="Reviews">
                                        <ReviewTools userState={userState} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </Col>
                        <Col sm={1} lg={1} />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Account;