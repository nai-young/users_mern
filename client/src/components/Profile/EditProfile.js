import React, { Component } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import '../../styles/edit-profile.css'
import userImg from '../../images/avatar.png'

export default class EditProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      lastn: '',
      mobileno: '',
      role: ''

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount = async () => {
    try {
      const token = localStorage.getItem('token')
      const headers = {
        'x-auth-token': token
      }
      // Get user name & email
      const resUser = await axios.get('/auth/', { headers })
      this.setState({
        name: resUser.data.name,
        email: resUser.data.email,
        password: resUser.data.password
      })

      // Get profile data
      const resProfile = await axios.get('/profile/me', { headers })
      this.setState({
        lastn: resProfile.data.lastn,
        mobileno: resProfile.data.mobileno,
        role: resProfile.data.role
      })
    } catch (err) {
      console.log(err)
    }
  }
  handleSubmit = async(e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
    try {
      const user = {
        name: this.state.name,
        email: this.state.email,
        // password: this.state.password
      }
      const profile = {
        lastn: this.state.lastn,
        mobileno: this.state.mobileno,
        role: this.state.role
      }
      const newUser = JSON.stringify(user)
      const newProfile = JSON.stringify(profile)
      await axios.post('/profile/', newProfile, { headers })
      await axios.put('/auth/', newUser, { headers })
      window.location = '/profile/me'
    } catch (err) {
      console.log(err)
    }
  }
  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div className="edit-profile-cont">
        <div>
            <img src={userImg} alt="User Profile"/>
        </div>
        <small className="form-text text-muted">Email and password not editable</small>
        <form className="form" onSubmit={e => this.handleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
            </div>
            <div className="form-group">
              <label htmlFor="lastn">Last Name</label>
              <input type="text" name="lastn" value={this.state.lastn} onChange={e => this.handleChange(e)}/>
            </div>
            <div className="form-group">
              <label htmlFor="name">Email</label>
              <input type="text" name="email" value={this.state.email} disabled onChange={e => this.handleChange(e)}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={this.state.password} disabled onChange={e => this.handleChange(e)}/>
            </div>
            <div className="form-group">
              <label htmlFor="mobileno">Mobile No.</label>
              <input type="number" name="mobileno" value={this.state.mobileno} onChange={e => this.handleChange(e)}/>
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input type="text" name="role" value={this.state.role} onChange={e => this.handleChange(e)}/>
            </div>
            <input type="submit" value="Save Profile" className="btn btn-primary"/>
        </form>
        <div>
        </div>
      </div>
    )
  }
}
