import React, { Component } from 'react';
import Header from './components/Header';
import AddToolForm from '../pages/components/AddToolForm';
// import NewAddToolForm from '../pages/components/NewAddToolForm';
import SignupForm from '../pages/components/Try';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



var baseURL = window.location.href;

if (!baseURL.includes('localhost')) {
    var rx = /^([http|https]+\:\/\/[a-z]+)([^/]*)/;
    var arr = rx.exec(baseURL);
    if (arr.length > 0) {
        //add -api to the sub domain for API requests
        baseURL = arr[1]+'-api'+arr[2]
    }

} else {
    baseURL = 'http://localhost:3001'
}

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