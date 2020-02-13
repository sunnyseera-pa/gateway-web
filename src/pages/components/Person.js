import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import {ReactComponent as ToolIcon} from '../../images/tool.svg';
import '../../css/hdruk.css';

class Person extends React.Component{
    render(){
        return(
             <Row className="mt-2">
             <Col></Col>
             <Col>
                 {/* <Card bg="#ffffff" style={{ height: 196, width: 800}}> */}
                 <Card className="Rectangle">
                     <Card.Body>   
                         <Row className="mb-1">
                             <Col sm={1}> <Image src={require("../../images/bob.jpg")} id="Picture" roundedCircle /> </Col>
                             <Col sm={11} className="text-left " className="Black-16px">Name</Col>
                         </Row>
                         <Row>
                             <Col sm={1}> </Col>
                             <Col sm={11} className="text-left" className="Gray800-14px">Role/Qualification</Col>
                         </Row>
                         <Row> 
                             <Col sm={1}> </Col>
                             <Col sm={11} className="text-left" className="Gray800-14px"> x projects created </Col>
                         </Row>
                         <Row className="mb-3"> 
                             <Col sm={1}> </Col>
                             <Col sm={11} className="text-left" className="Gray800-14px"> x tools created, x tools reviewed </Col>
                         </Row>
                         <Row>
                             <Col>
                                 <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag1 </Badge>
                                 <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag2 </Badge>
                                 <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag3 </Badge>
                             </Col>
                         </Row>    
                     </Card.Body>
                 </Card>
         </Col>
         <Col></Col>
         </Row>
        );
    }
}

export default Person;
