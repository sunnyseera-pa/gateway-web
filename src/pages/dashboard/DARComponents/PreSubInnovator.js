import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Loading from './Loading'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

var baseURL = require('../../commonComponents/BaseURL').getURL();

class PreSubInnovator extends React.Component {

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
                        <span>01 June 2020 09:14 AM</span>
                    </Col>
                    <Col sm={3} lg={3}>
                        <span >Epilepsy 12 - Patient Reported Experience Measure</span>
                    </Col>
                    <Col sm={4} lg={4}>
                        <span>7/56 questions answered</span>
                    </Col>
                    <Col sm={2} lg={2} className="pr-5">
                        <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                                <Dropdown.Item href="">Edit</Dropdown.Item>
                                <Dropdown.Item href="">Delete</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
             </div>
        );
    }
}

export default PreSubInnovator;