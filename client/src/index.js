import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Styles
import './assets/index.css';
import './assets/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import App from './App';

import reportWebVitals from './reportWebVitals';
import SingleRecipe from './views/SingleRecipe';
import Login from './views/Login';
import SignUp from './views/SignUp';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route 
        path="/" exact
        render={(props) => <App {...props}/>}
      />
      <Route 
        path="/recipe/:id" exact
        render={(props) => <SingleRecipe {...props}/>}
      />
      <Route 
        path="/update/:id" exact
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
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
