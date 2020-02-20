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
    return (
    <div className="FilterCard mt-2 Gray800-14px">
       
        <Row className="mt-2">
            <Col xs={1}></Col>
            <Col xs={7}>
                <span>Filter</span>
            </Col>
            <Col xs={2}>
                <span className="Purple-14px">Hide</span>
            </Col>
        </Row>
        <Row className="mt-3">
            <Col xs={2}></Col>
            <Col xs={10}>
                <Form.Check
                    type="radio"
                    label="Everything"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    checked={this.props.typeString === 'all' ? true: false}
                    value="all"
                    onClick={this.changeFilter}
                />
                <Form.Check
                    type="radio"
                    label="Tools and resources"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    checked={this.props.typeString === 'tool' ? true: false}
                    value="tool"
                    onClick={this.changeFilter}
                />
                <Form.Check
                    type="radio"
                    label="Research projects"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    checked={this.props.typeString === 'project' ? true: false}
                    value="project"
                    onClick={this.changeFilter}
                />
                <Form.Check
                    type="radio"
                    label="People"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios4"
                    checked={this.props.typeString === 'person' ? true: false}
                    value="person"
                    onClick={this.changeFilter}

                />
            </Col>
        </Row>

      </div>
    );
  }
}

export default FilterButtons;