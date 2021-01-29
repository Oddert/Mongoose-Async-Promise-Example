# Mongoose Async Promise Samples

A simple CRUD app demonstrating various diffirent ways of writing Monggose queries and handling errors.

Bit of a missnomer given that only some of them deal with async very briefly but whatever.

## Live Demo
[https://low-reflective-roof.glitch.me/](https://low-reflective-roof.glitch.me/)

## Installation
```
$ git clone https://github.com/Oddert/Mongoose-Async-Promise-Example.git
$ cd Mongoose-Async-Promise-Example
$ npm i
$ npm start
```

## Scripts
| script | command                                        | action
|--------|------------------------------------------------|------------------------------------------------|
| start  | node app.js                                    | runs the server                                |
| dev | nodemon app.js                                 | runs the server with auto restart              |

# Routes
| Route  | Mathod | Params | Body | Returns
|--------|--------|--------|------|---------|
| / | GET |  |  | A basic html page to interact with the API |
| /books | GET |  |  | Renders all books
| /books/test | GET |  |  | Uses try/catch to render all books
| /books/new | GET |  |  | Renders the new book form
| /books | POST |  | all attributes needed for a new book (see models/Book) | Creates a new book and renders it with promise chaining and `new Book().save()` syntax
| /books/:id | GET | id {String}: the specific Mongo ID of a book to show |  | Renders a specific book using promise chaining
| /books/:id/edit | GET | id {String}: the specific Mongo ID of a book to show |  | finds a single book and renders the edit page. uses seperately defined callback functions passed into a promise chain
| /books/:id | PUT | id {String}: the specific Mongo ID of a book to edit | all attributes to edit (see models/Book) | edits the specific book and renders it
| /books/:id | DELETE | id {String}: the specific Mongo ID of a book to delete | | Deletes a specific book and redirects to /books