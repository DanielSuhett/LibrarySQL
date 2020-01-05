const controller = require('../controller/books.controller')
const router = require('express').Router()

router.get('/', controller.getAllBooks)
router.get('/:id', controller.getBook)
router.get('/author/:author', controller.getBooksByAuthor)

router.put('/:id', controller.updateBook)

router.delete('/:id', controller.deleteBook)

router.post('/', controller.insertBook)


module.exports = (app) => app.use('/books', router);