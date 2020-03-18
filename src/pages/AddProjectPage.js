import React from 'react';
import AddProjectForm from '../pages/components/AddProjectForm';
import Container from 'react-bootstrap/Container';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import Loading from './components/Loading'

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
        combinedTools:[],
        isLoading: true,
        userState: []
    };

    componentDidMount() {
        this.doGetTopicsCall();
        this.doGetCategoriesCall();
        this.doGetUsersCall();
        this.doGetToolsCall();
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
    
      doGetToolsCall(){
        axios.get(baseURL+'/api/getAllTools')
        .then((res) =>{
            this.setState({combinedTools: res.data.data});
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
        const {data, combinedTopic, combinedCategories, combinedUsers, combinedTools, isLoading, userState } = this.state;

        if (isLoading) {
            return <Loading />;
        }
        console.log(combinedTools)
        return (
            <div>
            <SearchBar doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
            <Container>
            <AddProjectForm data={data} combinedTopic={combinedTopic} combinedCategories={combinedCategories} combinedUsers={combinedUsers} combinedTools={combinedTools} userState={userState} />
            </Container>
            </div>
        );
    } 

}

export default AddProjectPage;