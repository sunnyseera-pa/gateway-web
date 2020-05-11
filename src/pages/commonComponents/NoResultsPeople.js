import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

var baseURL = require('./BaseURL').getURL();

class NoResultsPeople extends React.Component {

    render() {
        // const { data, detailsData } = this.state;

        return (
            <div>
                <Row style={{height: "30px"}} />
                <Row>
                    <Col xs={3} lg={3} />
                    <Col xs={6} lg={6} className="Gray800-14px ml-5 pl-3 mr-5 pr-3">
                        <span> We couldn’t find any people matching the search terms ‘epilepsy’ </span>
                    </Col>
                    <Col xs={3} lg={3} />
                </Row>
                <Row className="mt-3">
                    <Col xs={3} lg={3} />
                    <Col xs={6} lg={6} className="Gray800-14px ml-5 pl-3 mr-5 pr-3">
                        <span> Try searching for ‘COVID-19’ if you want to see examples of people </span>
                    </Col>
                    <Col xs={3} lg={3} />
                </Row>

            </div>

        );
    }
}
    
export default NoResultsPeople;