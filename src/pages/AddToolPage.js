import React, { Component } from 'react';
import Header from './components/Header';
import AddToolForm from '../pages/components/AddToolForm';
// import NewAddToolForm from '../pages/components/NewAddToolForm';
import SignupForm from '../pages/components/Try';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

var baseURL = require('./../BaseURL').getURL();

class AddToolPage extends React.Component {

    constructor(props) {
        super(props)
      }
  
      // initialize our state
    state = {
        data: [],
        combinedTopic:[],
        combinedFeatures:[],
        combinedLanguages:[],
        combinedCategories:[],
        combinedLicenses:[],
        combinedUsers:[],
        isLoading: true
    };

    componentDidMount() {
        this.doGetTopicsCall();
        this.doGetFeaturesCall();
        this.doGetLanguagesCall();
        this.doGetCategoriesCall();
        this.doGetLicensesCall();
        this.doGetUsersCall();
    }

    // getDataSearchFromDb = () => {
    //     //need to handle error if no id is found
    //     this.setState({ isLoading: true });
    //     axios.get(baseURL+'/api/tool/'+this.props.match.params.toolID)
    //     .then((res) => {
    //       this.setState({ 
    //         data: res.data.data[0],
    //         isLoading: false 
    //       });
    //     })
    //   };

    doGetTopicsCall() {
        // this.setState({ isLoading: true });
        // axios.get(baseURL+'/api/search?search=&type=tool')
        // .then((res) => {
        //     this.setState({ data: res.data.data });
        //     this.setState({isLoading: false}); 
        // });

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
            console.log("test4: " + JSON.stringify(res.data.data));
        });
    }

    doGetCategoriesCall(){
        axios.get(baseURL+'/api/getAllCategories/tool')
        .then((res) =>{
            this.setState({combinedCategories: res.data.data});
            this.setState({isLoading: false}); 
            console.log("test5: " + JSON.stringify(res.data.data));
        });
    }

    doGetLicensesCall(){
        axios.get(baseURL+'/api/getAllLicenses/tool')
        .then((res) =>{
            this.setState({combinedLicenses: res.data.data});
            this.setState({isLoading: false}); 
            console.log("test6: " + JSON.stringify(res.data.data));
        });
      }

    doGetUsersCall(){
        axios.get(baseURL+'/api/getAllUsers/person')
        .then((res) =>{
            this.setState({combinedUsers: res.data.data});
            this.setState({isLoading: false}); 
            console.log("test7: " + JSON.stringify(res.data.data));
        });
      }

    render() {
        const {data, combinedTopic, combinedFeatures, combinedLanguages, combinedCategories, combinedLicenses, combinedUsers, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
            <Header />
            {console.log('Users: ' + combinedUsers)}
            {console.log('Topics: ' + combinedTopic)}
            <AddToolForm data={data} combinedTopic={combinedTopic} combinedFeatures={combinedFeatures} combinedLanguages={combinedLanguages} combinedCategories={combinedCategories} combinedLicenses={combinedLicenses} combinedUsers={combinedUsers} />
            </div>
        );
    } 

}

export default AddToolPage;