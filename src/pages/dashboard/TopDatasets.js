import React, { Fragment } from 'react';
import {Col, Row, Button, Accordion } from 'react-bootstrap';
import './Dashboard.scss'; 

class TopDatasets extends React.Component { 

    state = {
        data: '',
     };

    constructor(props) {
        super(props)
        //binding the method to be able to use state
        this.state.data = props.data;
    }
 
    componentDidMount(){
        this.setState({state:this.state})
    }
 
    render() {
        const {data} = this.state;
        return (
            <Fragment>
                <Row className="entryBox"> 
                        <Col sm={5} lg={6} className="gray800-14" style={{"float":"left", "paddingLeft":"0px"}}>
                            <span style={{"float":"left", "paddingLeft":"15px"}} className="truncate">
                                dataset name
                            </span>                
                        </Col>
                        <Col sm={2} lg={2} className="gray800-14">
                            <span style={{"float":"left"}}>
                                custodian name 
                            </span>
                        </Col> 
                        <Col sm={5} lg={4} className="gray800-14">
                            <span style={{"paddingRight":"0px"}}>
                                number of requests
                            </span>
                        </Col>
                </Row>
            </Fragment>
        )
    }
}

export default TopDatasets;