import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import SVGIcon from "../../images/SVGIcon"
// import {ReactComponent as ToolIcon} from '../images/tool.svg';
import '../../css/hdruk.css';

class Tool extends React.Component{
    render(){
        return(
            // <div>
            <Row className="mt-2">
                <Col></Col>
                <Col>
                    {/* <Card bg="#ffffff" style={{ height: 196, width: 800}}> */}
                    <Card className="Rectangle">
                        <Card.Body>   
                        {/* <Container> */}
                            <Row className="mb-1">
                                {/* <Col sm={1}> <ToolIcon /> </Col> */}
                                {/* <Col sm={1}> <ToolIcon style={{fill:'#3db28c'}}></ToolIcon> </Col> */}
                                <Col sm={1}> <SVGIcon name="toolicon" width={18} height={18} fill={'#3db28c'} /> </Col>
                                <Col sm={7} className="text-left " style={{color:'#2d2d2d'}}>Tool Name</Col>
                                <Col sm={4} className="text-right" style={{color:'#53575a'}}>Date Updated</Col>
                            </Row>
                            <Row>
                                <Col sm={1}> </Col>
                                <Col sm={11} className="text-left" style={{color:'#53575a'}}>Person</Col>
                            </Row>
                            <Row> 
                                <Col sm={1}> </Col>
                                <Col sm={11} className="text-left" style={{color:'#3c3c3b'}}> x projects using it </Col>
                            </Row>
                            <Row className="mb-3"> 
                                <Col sm={1}> </Col>
                                <Col sm={11} className="text-left" style={{color:'#3c3c3b'}}> x reviews </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Badge pill variant="light" className="mr-2"> Tag1 </Badge>
                                    <Badge pill variant="light" className="mr-2"> Tag2 </Badge>
                                    <Badge pill variant="light" className="mr-2"> Tag3 </Badge>
                                </Col>
                            </Row>    
                            
                        {/* </Container> */}
                        </Card.Body>
                    </Card>
            </Col>
            <Col></Col>
            </Row>
            // </div> 
            
        );
    }
}

export default Tool;