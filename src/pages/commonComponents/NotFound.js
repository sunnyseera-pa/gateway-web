import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
            
            <div className="entryBox mt-2">
                <Col>
                    <div className="Gray800-14px" style={{ textAlign: 'center' }} data-testid="notFound">
                        No {word} found
                    </div>
                </Col>
            
            </div>
        )
    }
}

export default NotFound;