const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
  name: {
    type: String
  },
  lastn: {
    type: String
  },
  email: {
    type: String
  },
  mobileno: {
    type: String
  },
  project: {
    type: String
  } 
})

module.exports = mongoose.model('Client', clientSchema)