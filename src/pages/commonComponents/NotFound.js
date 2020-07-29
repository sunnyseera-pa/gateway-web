import React from 'react';
import { Col, Row } from 'react-bootstrap';

class NotFound extends React.Component {

    constructor(props) {
        super(props)
        this.state.word = props.word;
    }

    state = {
        word: "results"
    };

    render() {
        const { word } = this.state;

        return (
            
            <Row className="entryBox mt-2">
                <Col>
                    <div className="gray800-14" style={{ textAlign: 'center' }} data-testid="notFound">
                        No {word} found
                    </div>
                </Col>
            </Row>
        )
    }
}

export default NotFound;