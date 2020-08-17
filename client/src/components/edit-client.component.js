import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'

export default class EditClient extends Component{
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      lastn: '',
      email: '',
      mobileno: '',
      project: ''
    }
  }

  componentDidMount() {
    axios.get('/clients/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          lastn: res.data.lastn,
          email: res.data.email,
          mobileno: res.data.mobileno,
          project: res.data.project
        })
      })
      .catch(err => console.log(err))
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    })
  }
  onChangeLastn = (e) => {
    this.setState({
      lastn: e.target.value,
    })
  }
  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    })
  }
  onChangeMobileno = (e) => {
    this.setState({
      mobileno: e.target.value,
    })
  }
  onChangeProject = (e) => {
    this.setState({
      project: e.target.value,
    })
  }
  onSubmit = (e) => {
    e.preventDefault()

    const client = {
      name: this.state.name,
      lastn: this.state.lastn,
      email: this.state.email,
      mobileno: this.state.mobileno,
      project: this.state.project
    }

    axios.post('/clients/edit/' + this.props.match.params.id, client)
      .then(result => console.log(result.data))
      .catch(err => console.log('Error connect front to back: ' + err))

    window.location = '/' 
  }

  render() {
    return (
      <div className="edit-client">
        <h3>Edit Client</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text"
              required
              className="form-control"
              value={this.state.lastn}
              onChange={this.onChangeLastn}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Mobile No.</label>
            <input type="text"
              required
              className="form-control"
              value={this.state.mobileno}
              onChange={this.onChangeMobileno}
            />
          </div>
          <div className="form-group">
            <label>Project</label>
            <input type="text"
              required
              className="form-control"
              value={this.state.project}
              onChange={this.onChangeProject}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Save" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}