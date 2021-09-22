require('dotenv').config()
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const jwtSecret = process.env.jwtSecret
const Cookies = require('js-cookie')

// @route   GET /auth
// @desc    GET current auth user 
// @access  Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET /auth/users
// @desc    GET all auth user 
// @access  Private

router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find().select('-Password')
    res.json(users)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }

})

// @route   POST /auth
// @desc    Authenticate user & get token - Login
// @access  Public

router.post('/', [
  check('email', 'Please include a valid email.').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    // Check email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email.' })
    }

    // Compare passwords
    const isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword) {
      return res.status(400).json({ msg: 'Invalid password.' })
    }
    
    // Return token
    const payload = {
      id: user.id
    }
    jwt.sign(payload, jwtSecret,  { expiresIn: 360000 }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server error.'})
  }
})

// @route   PUT /auth
// @desc    Update user (name, email & password)
// @access  Private

router.put('/', [
  // check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
] , auth, async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { name, email } = req.body

  const newUser = {}
  newUser.user = req.user.id
  if (name) newUser.name = name
  if (email) newUser.email = email
  // if (password) newUser.password = password

  let user = await User.findById(req.user.id)
  try {
    if (!user) {
      return res.status(500).json({ msg: 'Error: User not found.'})
    } 
    user = await User.findByIdAndUpdate(req.user.id, newUser, {new: true})
    await user.save()
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server error.'})
  }
})

module.exports = router

