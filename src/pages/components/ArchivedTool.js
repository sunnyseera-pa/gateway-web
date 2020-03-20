import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


class ArchivedTool extends React.Component {
    render() {
        return (
            <Row className="mt-2">
                <Col>
                    <div className="Rectangle">
                        <Row>
                            <Col xs={4} lg={4} className="ml-2 mt-2 Gray800-14px-bold"> ToolName </Col>
                            <Col xs={5} lg={5} className="ml-2 mt-2 Gray800-14px-bold"> ToolAuthor </Col>
                            <Col xs={2} lg={2} className="ml-4">
                                <Button variant='white' className="AccountButtons">
                                    Unarchive
                            </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default ArchivedTool;