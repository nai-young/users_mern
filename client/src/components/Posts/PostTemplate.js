import React, { Component } from 'react'
import axios from 'axios'
import '../../styles/post-template.css'
import { Link } from 'react-router-dom'
import userImg from '../../images/avatar.png'
import likeImg from '../../images/like-icon-white.png'
import calendarImg from '../../images/calendar-icon-white.png'

export default class Post extends Component {
  constructor(props) {
    super (props)
    this.state = {
      name: '',
      text: '',
      comments: [],
      likes: [],
      date: '',
      user: '',
      token: localStorage.getItem('token')
    }
    this.likePost = this.likePost.bind(this)
  }
  componentDidMount = async () => {
    const token = localStorage.getItem('token')
    const headers = {
      'x-auth-token': token
    }
    await axios.get(`/posts/${this.props.match.params.post_id}`, { headers })
      .then(post => {
        this.setState({
          name: post.data.name,
          text: post.data.text,
          comments: post.data.comments,
          likes: post.data.likes,
          date: post.data.date,
          user: post.data.user
        })
      })
      .catch(err => console.error(err.message))
  }
  likePost = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const headers = {
      'x-auth-token': token
    }
    await axios.put(`/posts/like/${this.props.match.params.post_id}`, null, { headers })
      .then(likes => {
        this.setState({
          likes: likes.data
        })
      })
      .catch(err => console.error(err.message))
  }
  render() {
    return (
      <div className="post-container">
        <div className="post-header">
          <div>
            <Link to={`/profile/${this.state.user}`} className="post-header-user">
              <img src={userImg} alt="User Profile" style={{width: '40px'}}/>
              {this.state.name}
            </Link>
          </div>
          <div>
          <p>
              <p>{this.state.date.slice(0, 10)}</p>
              <img src={calendarImg} alt="Date" />
            </p>
            <p>Comments: {this.state.comments.length}</p>
            <p>Likes: {this.state.likes.length}</p>
            <button onClick={e => this.likePost(e)}>
              <img src={likeImg} alt="" />
            </button>
          </div>
        </div>
        <div className="post-content">
          <p>{this.state.text}</p>
        </div>
      </div>
    )
  }
}
