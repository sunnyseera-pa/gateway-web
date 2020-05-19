import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

var baseURL = require('./BaseURL').getURL();

class NoResultsTool extends React.Component {

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
                        <span> We couldn’t find any tools matching the search terms ‘{searchString}’ </span>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="Gray800-14px text-center">
                        <span> Tools may be repositories, software, guidelines, courses or any useful resources that can be used in research or analysis. </span>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="Gray800-14px text-center">
                        <span> Try searching for ‘<a href={'/search?search=' + 'COVID-19' + '&type=all'} className="Purple-14px">COVID-19</a>’ if you want to see examples of tools </span>
                    </Col>
                </Row>
            </div>
        );
    }
}
    
export default NoResultsTool;