require('dotenv').config()
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.jwtSecret

// @route   POST /users
// @desc    Register user
// @access  Public

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) res.status(400).json({ errors: errors.array() })
  try {
    const { name, email, password } = req.body

    // Check user
    let user = await User.findOne({ email })
    if (user) res.status(400).json({ errors: [{ msg: 'User already exists' }] })

    // Create user object
    user = new User({
      name,
      email,
      password
    })
    // Encrypt Password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    // Save user in database
    await user.save()

    // Return token
    const payload = {
      id: user.id
    } 

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (error, token) => {
      if (error) throw error
      res.json({ token })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router