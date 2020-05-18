import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

var baseURL = require('./BaseURL').getURL();

class NoResultsProjects extends React.Component {

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
                    <Col className="Gray800-14px text-center">
                        <span> We couldn’t find any projects matching the search terms ‘{searchString}’ </span>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="Gray800-14px text-center">
                        <span> Project may be articles, papers, white papers, work-in-progress, initiatives or any other type of activity. </span>
                        <br />
                        <span className="ml-4 mr-4"> They help provide context and help you understand how a dataset or tool has been used. </span>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="Gray800-14px text-center">
                        <span> Try searching for ‘<a href={'/search?search=' + 'COVID-19' + '&type=all'} className="Purple-14px">COVID-19</a>’ if you want to see examples of projects </span>
                    </Col>
                </Row>
            </div>
        );
    }
}
    
export default NoResultsProjects;
