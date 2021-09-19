import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReadMoreReact from 'read-more-react';

// Style
import "bootstrap/dist/css/bootstrap.min.css"
import '../../styles/profileme.css'

// Images
import userImg from '../../images/avatar.png'
import emailImg from '../../images/envelope-icon-white.png'
import phoneImg from '../../images/phone-icon-white.png'
import roleImg from '../../images/user-icon-white.png'
// import tokenImg from '../../images/token-icon-white.png'

export default class ProfileMe extends Component {
  constructor(props) {
    super (props)
    this.state = {
      name: '',
      lastn: '',
      email: '',
      mobileno: '',
      role: '',
      posts: [],
      token: localStorage.getItem('token')
    }
    this.deleteProfile = this.deleteProfile.bind(this)
  }
  componentDidMount = async () => {
    const headers = {
      'x-auth-token': this.state.token
    }
    await axios.get('/auth/', { headers })
      .then(res => {
        this.setState({
        name: res.data.name,
        email: res.data.email
        })
      })
      .catch(err => console.error(err.message))
    await axios.get('/profile/me', { headers })
      .then(res => {
        this.setState({
        lastn: res.data.lastn,
        mobileno:res.data.mobileno,
        role: res.data.role
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
  deleteProfile = async () => {
    const headers = {
      'x-auth-token': this.state.token
    }
    try {
      await axios.delete('/profile/', { headers })
      localStorage.removeItem('token')
      window.location = '/'
    } catch (err) {
      console.error(err.message)
    }
  }
  render() {
    
    return (
      <section className="profileme-container">
        <aside className="profileme-aside">
          <div className="profileme-avatar">
            <img src={userImg} alt="User Profile"/>
          </div>
          <ul className="profileme-info">
            <li><img src={roleImg} alt="Role" width="15px" style={{color: 'red'}}/> {this.state.role}</li>
            <li>{this.state.token}</li>
            <div className="profileme-buttons">
              <Link to="/edit-profile">Edit Profile</Link>
              <button onClick={this.deleteProfile}>Delete Profile</button>
            </div>
          </ul>
        </aside>
        <section className="profileme-content">
          <div className="profileme-name">
            <p>{this.state.name} {this.state.lastn}</p>
            <p><img src={emailImg} alt="Phone number" width="15px"/> {this.state.email}</p>
            <p><img src={phoneImg} alt="Phone number" width="15px"/> {this.state.mobileno}</p>
          </div>
          <div className="profileme-posts">
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
