import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from './components/navbar.component'
import CreateClient from './components/create-client.component'
import ListClients from './components/list-clients.component'
import EditClient from './components/edit-client.component'

function App() {
  return (
    <Router>
        <Navbar/>
        <br/>
        <div className="main-container">
          <Route exact path="/" component={ListClients}/>
          <Route exact path="/" component={CreateClient}/>
          <Route exact path="/edit/:id" component={EditClient}/>
        </div>
    </Router>
  );
}

export default App;
