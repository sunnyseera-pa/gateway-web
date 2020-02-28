import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class ToolsHeader extends React.Component{
    render(){
        return(
        <Row className="mt-2">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
                <div className="ToolsHeader">
                     <Row>
                        <Col xs={4} lg={4} className="ml-2 mt-2 Gray800-14px-bold"> Name </Col>
                        <Col xs={4} lg={4} className="ml-2 mt-2 Gray800-14px-bold"> Author </Col>
                        <Col xs={4} lg={4}></Col>
                    </Row>
                </div>
            </Col>
            <Col sm={1} lg={10} />
        </Row>
        );
    }
}

export default ToolsHeader;