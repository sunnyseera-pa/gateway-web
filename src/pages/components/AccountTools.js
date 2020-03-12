import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ToolsHeader from './ToolsHeader';
import ActiveTool from './ActiveTool';
import PendingTools from './PendingTools';

class AccountTools extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        userState: []
    };

    render() {
        const { userState } = this.state;

        return (
            <div>
                <Row className="mt-3">
                    <Col xs={5} lg={5}></Col>
                    <Col xs={2} lg={2} style={{ textAlign: "center" }}>
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

                <PendingTools userState={userState} />

                <Row className="mt-3">
                    <Col>
                        <span className="Black-16px ml-2">Active</span>
                    </Col>
                </Row>

                <ToolsHeader />

                <ActiveTool userState={userState} />
            </div>
        );
    }
}

export default AccountTools;