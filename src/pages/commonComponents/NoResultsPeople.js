import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

var baseURL = require('./BaseURL').getURL();

class NoResultsPeople extends React.Component {

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
                        <span> We couldn't find any profiles matching the search terms '{searchString}' </span>
                    </Col>
                </Row>
            </div>

        );
    }
}
    
export default NoResultsPeople;