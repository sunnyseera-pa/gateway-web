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
                    <div className="Rectangle">
                        <Row>
                            <Col xs={2} md={1} className="iconHolder">
                                <div class="avatar-circle">
                                    <span class="initials">{data.firstname.charAt(0).toUpperCase()}{data.lastname.charAt(0).toUpperCase()}</span>
                                </div>
                            </Col>
                            <Col xs={10} md={11}>
                                <p>
                                    <span className="Black-16px"><a style={{ cursor: 'pointer' }} href={'/person/' + data.id} >{data.firstname} {data.lastname}</a></span>
                                    <br />
                                    <span className="Gray800-14px">{data.bio}</span>
                                </p>

                                <p className="Gray800-14px">
                                    <b>5 projects, 3 tools, 6 data sets</b>
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Person;
