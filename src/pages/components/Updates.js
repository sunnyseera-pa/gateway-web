import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Updates extends React.Component {

    // initialize our state
    state = {
        updatesData: []
    };

    constructor(props) {
        super(props)
        this.state.updatesData = props.updatesData;
    }

    render() {
        const { updatesData } = this.state;

        return (
            <Row className="mt-2">
                <Col>
                    <div className="LandingBox">
                        <Row>
                            <Col sm={1} lg={1} />
                            <Col sm={10} lg={10} className="mt-3 mb-1">
                                <span className="Black-16px"> Recently updated </span>
                            </Col>
                            <Col sm={1} lg={1} />
                        </Row>
                        <Row>
                            <Col sm={1} lg={1} />
                            <Col sm={10} lg={10} className="GreyStrip" />
                            <Col sm={1} lg={1} />
                        </Row>

                        {updatesData.map((updates) => {
                            return (
                                updates._id === '' ? '' :
                                    <div>
                                        <Row >
                                            <Col sm={1} lg={1} />
                                            <Col sm={10} lg={10} className="mt-2 mb-2">
                                                <span className="Purple-14px">
                                                    {(() => {
                                                        if (updates.type === "person") {
                                                            return <><a className="Purple-14px" style={{ cursor: 'pointer' }} href={'/person/' + updates.id} >{updates.firstname} {updates.lastname}</a></>
                                                        }
                                                        else if (updates.type === "tool") {
                                                            return <><a className="Purple-14px" style={{ cursor: 'pointer' }} href={'/tool/' + updates.id} >{updates.name}</a></>
                                                        }
                                                        else if (updates.type === "project") {
                                                            return <><a className="Purple-14px" style={{ cursor: 'pointer' }} href={'/person/' + updates.id} >{updates.name}</a></>
                                                        }
                                                    })()}
                                                </span>
                                                <br />
                                                <span className="Gray800-14px">
                                                    {(() => {
                                                        if (updates.type === "person") {
                                                            return <>{updates.bio} </>
                                                        }
                                                        else {
                                                            return <>
                                                                {!updates.categories.category ? '' : <span className="Gray800-14px">{updates.categories.category}</span>}
                                                                {!updates.categories.programmingLanguage || updates.categories.programmingLanguage.length <= 0 ? '' : ', '}
                                                                {!updates.categories.programmingLanguage || updates.categories.programmingLanguage.length <= 0 ? '' : updates.categories.programmingLanguage.map((language) => {
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

export default Updates;