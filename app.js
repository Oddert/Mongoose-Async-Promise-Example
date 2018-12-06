const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , path = require('path')
    , mongoose = require('mongoose')

const Book = require('./models/book')

require('dotenv').config()

mongoose.connect(process.env.DATABASE)

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => res.send('<a href="/books">Books</a>'))

app.get('/books', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      console.log(err)
      res.status(500).json({ err })
    } else {
      res.render('books', { books })
    }
  })
})

app.get('/books/new', (req, res) => res.render('books/new'))

app.post('/books', (req, res) => {
  Book.create(req.body, (err, book) => {
    if (err) {
      console.log(err)
      res.status(500).json({ err })
    } else {
      res.redirect('/books')
    }
  })
})

app.get('/books/:id', (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      console.log(err)
      res.status(500).json({ err })
    } else {
      res.render('books/show', { book })
    }
  })
})

const PORT = process.env.PORT || 3000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Server initilising on PORT ${PORT}`
  )
)
