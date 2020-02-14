import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import SVGIcon from "../../images/SVGIcon"

class Tool extends React.Component{

    constructor(props) {
        super(props)
        this.state.id = props.id;
        this.state.type = props.type;
        this.state.name = props.name;
        this.state.description = props.description;
        this.state.rating = props.rating;
        this.state.link = props.link;
      }
    
      // initialize our state
      state = {
        id: '',
        type: '',
        name: '',
        description: '',
        rating: '',
        link: '',
        data: []
      };

    render(){
        const { data, id, type, name, description, rating, link } = this.state;
        return(
            <Row className="mt-2">
                <Col />
                <Col>
                    {/* <Card bg="#ffffff" style={{ height: 196, width: 800}}> */}
                    <a style={{ cursor: 'pointer' }} href={'/tool/'+data.id} >
                    <Card className="Rectangle">
                        <Card.Body>   
                        {/* <Container> */}
                            <Row className="mb-1">
                                {/* <Col sm={1}> <ToolIcon /> </Col> */}
                                {/* <Col sm={1}> <ToolIcon style={{fill:'#3db28c'}}></ToolIcon> </Col> */}
                                <Col sm={1}> <SVGIcon name="toolicon" width={18} height={18} fill={'#3db28c'} /> </Col>
                                <Col sm={9} className="text-left " className="Black-16px">Tool Name {name} </Col>
                                <Col sm={2} className="text-right" className="Gray700-13px">Date Updated</Col>

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
                    </a>
            </Col>
            <Col />
            </Row>
        );
    }
}

export default Tool;