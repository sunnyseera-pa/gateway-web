import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

        var countOfProjects = 0;
        var countOfTools = 0;
        data.objects.forEach((object) => {
            if (object.type === 'project') {
                countOfProjects++;
            }
            else if (object.type === 'tool') {
                countOfTools++;
            }
        });

        return (
            <Row className="mt-2">
                <Col>
                    <div className="Rectangle">
                        <Row>
                            <Col xs={2} md={1} className="iconHolder">
                                <div class="avatar-circle">
                                    <span class="initials"> {data.firstname.charAt(0).toUpperCase()}{data.lastname.charAt(0).toUpperCase()}</span>
                                </div>
                            </Col>
                            <Col xs={10} md={11}>
                                <p>
                                    <span className="Black-16px"><a className="Dark-16px" style={{ cursor: 'pointer' }} href={'/person/' + data.id} >{data.firstname} {data.lastname}</a></span>
                                    <br />
                                    <span className="Gray800-14px">{data.bio}</span>
                                </p>

                                <p className="Gray800-14px">
                                    <b>
                                        {(() => {
                                            if (countOfProjects === 0) {
                                                return <></>
                                            }
                                            else if (countOfProjects === 1) {
                                                return <>1 Project</>
                                            }
                                            else {
                                                return <>{countOfProjects} Projects</>
                                            }
                                        })()}

                                        {countOfProjects > 0 && countOfTools !== 0 ? ', ' : ''}

                                        {(() => {
                                            if (countOfTools === 0) {
                                                return <></>
                                            }
                                            else if (countOfTools === 1) {
                                                return <>1 Tool</>
                                            }
                                            else {
                                                return <>{countOfTools} Tools</>
                                            }
                                        })()}
                                    </b>
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
