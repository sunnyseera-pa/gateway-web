import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import EditToolForm from '../pages/components/EditToolForm';
// import NewAddToolForm from '../pages/components/NewAddToolForm';
import SignupForm from '../pages/components/Try';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

var baseURL = require('./../BaseURL').getURL();

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