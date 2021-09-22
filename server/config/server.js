const express = require('express')
const path = require('path')
const app = express()
const connectDB = require('./db')
const authRouter = require('../routes/auth')
const usersRouter = require('../routes/users')
const profileRouter = require('../routes/profile')
const postsRouter = require('../routes/posts')
require("dotenv").config()

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '..', '..', '/client/build')))
// Handle React routing, return all requests to React app
  /* app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  }); */
}
app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'text/html')
  res.header(
    "Access-Control-Allow-Headers",
    "x-auth-token, Origin, Content-Type, Accept"
  )
  res.header(
    'Access-Control-Allow-Origin',
    'https://frozen-crag-13522.herokuapp.com/'
  )
  next()
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// connection to database
connectDB()

// connecting routes
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/profile', profileRouter)
app.use('/posts', postsRouter)

// connection to server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`==> 🌎 Server listening on port ${port}`)
})

