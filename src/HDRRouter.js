
// /ShowObjects.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ToolPage from './pages/ToolPage';
import PersonPage from './pages/PersonPage';
import ProjectPage from './pages/ProjectPage';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import AddToolPage from './pages/AddToolPage';
import AddProjectPage from './pages/AddProjectPage';
import Account from './pages/Account';
import EditToolPage from './pages/EditToolPage';
import EditProjectPage from './pages/EditProjectPage';
import axios from 'axios';
import Loading from './pages/components/Loading'
import Container from 'react-bootstrap/Container';

var baseURL = require('./BaseURL').getURL();

class HDRRouter extends Component {

  // initialize our state
  state = {
    userState: [{
      loggedIn: false,
      role: "Reader",
      id: null,
      name: null
    }],
    isLoading: true
  };

  componentDidMount() {
    axios.defaults.withCredentials = true
    axios.get(baseURL + '/api/status')
      .then((res) => {
        this.setState({
          userState: [{
            loggedIn: true,
            role: res.data.data[0].role,
            id: res.data.data[0].id,
            name: res.data.data[0].name
          }],
          isLoading: false
        });
      }).catch((error) => {
        this.setState({
          userState: [{
            loggedIn: false,
            role: "Reader",
            id: null,
            name: null
          }],
          isLoading: false
        });
      })
  }

  render() {
    const { isLoading, userState } = this.state;

    if (isLoading) {
      return <Container><Loading /></Container>;
    }

    return (
      <Router>
        <div>
          <Switch>
            <Route path='/search' render={(props) => <SearchPage {...props} userState={userState} />} />

            <Route path='/tool/:toolID' render={(props) => <ToolPage {...props} userState={userState} />} />

            <Route path='/project/:projectID' render={(props) => <ProjectPage {...props} userState={userState} />} />

            <Route path='/person/:personID' render={(props) => <PersonPage {...props} userState={userState} />} />

            {/* Paths below require the user to be logged in */}

            {userState[0].loggedIn ? (<Route path='/account' render={(props) => <Account {...props} userState={userState} />} />)
              : (<Route path='/' render={(props) => <LandingPage {...props} userState={userState} />} />)}

            {userState[0].loggedIn ? (<Route path='/addtool' render={(props) => <AddToolPage {...props} userState={userState} />} />)
              : (<Route path='/' render={(props) => <LandingPage {...props} userState={userState} />} />)}

            {userState[0].loggedIn ? (<Route path='/addproject' render={(props) => <AddProjectPage {...props} userState={userState} />} />)
              : (<Route path='/' render={(props) => <LandingPage {...props} userState={userState} />} />)}

            {userState[0].loggedIn ? (<Route path='/edittool/:toolID' render={(props) => <EditToolPage {...props} userState={userState} />} />)
              : (<Route path='/' render={(props) => <LandingPage {...props} userState={userState} />} />)}

            {userState[0].loggedIn ? (<Route path='/editproject/:projectID' render={(props) => <EditProjectPage {...props} userState={userState} />} />)
              : (<Route path='/' render={(props) => <LandingPage {...props} userState={userState} />} />)}

            {/* Catch all path */}
            <Route path='/' render={(props) => <LandingPage {...props} userState={userState} />} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default HDRRouter;