import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Person extends React.Component {
    constructor(props) {
        super(props)
        this.state.data = props.data;
        this.state.activeLink = props.activeLink;
    }

    // initialize our state
    state = {
        data: [],
        activeLink: true
    }; 

    render() {
        const { data, activeLink } = this.state;

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
                <div className={this.props.tempRelatedObjectIds && this.props.tempRelatedObjectIds.some(object => object.objectId === data.id) ? "rectangle selectedBorder" : "rectangle"} onClick={() => !activeLink && this.props.doAddToTempRelatedObjects(data.id, data.type) } >   
                        <Row>
                            <Col xs={2} md={1} className="iconHolder">
                                <div class="avatar-circle">
                                    <span class="initials"> {data.firstname ? data.firstname.charAt(0).toUpperCase() : ''}{data.lastname ? data.lastname.charAt(0).toUpperCase() : ''}</span>
                                </div>
                            </Col>
                            <Col xs={10} md={11}>
                                <p>
                                        {activeLink===true ? 
                                       <span className="black-16"> <a className="black-16" style={{ cursor: 'pointer' }} href={'/person/' + data.id} >{data.firstname} {data.lastname}</a> </span>
                                        : <span className="black-16"> {data.firstname} {data.lastname} </span>
                                        } 
                                    <br />
                                    <span className="gray800-14">{data.bio}</span>
                                </p>

                                <p className="gray800-14">
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
