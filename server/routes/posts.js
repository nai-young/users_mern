const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const Post = require('../models/Post')
const User = require('../models/User')

// @route   GET /posts
// @desc    Get all posts
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }

})


// @route   POST /posts
// @desc    Create a post
// @access  Private

router.post('/', [
  check('text', 'Text is required.').not().isEmpty(),
], auth, async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty())
  return res.status(400).json({ errors: errors.array() })
  try {
    const user = await User.findById(req.user.id).select('-password')
    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: user.name
    })
    const post = await newPost.save()
    res.json(post)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET /posts/:post_id
// @desc    Get post by id
// @access  Private

router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id)
    res.json(post)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   DELETE /posts/:post_id
// @desc    Delete post by id
// @access  Private

// @route   PUT /posts/like/:post_id
// @desc    Like a post
// @access  Private

router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id)
  
    // Check if user already liked the post
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post already liked' })
    }
    
    // Add user id to likes array
    post.likes.unshift({ user: req.user.id })
    await post.save()
    res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   PUT /api/posts/unlike/:post_id
// @desc    Dislike a post
// @access  Private

// @route   POST /api/posts/comment/:post_id
// @desc    Add comment on a post
// @access  Private

// @route   DELETE /api/posts/comment/:post_id/:comment_id
// @desc    Delete comment
// @access  Private

module.exports = router