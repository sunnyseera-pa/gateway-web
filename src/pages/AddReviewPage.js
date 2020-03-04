import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import AddReviewForm from '../pages/components/AddReviewForm';
// import NewAddToolForm from '../pages/components/NewAddToolForm';
import SignupForm from '../pages/components/Try';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToolTitle from './components/ToolTitle';
import ToolInfoReviewForm from './components/ToolInfoReviewForm';



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

class AddReviewPage extends React.Component {

    constructor(props) {
        super(props)
      }
  
      // initialize our state
    state = {
        data: [],
        isLoading: true
    };

    componentDidMount() {
        this.getDataSearchFromDb();
    }

      getDataSearchFromDb = () => {
        //need to handle error if no id is found
        this.setState({ isLoading: true });
        axios.get(baseURL+'/api/tool/'+this.props.match.params.toolID)
        .then((res) => {
          this.setState({ 
            data: res.data.data[0],
            isLoading: false 
          });
        })
        
      };

    render() {
        const {data, isLoading} = this.state;

        {console.log('whats here? ' + JSON.stringify(data.reviews))}

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
            <Header />
            {/* <ToolInfoReviewForm /> */}
            <AddReviewForm data={data}/>
            </div>
        );
    } 

}

export default AddReviewPage;