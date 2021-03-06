const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  author: String
})

module.exports = mongoose.model('mongoose-promise-book', BookSchema)
