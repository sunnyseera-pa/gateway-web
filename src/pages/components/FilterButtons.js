// /ShowObjects/ToolsCreated.js
import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Card from 'react-bootstrap/Card';

class FilterButtons extends Component {
  // initialize our state
  state = {
    typeString: "",
    isChecked: true
  };

  changeFilter = (e) => {
    this.setState({typeString : e.target.value});
    this.props.doUpdateTypeString(e.target.value);
    this.props.doCallTypeString(e.target.value);
}


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { typeString} = this.state;

    return (
    <Card className="FilterCard">
        <Form className="Gray800-14px">
            <Form.Group>

                <Row className="mt-3">
                    <Col sm={1}></Col>
                    <Col sm={8}>
                        <Form.Label >
                            Filter
                        </Form.Label>
                    </Col>
                    <Col sm={2}>
                        <Form.Label className="Purple-14px">
                            Hide
                        </Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}></Col>
                    <Col sm={10}>
                        <Form.Check
                            type="radio"
                            label="Everything"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                            defaultChecked="checked"
                            value=""
                            onClick={this.changeFilter}
                        />
                        <Form.Check
                            type="radio"
                            label="Tools and resources"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                            value="tool"
                            onClick={this.changeFilter}
                        />
                        <Form.Check
                            type="radio"
                            label="Research projects"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                            value="project"
                            onClick={this.changeFilter}
                        />
                        <Form.Check
                            type="radio"
                            label="People"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios4"
                            value="person"
                            onClick={this.changeFilter}

                        />
                    </Col>
                </Row>
            </Form.Group>
        </Form>
      </Card>
    );
  }
}

export default FilterButtons;