import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as PersonPlaceholderSvg } from '../../images/person-placeholder.svg';

class Person extends React.Component {
    constructor(props) {
        super(props)
        this.state.data = props.data;
    }

    // initialize our state
    state = {
        data: []
    };

    render() {
        const { data } = this.state;
        return (
            <Row className="mt-2">
                <Col>
                    <a style={{ cursor: 'pointer' }} href={'/person/' + data.id} >
                        <div className="Rectangle">
                            <Row>
                                <Col xs={2} md={1} className="iconHolder">
                                    <PersonPlaceholderSvg />
                                </Col>
                                <Col xs={10} md={11}>
                                    <p>
                                        <span className="Black-16px">{data.firstname} {data.lastname}</span>
                                        <br />
                                        <span className="Gray800-14px">{data.bio}</span>
                                    </p>

                                    <p className="Gray800-14px">
                                        1 dataset
                                        <span className="Purple-14px ml-2">
                                            NIHR HIC Locality : Critical Care
                                        </span>
                                    </p>
                                    <p className="Gray800-14px">
                                        <span>4 tools</span>
                                        <span className="Purple-14px ml-2">
                                            Tableau, Alpha data parser, Panda R library, Sareen
                                        </span>
                                    </p>
                                    <p className="Gray800-14px">
                                        <span>4  projects</span>
                                        <span className="Purple-14px ml-2">
                                            Novel somatic alterations underlie Chinese papillary thyroid carcinoma, Human THO mai…
                                        </span>
                                    </p>
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
