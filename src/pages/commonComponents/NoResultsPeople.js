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
                <Row style={{height: "30px"}} />
                <Row>
                    <Col xs={3} lg={3} />
                    <Col xs={6} lg={6} className="Gray800-14px ml-5 pl-4 mr-5 pr-4">
                        <span> We couldn't find any profiles matching the search terms '{searchString}' </span>
                    </Col>
                    <Col xs={3} lg={3} />
                </Row>
            </div>

        );
    }
}
    
export default NoResultsPeople;