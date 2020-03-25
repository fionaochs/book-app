const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .post('/', (req, res, next) => {
    Author
      .create(req.body)
      .then(author => res.send(author))
      .catch(next);
  })

  .get('/most-books', (req, res, next) => {
    Author
      .mostBooks()
      .then(mostBooks => res.send(mostBooks))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Author
      .findById(req.params.id)
      .populate('books')
      .then(author => res.send(author))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Author
      .find()
      .then(authors => res.send(authors))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Author
      .findByIdAndUpdate(req.params.id, { genre: req.body.genre }, { new: true })
      .then(author => res.send(author))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Author
      .findByIdAndDelete(req.params.id)
      .then(author => res.send(author))
      .catch(next);
  });
