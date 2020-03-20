import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SearchSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state.data = props.data;
    }

    // initialize our state
    state = {
        data: [],
    };

    render() {
        const { data } = this.state;

        var total = 0;
        data.map(summ => total += summ[1]);

        return (
            <Row className="mt-2">
                <Col>
                    <div className="Rectangle">
                        <div className="Gray800-14px" style={{ textAlign: 'center' }}>
                            Showing {data.map(summ => summ[1] + ' ' + summ[0] + (summ[1] > 1 ? 's' : '')).join(", ")} ({total} total)
                                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default SearchSummary;