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
router.post('/', (req, res, next) => {
  const book = new Book(req.body)

  book.save()

  .then(book => res.render('books/show', { book }))
  .catch(err => {
    console.log(err)
    res.status(422).json({ err })
  })
})

// catch middleware method only works with Book.create()
// router.post('/', (req, res, next) => {
//   Book.create(req.body)
//   .then(book => res.render('books/show', { book }))
//   .catch(next)
// })


// Normal:
// router.get('/:id', (req, res) => {
//   console.log('Ln 89. get /:id...')
//   Book.findById(req.params.id, (err, book) => {
//     if (err) {
//       console.log(err)
//       res.status(500).json({ err })
//     } else {
//       res.render('books/show', { book })
//     }
//   })
// })

// Callback:
router.get('/:id', (req, res) => {
  console.log('Ln 102. get /:id...')
  Book.findById(req.params.id)
  .then(book => res.render('books/show', { book }))
  .catch(err => {
    console.log(err)
    res.status(422).json({ err })
  })
})


// Normal:
// router.get('/:id/edit', (req, res) => {
//   console.log('Ln 114. get /:id/edit...')
//   Book.findById(req.params.id, (err, book) => {
//     if (err) {
//       console.log(err)
//       res.status(500).json({ err })
//     } else {
//       res.render('books/edit', { book })
//     }
//   })
// })

// Callback: (this demonstrates pre defined responces)
router.get('/:id/edit', (req, res) => {
  console.log('Ln 114. get /:id/edit...')

  let handleResponce = book => res.render('books/edit', { book })

  let handleError = err => {
    console.log('handle error function', { err })
    res.status(422).json({ err })
  }

  Book.findById(req.params.id)
  .then(handleResponce)
  .catch(handleError)
})


// Normal:
// router.put('/:id', (req, res) => {
//   console.log('Ln 144. put /:id...')
//   const update = { ...req.body, updated: Date.now() }
//   console.log(update)
//   Book.findByIdAndUpdate(req.params.id, update, (err, book) => {
//     if (err) {
//       console.log(err)
//       res.status(500).json({ err })
//     } else {
//       res.render('books/show', { book })
//     }
//   })
// })

// Callback:
router.put('/:id', (req, res) => {
  console.log('Ln 159. put /:id...')
  const update = { ...req.body, updated: Date.now() }
  Book.findByIdAndUpdate(req.params.id, update)
  .then(book => res.render('books/show', { book }))
  .catch(err => res.status(422).json({ err }))
})


// Normal:
// router.delete('/:id', (req, res) => {
//   console.log('Ln 169. delete /:id')
//   Book.findByIdAndRemove(req.params.id, err => {
//     if (err) {
//       console.log(err)
//       res.stauts(500).json({ err })
//     } else {
//       res.redirect('/books')
//     }
//   })
// })


// Callback:
router.delete('/:id', (req, res) => {
  console.log('Ln 183. delete /:id')
  Book.findByIdAndRemove(req.params.id)
  .then(() => res.redirect('/books'))
  .catch(err => res.status(500).json({ err }))
})

module.exports = router
