//import '/assets/App.css';
import React, {useState , useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";


// Styles
import './assets/index.css';
import './assets/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Login from './views/Login';
import Homepage from './views/Homepage';
import SignUp from './views/SignUp';
import SingleRecipe from './views/SingleRecipe';
import Favourite from './views/Favourite';
import Profile from './views/Profile';


function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route 
            exact 
            path="/"
            render={(props) => <Homepage  />}
          />
          <Route 
            path="/recipe/:id" exact
            render={(props) => <SingleRecipe {...props}/>}
          />
          <Route 
            path="/login" exact
            render={(props) => <Login {...props}/>}
          />
          <Route 
            path="/signup" exact
            render={(props) => <SignUp {...props}/>}
          />
          <Route 
            path="/profile" exact
            render={(props) => <Profile {...props}/>}
          />
          <Route
            path="/favourite" exact
            render={(props) => <Favourite {...props}/>}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
