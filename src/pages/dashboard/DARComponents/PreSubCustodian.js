import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Loading from './Loading'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

var baseURL = require('../../commonComponents/BaseURL').getURL();

class PreSubCustodian extends React.Component {

    state = {
        data: {}
    }

    constructor(props) {
        console.log('props are: ' + JSON.stringify(props))
        super(props)
        this.state.data = props;
    }

    render() {
        const { data } = this.state;

        console.log('WHAT? ' + JSON.stringify(data))

        return (
            <div className="DARDiv" >

            <Row className="pl-3">
                <Col sm={2} lg={2}>
                    <span>date</span>
                </Col>
                <Col sm={3} lg={3}>
                    <span >dataset name</span>
                </Col>
                <Col sm={3} lg={3}>
                    <span>applicant name</span>
                </Col>
                <Col sm={2} lg={2}>
                    <span >x/y questions answered</span>
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

export default PreSubCustodian;