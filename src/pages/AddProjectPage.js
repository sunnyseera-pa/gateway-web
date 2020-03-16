import React from 'react';
import AddProjectForm from '../pages/components/AddProjectForm';
import Container from 'react-bootstrap/Container';
import SearchBar from './components/SearchBar';
import axios from 'axios';

var baseURL = require('./../BaseURL').getURL();

class AddProjectPage extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
      }
  
      // initialize our state
    state = {
        data: [],
        combinedTopic:[],
        combinedCategories:[],
        combinedUsers:[],
        isLoading: true,
        userState: []
    };

    componentDidMount() {
        this.doGetTopicsCall();
        this.doGetCategoriesCall();
        this.doGetUsersCall();
    }

    doGetTopicsCall() {
     axios.get(baseURL+'/api/getAllTopics/project')
        .then((res) =>{
            this.setState({combinedTopic: res.data.data});
            this.setState({isLoading: false}); 
        });
    }


    doGetCategoriesCall(){
        axios.get(baseURL+'/api/getAllCategories/project')
        .then((res) =>{
            this.setState({combinedCategories: res.data.data});
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
        const {data, combinedTopic, combinedCategories, combinedUsers, isLoading, userState } = this.state;

        if (isLoading) {
            return <p>Loading ...</p>;
        }
        
        return (
            <div>
            <SearchBar doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
            <Container>
            <AddProjectForm data={data} combinedTopic={combinedTopic} combinedCategories={combinedCategories} combinedUsers={combinedUsers} userState={userState} />
            </Container>
            </div>
        );
    } 

}

export default AddProjectPage;