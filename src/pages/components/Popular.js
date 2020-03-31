import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Popular extends React.Component {

    // initialize our state
    state = {
        popularData: []
    };

    constructor(props) {
        super(props)
        this.state.popularData = props.popularData;
    }

    render() {
        const { popularData } = this.state;

        return (
            <Row className="mt-2">
                <Col>
                    <div className="LandingBox">
                        <Row>
                            <Col sm={1} lg={1} />
                            <Col sm={10} lg={10} className="mt-3 mb-1">
                                <span className="Black-16px"> Most popular this month </span>
                            </Col>
                            <Col sm={1} lg={1} />

                        </Row>
                        <Row>
                            <Col sm={1} lg={1} />
                            <Col sm={10} lg={10} className="GreyStrip" />
                            <Col sm={1} lg={1} />
                        </Row>

                        {popularData.map((popular) => {
                            return (
                                popular._id === '' ? '' :
                                    <div>
                                        <Row >
                                            <Col sm={1} lg={1} />
                                            <Col sm={10} lg={10} className="mt-2 mb-2">
                                                {(() => {
                                                    if (popular.type === "person") {
                                                        return <><a className="Purple-14px" style={{ cursor: 'pointer' }} href={'/person/' + popular.id} >{popular.firstname} {popular.lastname}</a></>
                                                    }
                                                    else if (popular.type === "tool") {
                                                        return <><a className="Purple-14px" style={{ cursor: 'pointer' }} href={'/tool/' + popular.id} >{popular.name}</a></>
                                                    }
                                                    else if (popular.type === "project") {
                                                        return <><a className="Purple-14px" style={{ cursor: 'pointer' }} href={'/project/' + popular.id} >{popular.name}</a></>
                                                    }
                                                })()}
                                                <br />
                                                <span className="Gray800-14px">
                                                    {(() => {
                                                        if (popular.type === "person") {
                                                            return <>{popular.bio} </>
                                                        }
                                                        else {
                                                            return <>
                                                                {!popular.categories.category ? '' : <span className="Gray800-14px">{popular.categories.category}</span>}
                                                                {!popular.categories.programmingLanguage || popular.categories.programmingLanguage.length <= 0 ? '' : ', '}
                                                                {!popular.categories.programmingLanguage || popular.categories.programmingLanguage.length <= 0 ? '' : popular.categories.programmingLanguage.map((language) => {
                                                                    return <span className="Gray800-14px">{language}</span>
                                                                })}
                                                            </>
                                                        }
                                                    })()}
                                                </span>
                                            </Col>
                                            <Col sm={1} lg={1} />
                                        </Row>
                                        <Row>
                                            <Col sm={1} lg={1} />
                                            <Col sm={10} lg={10} className="GreyStrip" />
                                            <Col sm={1} lg={1} />
                                        </Row>
                                    </div>
                            )
                        })
                        }
                    </div>

                </Col>
            </Row>
        );
    }
}

export default Popular;