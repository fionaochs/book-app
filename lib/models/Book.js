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

// schema.pre('validate', function(next) {
//   if(this.text) return next();

//   getQuote()
//     .then(quote => this.text = quote)
//     .then(() => next());
// });

module.exports = mongoose.model('Book', schema);
