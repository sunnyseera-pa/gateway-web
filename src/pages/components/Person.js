import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Person extends React.Component{
    constructor(props) {
        super(props)
        this.state.data = props.data;
    }

    // initialize our state
    state = {
        data: []
      };

    render(){
        const { data } = this.state;
        return(
            <Row className="mt-2">
            <Col>
                <a style={{ cursor: 'pointer' }} href={'/person/' + data.id} >
                    <div className="Rectangle">
                        <Row>
                            <Col xs={2} md={1} className="iconHolder">
                                <Image src={require("../../images/bob.jpg")} id="Picture" roundedCircle />
                            </Col>
                            <Col xs={10} md={11}>
                                <p>
                                    <span className="Black-16px">{data.firstname} {data.surname}</span>
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
                                {data.tags.length <= 0 ? 'NO SEARCH RESULT' : data.tags.map((tag) => {
                                    return <div className="mr-2 Gray800-14px tagBadges mb-2">{tag}</div>
                                })}
                            </Col>
                        </Row>
                    </div>
                </a>
            </Col>
        </Row>
        );
    }
}

export default Person;
