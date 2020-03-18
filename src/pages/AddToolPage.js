import React from 'react';
import AddToolForm from '../pages/components/AddToolForm';
import Container from 'react-bootstrap/Container';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import Loading from './components/Loading'

var baseURL = require('./../BaseURL').getURL();

class AddToolPage extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
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
        isLoading: true,
        userState: []
    };

    componentDidMount() {
        this.doGetTopicsCall();
        this.doGetFeaturesCall();
        this.doGetLanguagesCall();
        this.doGetCategoriesCall();
        this.doGetLicensesCall();
        this.doGetUsersCall();
    }

    doGetTopicsCall() {
     axios.get(baseURL+'/api/getAllTopics/tool')
        .then((res) =>{
            this.setState({combinedTopic: res.data.data});
            this.setState({isLoading: false}); 
        });
    }

    doGetFeaturesCall(){
        axios.get(baseURL+'/api/getAllFeatures/tool')
        .then((res) =>{
            this.setState({combinedFeatures: res.data.data});
            this.setState({isLoading: false}); 
        });
    }

    doGetLanguagesCall(){
        axios.get(baseURL+'/api/getAllLanguages/tool')
        .then((res) =>{
            this.setState({combinedLanguages: res.data.data});
            this.setState({isLoading: false}); 
        });
    }

    doGetCategoriesCall(){
        axios.get(baseURL+'/api/getAllCategories/tool')
        .then((res) =>{
            this.setState({combinedCategories: res.data.data});
            this.setState({isLoading: false}); 
        });
    }

    doGetLicensesCall(){
        axios.get(baseURL+'/api/getAllLicenses/tool')
        .then((res) =>{
            this.setState({combinedLicenses: res.data.data});
            this.setState({isLoading: false}); 
        });
      }

    doGetUsersCall(){
        axios.get(baseURL+'/api/getAllUsers')
        .then((res) =>{
            this.setState({combinedUsers: res.data.data});
            this.setState({isLoading: false}); 
        });
      }

      doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
            if (!!this.state.searchString) {
                window.location.href = window.location.search + "/search?search=" + this.state.searchString + '&type=all';
            }
        }
    }

    updateSearchString = (searchString) => {
        this.setState({ searchString: searchString });
    }

    render() {
        const {data, combinedTopic, combinedFeatures, combinedLanguages, combinedCategories, combinedLicenses, combinedUsers, isLoading, userState } = this.state;

        if (isLoading) {
            return <Loading />;
        }
        
        return (
            <div>
            <SearchBar doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
            <Container>
            <AddToolForm data={data} combinedTopic={combinedTopic} combinedFeatures={combinedFeatures} combinedLanguages={combinedLanguages} combinedCategories={combinedCategories} combinedLicenses={combinedLicenses} combinedUsers={combinedUsers} userState={userState} />
            </Container>
            </div>
        );
    } 

}

export default AddToolPage;