const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' // Connects this schema to User.js model
  },
  lastn: {
    type: String
  },
  mobileno: {
    type: String
  },
  role: {
    type: String
  } 
})

module.exports = mongoose.model('profile', profileSchema)