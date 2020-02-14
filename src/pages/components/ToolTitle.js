
// /ShowObjects/Title.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

class ToolTitle extends Component {

  constructor(props) {
    super(props)
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
    id: '',
    type: '',
    name: '',
    description: '',
    rating: '',
    link: '',
    tags: []
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { id, type, name, description, rating, link, tags} = this.state;
    // const tag = this.state.tags.map((tag) => tag);
    const tag = this.state.tags.map((tag) =>   
    <li id="TagItem"> {tag} </li>
    );

    return (
      // <div className="Rectangle">
      //   <p>Title = {id} = {type}</p>
      <div>
          <Row className="mt-1">
                <Col></Col>
                <Col>
                    <Card className="Rectangle">
                        <Card.Body>   
                        {/* <Container> */}
                            <Row className="mb-2">
                                <Col sm={9} className="text-left " className="Black-20px"> {name}</Col>
                                {/* <Col sm={2}> <Image src="../../images/tableau.jpg/152x32" /> </Col> */}
                                {/* <Col sm={2}> <Image src={logo} /> </Col> */}
                                <Col sm={3}> <Image src={require("../../images/tableau.jpg")} id="Logo" /> </Col>
                            </Row>

                            <Row>
                                <Col sm={12}>
                                <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> {tag} </Badge>
                                <Badge> {tags.length} </Badge>

                                {/* {2<4 ? 
                                    (<Badge pill variant="light" className="mr-2 Gray800-14px Pill"> {tag} </Badge>) :
                                    (<Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag2 </Badge>)
                                } */}


                                    {/* <ul>
                                        {this.state.tags.map(tag => (
                                        <li key={tag}> {tag} </li>
                                        ))}
                                    </ul> */}
                            
                                    {/* <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag2 </Badge> */}
                                </Col>
                            </Row>    

                            <Row>
                                <Col className="Gray800-14px"> {description} </Col>
                            </Row>
                            
                        {/* </Container> */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
           </Row>

          <Row className="mt-0.5">
                <Col></Col>
                <Col>
                  <Card className="Rectangle">
                      <Card.Body>   
                      {/* <Container> */}
                          <Row>
                              <Col sm={12}>
                                  <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> {tag} </Badge>
                                  {/* <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag2 </Badge>
                                  <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag3 </Badge>
                                  <Badge pill variant="light" className="mr-2 Gray800-14px Pill"> Tag4 </Badge> */}
                              </Col>
                          </Row>    
                      {/* </Container> */}
                      </Card.Body>
                  </Card>
              </Col>
             <Col></Col>
          </Row>

          <Row className="mt-0.5">
                <Col></Col>
                <Col>
                  <Card className="Rectangle">
                      <Card.Body>   
                      {/* <Container> */}
                          <Row className="mb-1">
                              <Col sm={6} className="text-left " className="Purple-14px"> {link} </Col>
                          </Row>
                      {/* </Container> */}
                      </Card.Body>
                  </Card>
              </Col>
             <Col></Col>
          </Row>

      </div>

    );
  }
}


export default ToolTitle;