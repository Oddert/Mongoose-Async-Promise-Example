const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , path = require('path')
    , mongoose = require('mongoose')
    , methodOverride = require('method-override')

const Book = require('./models/book')

const seed = require('./seed')

require('dotenv').config()

mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE)

app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => res.send('<a href="/books">Books</a> <a href="/books/test">/books/test</a>'))

app.use('/books', require('./routes/books'))


app.get('/seed', (req, res) => {
  seed()
  setTimeout(() => res.redirect('/books'), 3000)
})


app.use(function (err, req, res, next) {
  console.log('ln 23')
  console.log({ err, next })
  return res.json({ oh: 'no', err })
})

const PORT = process.env.PORT || 3000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Server initilising on PORT ${PORT}`
  )
)
