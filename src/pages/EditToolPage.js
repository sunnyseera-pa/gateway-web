import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import EditToolForm from '../pages/components/EditToolForm';
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

class EditToolPage extends React.Component {

    constructor(props) {
        super(props)
      }
  
      // initialize our state
    state = {
        data: [],
        isLoading: true
    };

 // on loading of tool detail page
 componentDidMount() {
    this.getDataSearchFromDb();
  }


  // on loading of tool detail page were id is different
//   componentDidUpdate() {
//     if (this.props.match.params.toolID != this.state.id && this.state.id != '' && !this.state.isLoading) {
//       this.getDataSearchFromDb();
//     }
//   }

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
        const {data, isLoading } = this.state;
    
        if (isLoading) {
          return <p>Loading ...</p>;
        }

        return (
            <div>
            <Header />
            <EditToolForm data={data} />
            </div>
        );
    } 

}

export default EditToolPage;