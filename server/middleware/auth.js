require("dotenv").config()
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.jwtSecret

module.exports = function (req, res, next) {
  // Get token
  const token = req.header('x-auth-token')

  // Check token
  if (!token) {
    return res.status(401).json({ msg: 'No token found. Authorization denied.' })
  } 
  // Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret)
    req.user = decoded
    next()
  } catch (err) {
    console.error(err.message)
    res.status(401).json({ msg: 'Token is not valid.' })
  }
}