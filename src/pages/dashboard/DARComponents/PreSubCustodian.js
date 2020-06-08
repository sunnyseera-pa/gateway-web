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
        this.state.data = props.data;
    }

    render() {
        const { data } = this.state;

        console.log('WHAT? ' + JSON.stringify(data.dataSetId))

        return (
            <div className="DARDiv" >

            <Row className="pl-3">
                <Col sm={2} lg={2}>
                    <span>date 
                        {/* {data.timeStamp} */}
                    </span>
                </Col>
                <Col sm={3} lg={3}>
                    <span >dataset name 
                        {/* {data.dataSetId} */}
                    </span>
                </Col>
                <Col sm={3} lg={3}>
                    <span>applicant name 
                        {/* {data.userID} */}
                        </span>
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