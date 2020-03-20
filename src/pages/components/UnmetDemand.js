import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon";
import axios from 'axios';
import Loading from './Loading'

var baseURL = require('./../../BaseURL').getURL();

class UnmetDemand extends React.Component {

    // initialize our state
    state = {
        unmetData: []
    };

    constructor(props) {
        super(props)
        this.state.unmetData = props.unmetData;
    }


    render() {
        const {unmetData} = this.state;

        return (
            <Row className="mt-2">
                <Col>
                        {/* <div className="TitleLandingBox">
                        <Row >
                                <Col sm={1} lg={1}/>
                                <Col sm={10} lg={10} className="mt-3 mb-1">
                                <span className="Black-16px"> Unmet Demand </span>
                                </Col>
                                <Col sm={1} lg={1}/>

                            </Row>
                            <Row>
                                <Col sm={1} lg={1} />
                                <Col sm={10} lg={10} className="GreyStrip"/>
                                <Col sm={1} lg={1}/>
                            </Row>
                        </div> */}
                        <div className="LandingBox">
                            <Row>
                                <Col sm={1} lg={1}/>
                                <Col sm={10} lg={10} className="mt-3 mb-1">
                                <span className="Black-16px"> Unmet Demand </span>
                                </Col>
                                <Col sm={1} lg={1}/>

                            </Row>
                            <Row>
                                <Col sm={1} lg={1} />
                                <Col sm={10} lg={10} className="GreyStrip"/>
                                <Col sm={1} lg={1}/>
                            </Row>

                            {unmetData.map((unmetDat) => {
                                console.log('unmet: ' + unmetDat._id)
                                return(
                                    unmetData._id == '' ? '' :
                                    <div>
                                            <Row >
                                                <Col sm={1} lg={1} />
                                                <Col sm={10} lg={10} className="mt-2 mb-2">
                                                <a className="Purple-14px" style={{ cursor: 'pointer' }} href={'/search?search=' + unmetDat._id + '&type=all&toolcategory=&programminglanguage=&features=&topics='}> {unmetDat._id} </a>
                                                    <br />
                                                    <span className="Gray800-14px"> {unmetDat.count} {unmetDat.count == 1 ? 'search' : 'searches'} but no result</span>
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

export default UnmetDemand;