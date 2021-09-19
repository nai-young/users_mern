
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Style
import '../styles/app.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Container from 'react-bootstrap/Container'

// Components
import Navbar from '../components/Layout/Navbar'
import Register from './Auth/Register'
import Login from './Auth/Login'
import ProfileMe from './Profile/ProfileMe'
import EditProfile from './Profile/EditProfile'
import Posts from './Posts/Posts';
import PostTemplate from './Posts/PostTemplate';
import Profile from './Profile/Profile'

function App() {
  return (
    <Router>
        { !(localStorage.getItem('token')) ? undefined : <Navbar/> }
        <section className="app">
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/profile/me" component={ProfileMe}/>
            <Route exact path="/profile/:profile_id" component={Profile}/>
            <Route exact path="/edit-profile" component={EditProfile}/>
            <Route exact path="/posts" component={Posts}/>
            <Route exact path="/posts/:post_id" component={PostTemplate}/>
          </Switch>
        </section>
    </Router>
  );
}

export default App;
