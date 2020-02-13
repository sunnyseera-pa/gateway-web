import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
// import {ReactComponent as ProjectIcon} from '../images/project.svg';
import SVGIcon from "../../images/SVGIcon"
import '../../css/hdruk.css';

class Project extends React.Component{
    render(){
        return(
            // <div>
            // <Container style={{width: 800}}>
            <Row className="mt-2">
                <Col></Col>
                <Col>
                    {/* <Card bg="#ffffff" style={{ height: 196, width: 800}}> */}
                    {/* <Card class="Rectangle" bg="#ffffff" style={{minHeight: 196, width: 800}}> */}
                    <Card className="Rectangle">
                        <Card.Body>   
                        {/* <Container> */}
                            <Row className="mb-1">
                                {/* <Col sm={1}> <ProjectIcon /> </Col> */}
                                <Col sm={1}> <SVGIcon name="projecticon" width={20} height={24} fill={'#3db28c'} /> </Col>
                                <Col sm={9} className="text-left " className="Black-16px" >Project Title</Col>
                                <Col sm={2} className="text-right" className="Gray700-13px">Date Updated</Col>
                                {/* <Col sm={4} style="text-align: right">Date Updated</Col> */}
                            </Row>
                            <Row>
                                <Col sm={1}> </Col>
                                <Col sm={11} className="text-left" className="Gray800-14px">Person1, person2</Col>
                            </Row>
                            <Row  className="mb-3">
                                <Col sm={1}> </Col>
                                <Col sm={2} className="Gray800-14px">xx tools used:</Col> 
                                <Col sm={9} className="text-left" className="Purple-14px"> tool1link, tool2link, tool3link
                                    {/* <ListGroup horizontal>
                                        <ListGroup.Item> tool1 </ListGroup.Item>
                                        <ListGroup.Item> tool2 </ListGroup.Item>
                                        <ListGroup.Item> tool3 </ListGroup.Item>
                                    </ListGroup> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Badge pill variant="light" className="mr-2 Gray800-14px Pill" > Tag1 </Badge>
                                    <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag2 </Badge>
                                    <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag3 </Badge>
                                </Col>
                            </Row>    
                            
                        {/* </Container> */}
                        </Card.Body>
                    </Card>
            </Col>
            <Col></Col>
            </Row>
            // </Container>
            // </div> 
        );
    }   
}

export default Project;
