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
               <Row className="mt-4">
                    <Col className="Gray800-14px text-center">
                        <span> We couldn’t find any datasets matching the search term ‘{searchString}’ </span>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="Gray800-14px text-center">
                        <span> Try searching for ‘<a href={'/search?search=' + 'COVID-19'} className="Purple-14px">COVID-19</a>’ if you want to see examples of datasets </span>
                    </Col>
                </Row>

            </div>

        );
    }
}
    
export default NoResultsDatasets;