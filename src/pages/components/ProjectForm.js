import React, { Component } from 'react';

class ProjectForm extends Component {

    constructor(props) {
      super(props)
    }

    // initialize our state
    state = {
    
    };

    render() {
        return (
            <div>
                <Row className="mt-2">
                    <Col sm={1} lg={1} />
                    <Col sm={10} lg={10}>
                        <div className="Rectangle">

                        </div>
                    </Col>
                    <Col sm={1} lg={10} />
                </Row>
            </div>
        );
    }
}

export default ProjectForm;
