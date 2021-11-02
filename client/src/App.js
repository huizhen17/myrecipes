//import '/assets/App.css';
import React, {useState , useEffect} from 'react';
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
import UpdateMenu from './views/UpdateMenu';
import Favourite from './views/Favourite';
import Profile from './views/Profile';


function App() {

  const [user, setLoginUser] = useState([]);

  useEffect(() => {
    getLocalUsers();
  },[]);

  const getLocalUsers = () => {
    if(localStorage.getItem('userinfo') === null){
      localStorage.setItem('userinfo',JSON.stringify([]));
    }else{
      let user = JSON.parse(localStorage.getItem('userinfo'));
      setLoginUser(user);
    }
  };


  return (
    <>
      <Router>
        <Switch>
          <Route 
            exact 
            path="/"
            render={(props) => <Homepage user={user} />}
          />
          <Route 
            path="/recipe/:id" exact
            render={(props) => <SingleRecipe {...props}/>}
          />
          <Route 
            path="/recipe/:id/edit" exact
            render={(props)=> <UpdateMenu {...props}/>}
          />
            {/* {
              user && user._id ? <UpdateMenu user={user} /> : <Login user={user}/>
            }
          </Route> */}
          <Route 
            path="/login" exact
          >
          {
            user && user._id ? <Homepage user={user}/> : <Login user={user}/>
          }
          </Route>
          <Route 
            path="/signup" exact
          >
          {
            user && user._id ? <Homepage user={user}/> : <SignUp user={user}/>
          }
          </Route>
          <Route 
            path="/profile" exact
          >
          {
            user && user._id ? <Profile user={user}/> : <Login user={user}/>
          }
          </Route>
          <Route 
            path="/favourite" exact
          >
          {
            user && user._id ? <Favourite user={user}/> : <Login user={user}/>
          }
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
