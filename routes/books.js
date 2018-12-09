const router    = require('express').Router()
    , mongoose  = require('mongoose')

const Book      = require('../models/book')

// Normal:

// router.get('/', (req, res) => {
//   Book.find({}, (err, books) => {
//     if (err) {
//       console.log(err)
//       res.status(500).json({ err })
//     } else {
//       res.render('books', { books })
//     }
//   })
// })

// Callback:
router.get('/', (req, res) => {
  console.log(`${new Date().toLocaleTimeString('en-GB')}: Async: get /`)
  Book.find({})
  .exec()
  .then(books => {
      res.render('books', { books })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
})



// ========== Testing Zone ==========
router.get('/test', async (req, res, next) => {
  try {
    console.log(`${new Date().toLocaleTimeString('en-GB')}: Async: get /`)
    Book.find({})
    .exec()
    .then(books => {
      setTimeout(() => res.render('books', { books }), 10000)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err })
  }
})
// ========== Testing Zone ==========


router.get('/new', (req, res) => res.render('books/new'))

// Normal:

// router.post('/books', (req, res) => {
//   Book.create(req.body, (err, book) => {
//     if (err) {
//       console.log(err)
//       res.status(500).json({ err })
//     } else {
//       res.redirect('/books')
//     }
//   })
// })


// Callback:

router.post('/books', (req, res) => {
  const book = new Book(req.body)

  book.save()

  .then(book => res.render('books/show', { book }))
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
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
