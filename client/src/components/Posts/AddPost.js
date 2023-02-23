import React, { Component } from 'react'
import axios from 'axios'

export default class AddPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const newPost = {
      text : this.state.text
    }
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
    const post = JSON.stringify(newPost)
    await axios.post('/posts/', post, { headers })
      .then(res => {
        console.log('New post created.')
      })
      .catch(err => {
        console.error(err.message)
      })
    window.location.reload()
  }
  render() {
    return (
      <div className="posts-add-container">
        <form onSubmit={e => this.handleSubmit(e)}>
          <div>
            {/* <label htmlFor="text">Write a post</label> */}
            <textarea name="text" placeholder="Create a post..." onChange={e => this.handleChange(e)} value={this.state.text}/>
          </div>
          <div>
            <input type="submit" value="Add Post"/>
          </div>
        </form>
      </div>
    )
  }
}
