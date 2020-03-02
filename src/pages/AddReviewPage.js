import React, { Component } from 'react';
import Header from './components/Header';
import AddReviewForm from '../pages/components/AddReviewForm';
// import NewAddToolForm from '../pages/components/NewAddToolForm';
import SignupForm from '../pages/components/Try';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToolTitle from './components/ToolTitle';

var baseURL = require('./../BaseURL').getURL();

class AddReviewPage extends React.Component {

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
            {/* <ToolTitle /> */}
            <AddReviewForm />
            </div>
        );
    } 

}

export default AddReviewPage;