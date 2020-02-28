import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AddProjectForm extends Component {

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
                            <p className="Black-20px">Add a new research project</p>
                            <p className="Gray800-14px">Projects help others understand the context in which a tool or resource was used</p>
                        </div>
                    </Col>
                    <Col sm={1} lg={10} />
                </Row>

                <Row className="mt-2">
                    <Col sm={1} lg={1} />
                    <Col sm={10} lg={10}>
                        <div className="Rectangle">
                            <Form>
                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Project name</Form.Label>
                                    <Form.Control type="text" className="AddFormInput"/>
                                </Form.Group>

                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Link</Form.Label>
                                    <Form.Control type="text" className="AddFormInput"/>
                                </Form.Group>

                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Description</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                        Up to 5,000 characters
                                </Form.Text>
                                    <Form.Control type="text" className="AddFormInput" id="DescriptionInput"/>
                                </Form.Group>

                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Authors</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                        Add any authors or collaborators
                                </Form.Text>
                                    <Form.Control type="text" className="AddFormInput"/>
                                </Form.Group>

                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Category</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                        Select from existing or enter a new one.
                                </Form.Text>
                                    <Form.Control type="text" className="AddFormInput"/>
                                </Form.Group>

                                <Form.Group className="pb-2">
                                    <Form.Label className="Gray800-14px">Keywords</Form.Label>
                                    <Form.Text className="Gray700-13px">
                                        Words that help people identify any related fields or key concepts. As many as you like.
                                </Form.Text>
                                    <Form.Control type="text" className="AddFormInput"/>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                    <Col sm={1} lg={10} />
                </Row>

                <Row className="mt-3">
                    <Col sm={9} lg={9} />
                    <Col sm={2} lg={2}  className="ml-3">
                        <Button variant="primary" type="submit" className="AddButton">
                            Add this project
                        </Button>
                    </Col>
                    <Col sm={1} lg={10}/>
                </Row>
            </div>
        );
    }
}

export default AddProjectForm;
