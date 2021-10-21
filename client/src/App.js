//import '/assets/App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// Styles
import './assets/index.css';
import './assets/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Login from './views/Login';
import Homepage from './views/Homepage';
import SignUp from './views/SignUp';
import SingleRecipe from './views/SingleRecipe';


function App() {

  const [user, setLoginUser] = useState({})

  return (
    <>
      <Router>
        <Switch>
          <Route 
            exact 
            path="/"
            render={(props) => <Homepage setLoginUser={setLoginUser} />}
          />
            {/* {
              user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
            } */}
          <Route 
            path="/recipe/:id" exact
            render={(props) => <SingleRecipe {...props}/>}
          />
          <Route 
            path="/update/:id" exact
          >
            {
              user && user._id ? <SingleRecipe setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
            }
          </Route>
          <Route 
            path="/login" exact
            component={()=> <Login setLoginUser={setLoginUser}/>}
          />
          <Route 
            path="/signup" exact
            render={(props) => <SignUp {...props}/>}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
