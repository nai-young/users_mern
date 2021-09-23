import axios from 'axios'
import React, { Component } from 'react'

export default class AddComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
    this.handleText = this.handleText.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleText = async (e) => {
    this.setState({
      text: e.target.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    const commentObj = {
      text: this.state.text
    }
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
    try {
      const comment = JSON.stringify(commentObj)
      // await axios.post('/', comment, { headers })
      console.log(comment)
      window.location.reload()
    } catch (err) {
      console.error(err.message)
    }
  }
  render() {
    return (
      <div className="add-comment">
        <form>
          <textarea name="text" onChange={e => this.handleText(e)} placeholder="Enter text..." value={this.state.text}/>
          <input type="submit" value="Send"/>
        </form>
      </div>
    )
  }
}
