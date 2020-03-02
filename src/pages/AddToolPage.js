import React, { Component } from 'react';
import Header from './components/Header';
import AddToolForm from '../pages/components/AddToolForm';
// import NewAddToolForm from '../pages/components/NewAddToolForm';
import SignupForm from '../pages/components/Try';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

var baseURL = require('./../BaseURL').getURL();

class AddToolPage extends React.Component {

    constructor(props) {
        super(props)
      }
  
      // initialize our state
    state = {
      
    };

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
            <Header />
            <AddToolForm />
            </div>
        );
    } 

}

export default AddToolPage;