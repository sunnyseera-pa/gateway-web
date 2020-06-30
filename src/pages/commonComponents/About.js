import React from 'react';
import ReactMarkdown from 'react-markdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon"
import axios from 'axios';
import Loading from './Loading'
import Linkify from "react-linkify";

var baseURL = require('./BaseURL').getURL();

class About extends React.Component {
    // initialize our state
    state = {
        data: [],
        isLoading: true
    };

    constructor(props) {
        super(props)
            this.state.data = props.data;
            this.state.isLoading = false;
    }

    getDataSearchFromDb = () => {
        this.setState({ isLoading: true });
        axios.get(baseURL + '/api/v1/project/' + this.state.id)
            .then((res) => {
                this.setState({
                    data: res.data.data[0],
                    isLoading: false
                });
            })
    };

    render() {
        const { data, isLoading } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return (
            <div>
            <Row className="mt-2">
                <Col sm={12} lg={12}>
                    <div className="rectangle">
                        <Row className="gray800-14-bold">
                            <Col sm={10} lg={10}>
                                Description
                            </Col>
                        </Row>
                        <Row className="mt-3">

                            {/* {data.abstract ? <Col sm={12} lg={12} className="gray800-14">{data.abstract}</Col> : <Col sm={12} lg={12} className="gray800-14-opacity">Not specified</Col> } */}
                            {data.abstract ? <Col sm={12} lg={12} className="gray800-14"> <ReactMarkdown source={data.abstract} /> </Col> : <Col sm={12} lg={12} className="gray800-14-opacity">Not specified</Col> }

                        </Row>
                    </div>
                  </Col>
              </Row>

              <Row className="mt-2">
                <Col sm={12} lg={12}>
                    <div className="rectangle">
                        <Row className="gray800-14-bold">
                            <Col sm={10} lg={10}>
                                Data access
                            </Col>
                        </Row>

                        <Row className="mt-3">
                                <Col sm={2} lg={2} className="gray800-14" >
                                    Access rights
                                </Col>
                                {data.accessRights ? <Col sm={8} lg={8} className="gray800-14">
                                    {/* {data.accessRights} */}
                                    {/* <a href={data.accessRights} target="_blank"> {data.accessRights} </a> */}
                                    <Linkify 
                                    properties={{ target: '_blank' }}
                                    // target="_blank"
                                    >{data.accessRights}</Linkify>
                                    </Col> : <Col sm={8} lg={8} className="gray800-14-opacity">Not specified</Col> }
                        </Row>
                    </div>
                  </Col>
              </Row>

              <Row className="mt-2">
                <Col sm={12} lg={12}>
                    <div className="rectangle">
                        <Row className="gray800-14-bold">
                            <Col sm={10} lg={10}>
                                Coverage
                            </Col>
                        </Row>
                        <Row className="mt-3">
                                <Col sm={3} lg={3} className="gray800-14" >
                                    Jurisdiction
                                </Col>
                                {data.jurisdiction ? <Col sm={9} lg={9} className="gray800-14">{data.jurisdiction}</Col> : <Col sm={8} lg={8} className="gray800-14-opacity">Not specified</Col> }
                        </Row>
                        <Row className="mt-3">
                                <Col sm={3} lg={3} className="gray800-14" >
                                    Geographic coverage
                                </Col>
                                {data.geographicCoverage ? <Col sm={9} lg={9} className="gray800-14">{data.geographicCoverage}</Col> : <Col sm={8} lg={8} className="gray800-14-opacity">Not specified</Col> }
                        </Row>
                        <Row className="mt-3">
                                <Col sm={3} lg={3} className="gray800-14" >
                                    Dataset start date
                                </Col>
                                {data.datasetStartDate ? <Col sm={9} lg={9} className="gray800-14">{data.datasetStartDate}</Col> : <Col sm={8} lg={8} className="gray800-14-opacity">Not specified</Col> }
                        </Row>
                        <Row className="mt-3">
                                <Col sm={3} lg={3} className="gray800-14" >
                                    Dataset end date
                                </Col>
                                {data.datasetEndDate ? <Col sm={9} lg={9} className="gray800-14">{data.datasetEndDate}</Col> : <Col sm={8} lg={8} className="gray800-14-opacity">Not specified</Col> }
                        </Row>
                    </div>
                  </Col>
              </Row>

              <Row className="mt-2">
                <Col sm={12} lg={12}>
                    <div className="rectangle">
                        <Row className="gray800-14-bold">
                            <Col sm={10} lg={10}>
                                Demographics
                            </Col>
                        </Row>
                        <Row className="mt-3">
                                <Col sm={3} lg={3} className="gray800-14" >
                                    Statistical population
                                </Col>
                                {data.statisticalPopulation ? <Col sm={9} lg={9} className="gray800-14">{data.statisticalPopulation}</Col> : <Col sm={8} lg={8} className="gray800-14-opacity">Not specified</Col> }
                        </Row>
                        <Row className="mt-3">
                                <Col sm={3} lg={3} className="gray800-14" >
                                    Age band 
                                </Col>
                                {data.ageBand ? <Col sm={9} lg={9} className="gray800-14">{data.ageBand}</Col> : <Col sm={8} lg={8} className="gray800-14-opacity">Not specified</Col> }
                        </Row>
                    </div>
                  </Col>
              </Row>

              <Row className="mt-2">
                <Col sm={12} lg={12}>
                    <div className="rectangle">
                        <Row className="gray800-14-bold">
                            <Col sm={10} lg={10}>
                                Related resources
                            </Col>
                        </Row>
                        <Row className="mt-3">
                                <Col sm={3} lg={3} className="gray800-14" >
                                    Physical sample availability 
                                </Col>
                                {data.physicalSampleAvailability ? <Col sm={9} lg={9} className="gray800-14">{data.physicalSampleAvailability}</Col> : <Col sm={8} lg={8} className="gray800-14-opacity">Not specified</Col> }
                        </Row>
                    </div>
                  </Col>
              </Row>
          </div>

        );
    }
}

export default About;
