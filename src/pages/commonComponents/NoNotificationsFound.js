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
            <Row className="mt-2">
                <Col>
                    <div className="NoNotifications" >
                        <div className="Gray800-14px" style={{ textAlign: 'center' }}>
                            <p><b>No notifications yet</b></p>
                            <p>We'll let you know when something important happens to your content or account.</p>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default NotFound;