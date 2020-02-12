
// /ShowObjects.js
import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Route,Link,useParams} from "react-router-dom";
import ToolPage from './pages/ToolPage';
import PersonPage from './pages/PersonPage';
import ProjectPage from './pages/ProjectPage';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';

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
        
        
        <nav>
          <ul>
            <li>
              <Link to="/">Landing</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li></li>
            <li>
              <Link to="/tool/82673012">Tool</Link>
            </li>
            <li>
              <Link to="/tool/66792833">Tool</Link>
            </li>
            <li></li>
            <li>
              <Link to="/project/82673012">Project</Link>
            </li>
            <li>
              <Link to="/project/66792833">Project</Link>
            </li>
            <li></li>
            <li>
              <Link to="/person/82673012">Person</Link>
            </li>
            <li>
              <Link to="/person/66792833">Person</Link>
            </li>
          </ul>
        </nav>




        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/search" component={SearchPage}/>
          
          <Route path="/tool/:toolID" component={ToolPage}/>

          <Route path="/project/:projectID" component={ProjectPage}/>

          <Route path="/person/:personID" component={PersonPage}/>

          <Route path="/" component={LandingPage}/>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default HDRRouter;