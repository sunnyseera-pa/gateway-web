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

//     state = {
//         data: [],
//         isLoading: true
//       };
    
//       constructor(props) {
//         super(props);
//       }

//    componentDidMount() {
//         this.getDataSearchFromDb();
//     }

//     getDataSearchFromDb = () => {
//         //need to handle error if no id is found
//         this.setState({ isLoading: true });
//         axios.get(baseURL+'/api/tool/'+this.props.match.params.toolID)
//         .then((res) => {
//           this.setState({ 
//             data: res.data.data[0],
//             // isLoading: false 
//           });
//         })
    //   }; 

    render() {

        //  if (isLoading) {
        //     return <p>Loading ...</p>;
        //   }

        // const {data} = this.state;
    
        return (
            <div>
            <SearchBar />

            <Container className="mb-5">

                <Row  className="mt-3">

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
                            {/* <Project data={data} /> */}
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