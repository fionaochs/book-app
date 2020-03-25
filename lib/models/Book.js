const mongoose = require('mongoose');
// const getQuote = require('../services/quote');

const schema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Book', schema);
