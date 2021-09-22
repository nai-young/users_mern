import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Style
import "bootstrap/dist/css/bootstrap.min.css"
import Container from 'react-bootstrap/Container'

export default class Register extends Component {
  constructor(props) {
    super (props)
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
    this.handleFormData = this.handleFormData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFormData (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    if (this.state.password !== this.state.password2) {
      console.log('Passwords not match')
    }
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const user = JSON.stringify(newUser)
      await axios.post('/users/', user, config)
      window.location = '/'
    } catch (err) {
      console.error(err)
    }  
  }
  render() {
    return (
      <Container className="register">
        <h1>Member Sign Up</h1>
        <p>Create Your User Account</p>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <input 
              type="text"
              required
              className="form-control name"
              name="name"
              value={this.state.name}
              onChange={e => this.handleFormData(e)}
            />
            <label htmlFor="name" className="label">Name</label>
          </div>
          <div className="form-group">
            <input 
              type="email"
              required 
              className="form-control email" 
              name="email" 
              value={this.state.email} 
              onChange={e => this.handleFormData(e)} 
            />
            <label htmlFor="email" className="label">Email</label>
            <small id="emailHelp">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <input 
              type="password" 
              required 
              className="form-control password" 
              name="password"
              value={this.state.password}
              onChange={e => this.handleFormData(e)} 
              minLength="6"
            />
            <label htmlFor="password" className="label">Password</label>
          </div>
          <div className="form-group">
            <input 
              type="password" 
              required 
              className="form-control password" 
              name="password2"
              value={this.state.password2}
              onChange={e => this.handleFormData(e)} 
              minLength="6"
            />
            <label htmlFor="password2" className="label">Confirm Password</label>
          </div>
          <div className="form-group">
            <input type="submit" value="REGISTER" className="btn btn-primary"/>
          </div>
        </form>
        <p className="my-1">
          Already have an account? <Link to={'/login'}>Sign In</Link>
        </p>
      </Container>
    )
  }
}
