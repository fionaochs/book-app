const mongoose = require('mongoose');
// const getQuote = require('../services/quote');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'authorId'
});

schema.statics.topAuthors = function() {
  return this
    .aggregate([
      {
        '$group': {
          '_id': '$author', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'count': -1
        }
      }
    ]);
};

schema.statics.mostBooks = function(count = 10) {
  return this
    .aggregate([
      {
        '$lookup': {
          'from': 'books', 
          'localField': '_id', 
          'foreignField': 'authorId', 
          'as': 'books'
        }
      }, {
        '$project': {
          '_id': true, 
          'author': true, 
          'totalBooks': {
            '$size': '$books'
          }
        }
      }, {
        '$sort': {
          'totalBooks': -1
        }
      }, {
        '$limit': count
      }
    ]);
};

module.exports = mongoose.model('Author', schema);
