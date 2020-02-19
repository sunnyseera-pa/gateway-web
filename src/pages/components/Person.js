import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Person extends React.Component{
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
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
                <a style={{ cursor: 'pointer' }} href={'/tool/' + data.id} >
                    <div className="Rectangle">
                        <Row>
                            <Col xs={2} md={1} className="iconHolder">
                                <Image src={require("../../images/bob.jpg")} id="Picture" roundedCircle />
                            </Col>
                            <Col xs={10} md={11}>
                                <p>
                                    <span className="Black-16px">{name}</span>
                                    <br />
                                    <span className="Gray800-14px">University of Naples Federico II | UNINA // Department of Economics and Statistics</span>
                                </p>
                                <p className="Gray800-14px">
                                    5 projects created
                                    <br />
                                    2 tools created, 17 reviewed
                                </p>
                            </Col>
                        
                            <Col xs={12} md={12}>
                                {tags.length <= 0 ? 'NO SEARCH RESULT' : tags.map((tag) => {
                                    return <div className="mr-2 Gray800-14px tagBadges mb-2">{tag}</div>
                                })}
                            </Col>
                        </Row>
                    </div>
                </a>
            </Col>
            <Col sm={1} lg={10}/>
        </Row>
        );
    }
}

export default Person;
