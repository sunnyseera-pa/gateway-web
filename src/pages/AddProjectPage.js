import React, { Component } from 'react';
import Header from './components/Header';
import AddProjectForm from '../pages/components/AddProjectForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

var baseURL = require('./../BaseURL').getURL();

class AddProjectPage extends Component {

    constructor(props) {
        super(props)
      }
  
      // initialize our state
    state = {
      
    };

    render() {
        return (
            <div>
            <Header />
            <AddProjectForm />
            </div>
        );
    } 

}

export default AddProjectPage;