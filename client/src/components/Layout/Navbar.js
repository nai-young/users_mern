import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: false
    }
  }
  logOut () {
    localStorage.removeItem('token')
    window.location = '/'
  }

  render() {
    return (
      <nav className="main-navbar">
        <ul className="main-navbar-ul">
          { !(localStorage.getItem('token')) ? <li className="navbar-item"><Link to="/" className="nav-link">Home</Link></li> : undefined }
          { !(localStorage.getItem('token')) ? <li className="navbar-item"><Link to="/register" className="nav-link">Register</Link></li> : undefined }
          {(localStorage.getItem('token')) ? <li className="navbar-item"><Link to="/posts" className="nav-link">Posts</Link></li> : undefined }
          { (localStorage.getItem('token')) ? <li className="navbar-item"><Link to="/profile/me" className="nav-link">Profile</Link></li> : undefined }
          {(!localStorage.getItem('token')) ? <li className="navbar-item"><Link to="/login" className="nav-link">Login</Link></li> : <li className="navbar-item"><Link to="/" className="nav-link" onClick={this.logOut}>Logout</Link></li>}
        </ul>
      </nav>
    )
  }
}