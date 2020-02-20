import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SearchNotFound extends React.Component{


    render(){
        return(
            <Row className="mt-2">
                <Col>
                    <div className="Rectangle">
                        <div className="Gray800-14px" style={{textAlign: 'center'}}>
                            No results found
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default SearchNotFound;