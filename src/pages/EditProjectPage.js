import React from 'react';
import axios from 'axios';
import EditProjectForm from '../pages/components/EditProjectForm';
import Container from 'react-bootstrap/Container';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading'

var baseURL = require('./../BaseURL').getURL();

class EditProjectPage extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
      }
  
      // initialize our state
    state = {
        data: [],
        combinedTopic: [],
        combinedCategories:[],
        combinedUsers:[],
        isLoading: true,
        userState: []
    };

 // on loading of tool detail page
 async componentDidMount() {

  await Promise.all([
    this.doGetTopicsCall(), 
    this.doGetCategoriesCall(),
    this.doGetUsersCall()
  ]);

   await this.getDataSearchFromDb();

  }

  getDataSearchFromDb = () => {
    //need to handle error if no id is found
    this.setState({ isLoading: true });
    axios.get(baseURL+'/api/project/'+this.props.match.params.projectID)
    .then((res) => {
      console.log('edit p p: ' + JSON.stringify(res.data.data[0]));
      this.setState({ 
        data: res.data.data[0],
        isLoading: false 
      });
    });
  };

    doGetTopicsCall() {
        axios.get(baseURL+'/api/getAllTopics/tool')
        .then((res) =>{
            this.setState({combinedTopic: res.data.data});
            console.log("test1: " + JSON.stringify(res.data.data));
        });
    }

  doGetCategoriesCall(){
    axios.get(baseURL+'/api/getAllCategories/tool')
    .then((res) =>{
        this.setState({combinedCategories: res.data.data});
        console.log("test3: " + JSON.stringify(res.data.data));
    });
}

doGetUsersCall(){
  axios.get(baseURL+'/api/getAllUsers')
  .then((res) =>{
      this.setState({combinedUsers: res.data.data});
      console.log("test7: " + JSON.stringify(res.data.data));
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
          return <Loading />;
        }

        return (
            <div>
            <SearchBar doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
            <Container>
            <EditProjectForm data={data} combinedTopic={combinedTopic} combinedCategories={combinedCategories} combinedUsers={combinedUsers} userState={userState} />
            </Container>
            </div>
        );
    } 
 
}

export default EditProjectPage;