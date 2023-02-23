import React, { Component } from 'react'
import axios from 'axios'
import AddPost from './AddPost'
import { Link } from 'react-router-dom'
import ReadMoreReact from 'read-more-react';
import '../../styles/posts.css'
import userImg from '../../images/avatar.png'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export default class Posts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }
  componentDidMount = async () => {
    const token = localStorage.getItem('token')
    const headers = {
      'x-auth-token': token
    }
    await axios.get('/posts/', { headers })
      .then(posts => {
        this.setState({
          posts: posts.data
        })
      })
      .catch(err => console.error(err.message))
  }
  
  render() {
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Go to profile
      </Tooltip>
    );
    return (
      <div classNameName="posts-container">
        <h1>Latest Posts</h1>
        <AddPost/>
        <div style={{padding: '1rem 0'}}>
          {
            this.state.posts.map(post => {
              return (
                <div className="posts-card">
                  {/* <div>
                      <img src="#" alt="Featured" fluid/>
                  </div> */}
                  <div className="posts-content">
                    <div className="posts-content-header">
                      <div style={{width: '30px'}}>
                        <Link to={`/profile/${post.user}`}>
                          <img src={userImg} alt="User Profile" style={{maxWidth: '100%', height: 'auto'}}/>
                        </Link>
                      </div>
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 50, hide: 400 }}
                        overlay={renderTooltip}
                      >
                        <Link to={`/profile/${this.props.match.params.profile_id}`}>{post.name}</Link>
                      </OverlayTrigger>
                    </div>
                    <ReadMoreReact
                      text={post.text}
                      min={0}
                      ideal={150}
                      max={250}
                      readMoreText={false}
                    />
                  </div>
                  <div className="posts-info">
                    <p>{post.date.slice(0, 10)}</p>
                    <p>Comments: {post.comments.length}</p>
                    <p>Likes: {post.likes.length}</p>
                    <Link to={'/posts/' + post._id}>Read more</Link>
                  </div>
                  {/* <Link href="#" className="btn btn-primary">Edit post</Link>
                  <Link href="#" className="btn btn-danger">Delete post</Link> */}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
