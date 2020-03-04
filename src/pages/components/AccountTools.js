import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon";
import Button from 'react-bootstrap/Button';
import ToolsHeader from './ToolsHeader';
import ActiveTool from './ActiveTool';
import ArchivedTool from './ArchivedTool';
import PendingTools from './PendingTools';
import Container from 'react-bootstrap/Container';

var baseURL = require('./../../BaseURL').getURL();

class AccountTools extends React.Component{

    // constructor(props) {
    //     super(props)
    //     // this.state.data = props.data;
    //   }
    
    //   // initialize our state
    //   state = {
    //     data: [],
    //     isLoading: true 
    //   };

    // componentDidMount() {
    //     this.doSearchCall();
    // }

    // doSearchCall() {
    //     axios.get(baseURL+'/api/search?search=&type=tool')
    //     .then((res) => {
    //         this.setState({ data: res.data.data });
    //         this.isLoading = false;
    //     });
    // }

    render(){
        // const {data, isLoading} = this.state;

        // if (isLoading) {
        //     return <p>Loading ...</p>;
        // }

        return(
            <div>
                    <Row className="mt-3">
                        <Col xs={5} lg={5}></Col>
                        <Col xs={2} lg={2} style={{textAlign: "center"}}>
                            <Button variant="primary" href="/addtool" className="AddButton">
                                + Add a new tool
                            </Button>
                        </Col>
                        <Col xs={5} lg={5}></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <span className="Black-16px ml-2">Pending approval</span>
                        </Col>
                    </Row>

                    <ToolsHeader />

                    <PendingTools />

                    <Row className="mt-3">
                        <Col>
                            <span className="Black-16px ml-2">Active</span>
                        </Col>
                    </Row>
                    
                    <ToolsHeader />

                    <ActiveTool /> 

                    <Row className="mt-3">
                        <Col>
                            <span className="Black-16px ml-2">Archived</span>
                        </Col>
                    </Row>

                    <ToolsHeader />

                    <ArchivedTool />
            </div>
        );
    }
}
    
export default AccountTools;