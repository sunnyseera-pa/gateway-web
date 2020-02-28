import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


class PendingTools extends React.Component{
    render(){
        return(
        <Row className="mt-2">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
                <div className="Rectangle">
                     <Row>
                        <Col xs={4} lg={4} className="ml-2 mt-2 Gray800-14px-bold"> ToolName </Col>
                        <Col xs={3} lg={3} className="ml-2 mt-2 Gray800-14px-bold"> ToolAuthor </Col>
                        <Col xs={4} lg={4} className="ml-5">
                            <Button variant='white' className="AccountButtons mr-2">
                                Edit
                            </Button>
                            <Button variant='white' className="AccountButtons mr-2">
                                Reject
                            </Button>
                            <Button variant='white' className="AccountButtons ">
                                Approve
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col sm={1} lg={1} />
        </Row>
        );
    }
}

export default PendingTools;