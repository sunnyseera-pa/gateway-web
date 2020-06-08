import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Loading from './Loading'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

var baseURL = require('../../commonComponents/BaseURL').getURL();

class RejectedInnovator extends React.Component {

    state = {
        
    }

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="DARDiv" >

                <Row className="pl-3">
                    <Col sm={3} lg={3}>
                        <span>19 May 2020 02:58 PM</span>
                    </Col>
                    <Col sm={3} lg={3}>
                        <span >CPRD GOLD</span>
                    </Col>
                    <Col sm={4} lg={4}>
                        <span>Rejected</span>
                    </Col>
                    <Col sm={2} lg={2} className="pr-5">
                        <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                            <Dropdown.Item href="">View</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
             </div>
        );
    }
}

export default RejectedInnovator;