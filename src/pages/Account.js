// /ShowObjects.js
import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Button from 'react-bootstrap/Button';
import AccountTools from './components/AccountTools';
import Reviews from './components/Reviews';
import DataSet from './components/DataSet';

var baseURL = require('./../BaseURL').getURL();

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
        }]
    };

    constructor(props) {
        super(props);
        this.state.userState = props.userState;
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
            if (!!this.state.searchString) {
                window.location.href = window.location.search + "/search?search=" + this.state.searchString + '&type=all';
            }
        }
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
    }

    render() {
        const { searchString, data, userState } = this.state;

        //  if (isLoading) {
        //     return <p>Loading ...</p>;
        //   }

        return (
            <div>
                <SearchBar searchString={searchString} doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />

                <Container className="mb-5">
                    <Row className="mt-3">
                        <Col sm={1} lg={1} />
                        <Col sm={10} lg={10}>
                            <div>
                                <Tabs className='TabsBackground Gray700-13px'>
                                    <Tab eventKey="YourAccount" title="Your account">
                                        Placeholder
                                    </Tab>
                                    <Tab eventKey="Data sets" title="Data sets (1)">
                                        <DataSet />
                                    </Tab>
                                    <Tab eventKey="Projects" title="Projects (2)">
                                        Placeholder
                                    </Tab>
                                    <Tab eventKey="Tools" title="Tools (2)">
                                        <AccountTools />
                                    </Tab>
                                    <Tab eventKey="Reviews" title="Reviews (2)">
                                        Placeholder
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