import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import userImg from '../../images/avatar.png'

// Style
import "bootstrap/dist/css/bootstrap.min.css"
import '../../styles/auth.css'
import Container from 'react-bootstrap/Container'

export default class Login extends Component {
  constructor (props) {
    super (props)

    this.state = {
      email: '',
      password: ''
    }
    this.handleFormData = this.handleFormData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFormData (e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault()

    const newUser = {
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
      const res = await axios.post('/auth/', user, config)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('status', true);
      window.location = '/profile/me'
    } catch (err) {
      console.error(err.response.data)
    } 
  }
  render() {
    return (
      <Container className="login">
        <h1>Member Sign In</h1>
        <div className="avatar">
          <img src={userImg} alt="User Icon"/>
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
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
            <input type="submit" value="LOGIN" className="btn btn-primary"/>
          </div>
        </form>
        <p>
          Don't have an account? <Link to={'/register'}>Sign Up</Link>
        </p>
      </Container>
    )
  }
}
