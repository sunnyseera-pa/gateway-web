import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

var baseURL = require('./BaseURL').getURL();

class NoResultsDatasets extends React.Component {

    state = {
        searchString: ''
    }

    constructor(props) {
        super(props)
        if (props.searchString) {
            this.state.searchString = props.searchString;
        }
    }

    render() {
        const { searchString } = this.state;

        return (
            <div>
                <Row style={{height: "30px"}} />
                <Row>
                    <Col xs={3} lg={3} />
                    <Col xs={6} lg={6} className="Gray800-14px ml-5 pl-3 mr-5 pr-3">
                        <span> We couldn’t find any datasets matching the search term ‘{searchString}’ </span>
                    </Col>
                    <Col xs={3} lg={3} />
                </Row>
                <Row className="mt-3">
                    <Col xs={3} lg={3} />
                    <Col xs={6} lg={6} className="Gray800-14px ml-5 pl-3 mr-5 pr-3">
                        <span> Try searching for ‘<a href={'/search?search=' + 'COVID-19' + '&type=all'} className="Purple-14px">COVID-19</a>’ if you want to see examples of datasets </span>
                    </Col>
                    <Col xs={3} lg={3} />
                </Row>

            </div>

        );
    }
}
    
export default NoResultsDatasets;