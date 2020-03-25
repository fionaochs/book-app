const mongoose = require('mongoose');

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
module.exports = mongoose.model('Book', schema);
