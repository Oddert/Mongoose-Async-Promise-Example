function seed() {
  const mongoose = require('mongoose')

  const Book = require('./models/book')

  require('dotenv').config()

  mongoose.connect(process.env.DATABASE)

  const seedBooks = [
    { name: 'Design for the Real World', description: 'Human Ecology and Social Change', author: 'Victor Papanek' }
  , { name: '1000 Years of non linear history', author: 'Manuel DeLanda' }
  , { name: 'Thinking Objects', description: 'Contemporary Approaches to Product Design', author: 'Tim Parsons' }
  ]

  Book.remove({}, err => {
    if (err) console.log(err)
    else console.log('All previous books removed')
  })

  seedBooks.forEach((each, idx) => {
    Book.create(each, (err, book) => {
      if (err) console.log(err)
      else console.log(`Book ${idx} added...`)
    })
  })
}

module.exports = seed
