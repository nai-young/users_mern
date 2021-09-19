require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const connectDB = require('./db')
const authRouter = require('../routes/auth')
const usersRouter = require('../routes/users')
const profileRouter = require('../routes/profile')
const postsRouter = require('../routes/posts')

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '..', '..', '/client/build')));
}
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-auth-token, Origin, Content-Type, Accept"
  )
  next()
});

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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

