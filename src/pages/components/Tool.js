import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import SVGIcon from "../../images/SVGIcon"
// import { ReactComponent as ToolIconSvg } from '../../images/tool.svg';

class Tool extends React.Component{

    constructor(props) {
        super(props)
        this.state.data = props.data;
        this.state.id = props.id;
        this.state.type = props.type;
        this.state.name = props.name;
        this.state.description = props.description;
        this.state.rating = props.rating;
        this.state.link = props.link;
        this.state.tags = props.tags;
      }
    
      // initialize our state
      state = {
        data: [],
        id: '',
        type: '',
        name: '',
        description: '',
        rating: '',
        link: '',
        tags: []
      };

    render(){
        const { data, id, type, name, description, rating, link, tags } = this.state;
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

                                                
                                {/* <Col sm={1}>  <ToolIconSvg /> </Col> */}
                                <Col sm={1}> <SVGIcon name="toolicon" width={18} height={18} fill={'#3db28c'} /> </Col>
                                <Col sm={9} className="text-left " className="Black-16px"> {name} </Col>
                                <Col sm={2} className="text-right" className="Gray700-13px">Date Updated</Col>

                            </Row>
                            <Row>
                                <Col sm={1}> </Col>
                                <Col sm={11} className="text-left" className="Gray800-14px">Person</Col>
                            </Row>
                            <Row> 
                                <Col sm={1}> </Col>
                                <Col sm={11} className="text-left" className="Gray800-14px"> x projects using it </Col>
                            </Row>
                            <Row className="mb-3"> 
                                <Col sm={1}> </Col>
                                <Col sm={11} className="text-left" className="Gray800-14px"> x reviews </Col>
                            </Row>
                            <Row>
                                <Col>
                                {tags.length <= 0 ? 'NO SEARCH RESULT': tags.map((tag) => {
                                    return <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> {tag} </Badge>
                                })}
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