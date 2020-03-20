import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class ToolsHeader extends React.Component {
    render() {
        return (
            <Row className="mt-1">
                <Col lg={12}>
                    <div className="ToolsHeader">
                        <Row>
                            <Col xs={4} lg={5} className="pl-4 pt-2 Gray800-14px-bold">Name</Col>
                            <Col xs={4} lg={2} className="pl-1 pt-2 Gray800-14px-bold">Author</Col>
                            <Col xs={4} lg={5}></Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default ToolsHeader;