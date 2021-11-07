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

  const [user, setLoginUser] = useState({});

  useEffect(() => {
    getLocalUsers();
  },[]);

  const getLocalUsers = () => {

    if(localStorage.getItem('userinfo') === null){
      setLoginUser({});
    }else{
      let users = JSON.parse(localStorage.getItem('userinfo'));

      if(users.length === 0){
        setLoginUser({});
      }else{
        setLoginUser(users);
      }
    }
  };

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
          >
          {
            user.token === undefined ? <Login /> : <Redirect to='/'/> 
          }
          </Route>
          <Route 
            path="/signup" exact
          >
          {
            user.token === undefined ? <SignUp /> : <Redirect to='/' />
          }
          </Route>
          {
            user.token === undefined ? 
              <Redirect to='/login' />
            :
            <Route 
              path="/profile" exact
              render={(props) => <Profile {...props}/>}
            />
          }
          {
            user.token === undefined ? 
              <Redirect to='/login' />
            :
            <Route
              path="/favourite" exact
              render={(props) => <Favourite {...props}/>}
            />
          }
        </Switch>
      </Router>
    </>
  );
}

export default App;
