require("dotenv").config()
const mongoose = require('mongoose')
const User = require('../models/User')
const Post = require('../models/Post')
const db = process.env.mongoUri

const connectDB = async () => {
  try {
    await mongoose.connect(db,
      { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false 
      }
    )
    console.log('==> 🌎 MongoDB Connected...')

    /* await User.deleteMany({})
    await User.insertMany(users) */
    const usersCount = await User.collection.countDocuments({})
    const postsCount = await Post.collection.countDocuments({})
    console.log(`==> 🌎 Total: ${usersCount} users & ${postsCount} posts`)
    } catch (err) {
      console.error(err.message)
      process.exit(1)
    }
}

module.exports = connectDB