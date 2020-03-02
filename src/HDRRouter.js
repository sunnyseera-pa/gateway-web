
// /ShowObjects.js
import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Route,Link,useParams} from "react-router-dom";
import ToolPage from './pages/ToolPage';
import PersonPage from './pages/PersonPage';
import ProjectPage from './pages/ProjectPage';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import AddToolPage from './pages/AddToolPage';
import AddProjectPage from './pages/AddProjectPage';
import Account from './pages/Account';
import EditToolPage from './pages/EditToolPage';
import AddReviewPage from './pages/AddReviewPage';

class HDRRouter extends Component {
  // initialize our state
  state = {
    
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    return (
      <Router>
      <div>
        
        {/* Quick links */}
        {/* <nav> 
              <Link to="/">Landing</Link>
               - 
              <Link to="/search">Search</Link>
        </nav> */}




        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/search" component={SearchPage}/>
          
          <Route path="/tool/:toolID" component={ToolPage}/>

          <Route path="/project/:projectID" component={ProjectPage}/>

          <Route path="/person/:personID" component={PersonPage}/>

          <Route path="/addtool" component={AddToolPage}/>

          <Route path="/addreview" component={AddReviewPage}/>

          <Route path="/edittool/:toolID" component={EditToolPage}/>

          <Route path="/addproject" component={AddProjectPage}/>

          <Route path="/account" component={Account}/>

          <Route path="/" component={LandingPage}/>   

        </Switch>
      </div>
    </Router>
    );
  }
}

export default HDRRouter;