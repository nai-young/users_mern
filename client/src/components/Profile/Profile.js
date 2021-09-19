import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReadMoreReact from 'read-more-react';
import axios from 'axios'

// Styles
import "bootstrap/dist/css/bootstrap.min.css"
import '../../styles/profile.css'

// Images
import userImg from '../../images/avatar.png'
import emailImg from '../../images/envelope-icon-white.png'
import phoneImg from '../../images/phone-icon-white.png'
import roleImg from '../../images/user-icon-white.png'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      lastn: '',
      email: '',
      mobileno: '',
      role: '',
      posts: [],
      token: localStorage.getItem('token')
    }
  }
  componentDidMount = async () => {
    const token = localStorage.getItem('token')
    const headers = {
      'x-auth-token': token
    }
    await axios.get(`/profile/${this.props.match.params.profile_id}`, { headers })
      .then(profile => {
        console.log(this.props)
        this.setState({
          lastn: profile.data.lastn,
          mobileno: profile.data.mobileno,
          role: profile.data.role
        })
      })
      .catch(err => console.error(err.message))
    await axios.get('/posts/', { headers })
      .then(posts => {
        this.setState({
          posts: posts.data
        })
      })
      .catch(err => console.error(err.message))
  }
  render() {
    return (
      <section className="profile-container">
        <aside className="profile-aside">
          <div className="profile-avatar">
            <img src={userImg} alt="User Profile"/>
          </div>
          <ul className="profile-info">
            <li><img src={roleImg} alt="Role" width="15px" style={{color: 'red'}}/> {this.state.role}</li>
            <li>{this.state.token}</li>
            <div className="profile-buttons">
              <button>Send message</button>
            </div>
          </ul>
        </aside>
        <section className="profile-content">
          <div className="profile-name">
            <p>{this.state.name} {this.state.lastn}</p>
            <p><img src={emailImg} alt="Phone number" width="15px"/> {this.state.email}</p>
            <p><img src={phoneImg} alt="Phone number" width="15px"/> {this.state.mobileno}</p>
          </div>
          <div className="profile-posts">
            <h3>Latest posts</h3>
            <ul>
              {
                this.state.posts.map(post => {
                  return(
                    <li>
                      <ReadMoreReact
                        text={post.text}
                        min={0}
                        ideal={150}
                        max={170}
                        readMoreText={false}
                      />
                      <div>
                        <Link to={'/posts/' + post._id}>Read more</Link>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </section>
      </section>
    )
  }
}
