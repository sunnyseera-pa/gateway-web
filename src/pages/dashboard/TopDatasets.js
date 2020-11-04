import React, { Fragment } from 'react';
import {Col, Row } from 'react-bootstrap';
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
                            <a href={"/dataset/" + data[0]}  > 
                                <span className="colOneTerm gray800-14 pointer">
                                    {data[1].name}
                                </span>  
                            </a> 
                        </Col>
                        <Col sm={4} lg={4} className="gray800-14">
                            <span style={{"float":"left"}}>
                                {data[1].publisher}
                            </span>
                        </Col> 
                        <Col sm={3} lg={2} className="gray800-14">
                            <span className="pad-right-0">
                                {data[1].requests}
                            </span>
                        </Col>
                </Row>
            </Fragment>
        )
    }
}

export default TopDatasets;