import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon";
import axios from 'axios';
import Loading from './Loading'

var baseURL = require('./../../BaseURL').getURL();

class RecentSearches extends React.Component {

    // initialize our state
    state = {
        searchData: [],
    };

    constructor(props) {
        super(props)
        console.log('them props: ' + JSON.stringify(props))
        this.state.searchData = props.searchData;
        console.log('props here are: ' + JSON.stringify(this.state.searchData));
    }


    render() {
        const { searchData} = this.state;
        console.log('search in render: ' + JSON.stringify(searchData[0]))

        return (
            
            <Row className="mt-2">
                <Col>
                        {/* <div className="TitleLandingBox">
                            <Row >
                                <Col sm={1} lg={1}/>
                                <Col sm={10} lg={10} className="mt-3 mb-1">
                                <span className="Black-16px"> Recent Searches </span>
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
                            <Row >
                                <Col sm={1} lg={1}/>
                                <Col sm={10} lg={10} className="mt-3 mb-1">
                                <span className="Black-16px"> Recent Searches </span>
                                </Col>
                                <Col sm={1} lg={1}/>

                            </Row>
                            <Row>
                                <Col sm={1} lg={1} />
                                <Col sm={10} lg={10} className="GreyStrip"/>
                                <Col sm={1} lg={1}/>
                            </Row>

                                {searchData.map((searchDat) => {                                
                                   return (
                                    searchDat._id == '' ? '' :
                                    <div>
                                    <Row >
                                        <Col sm={1} lg={1}/>
                                        <Col sm={10} lg={10} className="mt-2 mb-2">
                                        <span className="Purple-14px"> {searchDat._id} </span>
                                        <br />
                                        <span className="Gray800-14px"> {!searchDat.returned.tool ? 0 : searchDat.returned.tool} tools, {!searchDat.returned.project ? 0 : searchDat.returned.project} projects, {!searchDat.returned.person ? 0 :searchDat.returned.person} people</span>
                                        </Col>
                                        <Col sm={1} lg={1}/>
                                    </Row> 
                                    <Row>
                                        <Col sm={1} lg={1} />
                                        <Col sm={10} lg={10} className="GreyStrip"/>
                                        <Col sm={1} lg={1}/>
                                    </Row>
                                    </div>
                                )
                                    })}
  
                            <Row>
                                <Col sm={1} lg={1} />
                                <Col sm={10} lg={10} className="GreyStrip"/>
                                <Col sm={1} lg={1}/>
                            </Row>

                        </div>
                    
                </Col>
            </Row>

        );
    }
}

export default RecentSearches;