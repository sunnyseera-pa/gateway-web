import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import {ReactComponent as ToolIcon} from '../images/tool.svg';
import '../css/hdruk.css';

class ResultsPerson extends React.Component{
    render(){
        return(
             <Row className="mt-2">
             <Col></Col>
             <Col>
                 {/* <Card bg="#ffffff" style={{ height: 196, width: 800}}> */}
                 <Card className="Rectangle">
                     <Card.Body>   
                         <Row className="mb-1">
                             <Col sm={1}> <ToolIcon /> </Col>
                             <Col sm={11} className="text-left " style={{color:'#2d2d2d'}}>Name</Col>
                         </Row>
                         <Row>
                             <Col sm={1}> </Col>
                             <Col sm={11} className="text-left" style={{color:'#53575a'}}>Role/Qualification</Col>
                         </Row>
                         <Row> 
                             <Col sm={1}> </Col>
                             <Col sm={11} className="text-left" style={{color:'#3c3c3b'}}> x projects created </Col>
                         </Row>
                         <Row className="mb-3"> 
                             <Col sm={1}> </Col>
                             <Col sm={11} className="text-left" style={{color:'#3c3c3b'}}> x tools crrated, x tools reviewed </Col>
                         </Row>
                         <Row>
                             <Col>
                                 <Badge pill variant="light" className="mr-2"> Tag1 </Badge>
                                 <Badge pill variant="light" className="mr-2"> Tag2 </Badge>
                                 <Badge pill variant="light" className="mr-2"> Tag3 </Badge>
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

export {ResultsPerson};