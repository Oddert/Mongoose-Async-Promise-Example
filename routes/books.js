const router    = require('express').Router()
    , mongoose  = require('mongoose')

const Book      = require('../models/book')

router.get('/', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      console.log(err)
      res.status(500).json({ err })
    } else {
      res.render('books', { books })
    }
  })
})


router.get('/new', (req, res) => res.render('books/new'))

router.post('/books', (req, res) => {
  Book.create(req.body, (err, book) => {
    if (err) {
      console.log(err)
      res.status(500).json({ err })
    } else {
      res.redirect('/books')
    }
  })
})


router.get('/:id', (req, res) => {
  console.log('Ln 48. get /:id...')
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      console.log(err)
      res.status(500).json({ err })
    } else {
      res.render('books/show', { book })
    }
  })
})


router.get('/:id/edit', (req, res) => {
  console.log('Ln 61. get /:id/edit...')
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      console.log(err)
      res.status(500).json({ err })
    } else {
      res.render('books/edit', { book })
    }
  })
})

router.put('/:id', (req, res) => {
  console.log('Ln 72. put /:id...')
  const update = { ...req.body, updated: Date.now() }
  console.log(update)
  Book.findByIdAndUpdate(req.params.id, update, (err, book) => {
    if (err) {
      console.log(err)
      res.status(500).json({ err })
    } else {
      res.render('books/show', { book })
    }
  })
})



router.delete('/:id', (req, res) => {
  console.log('Ln 87. delete /:id')
  Book.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err)
      res.stuauts(500).json({ err })
    } else {
      res.redirect('/books')
    }
  })
})

module.exports = router
