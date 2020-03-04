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
        combinedTopic: [],
        combinedFeatures:[],
        combinedLanguages:[],
        combinedCategories:[],
        combinedLicenses:[],
        isLoading: true
    };

 // on loading of tool detail page
 componentDidMount() {
    this.getDataSearchFromDb();
    this.doGetTopicsCall();
    this.doGetFeaturesCall();
    this.doGetLanguagesCall();
    this.doGetCategoriesCall();
    this.doGetLicensesCall();
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
    });

    // axios.get(baseURL+'/api/getAllTopics/tool')
    // .then((res) =>{
    //     this.setState({combinedTopic: res.data.data});
    //     this.setState({isLoading: false}); 
    //     console.log("test1: " + JSON.stringify(res.data.data));
    // });
  };

    doGetTopicsCall() {
        axios.get(baseURL+'/api/getAllTopics/tool')
        .then((res) =>{
            this.setState({combinedTopic: res.data.data});
            this.setState({isLoading: false}); 
            console.log("test1: " + JSON.stringify(res.data.data));
        });
    }

    doGetFeaturesCall(){
      axios.get(baseURL+'/api/getAllFeatures/tool')
      .then((res) =>{
          this.setState({combinedFeatures: res.data.data});
          this.setState({isLoading: false}); 
          console.log("test2: " + JSON.stringify(res.data.data));
      });
    }

    doGetLanguagesCall(){
      axios.get(baseURL+'/api/getAllLanguages/tool')
      .then((res) =>{
          this.setState({combinedLanguages: res.data.data});
          this.setState({isLoading: false}); 
          console.log("test3: " + JSON.stringify(res.data.data));
      });
  }

  doGetCategoriesCall(){
    axios.get(baseURL+'/api/getAllCategories/tool')
    .then((res) =>{
        this.setState({combinedCategories: res.data.data});
        this.setState({isLoading: false}); 
        console.log("test3: " + JSON.stringify(res.data.data));
    });
}

doGetLicensesCall(){
  axios.get(baseURL+'/api/getAllLicenses/tool')
  .then((res) =>{
      this.setState({combinedLicenses: res.data.data});
      this.setState({isLoading: false}); 
      console.log("test3: " + JSON.stringify(res.data.data));
  });
}

    render() {
        const {data, combinedTopic, combinedFeatures, combinedLanguages, combinedCategories, combinedLicenses, isLoading } = this.state;
    
        if (isLoading) {
          return <p>Loading ...</p>;
        }

        return (
            <div>
            <Header />
            <EditToolForm data={data} combinedTopic={combinedTopic} combinedFeatures={combinedFeatures} combinedLanguages={combinedLanguages} combinedCategories={combinedCategories} combinedLicenses={combinedLicenses} />
            </div>
        );
    } 
 
}

export default EditToolPage;