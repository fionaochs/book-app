const Author = require('../lib/models/author');
const Book = require('../lib/models/book');
const chance = require('chance').Chance();

module.exports = async({ authorsToCreate = 10, booksToCreate = 100 } = {}) => {

  const authorOption = ['@shakespeare', '@ramDass', '@edgarAllenPoe'];
  const authors = await Author.create([...Array(authorsToCreate)].map(() => ({
    author: chance.pickone(authorOption),
    text: chance.sentence()
  })));

  await Book.create([...Array(booksToCreate)].map(() => ({
    tweetId: chance.pickone(authors)._id,
    author: chance.pickone(authorOption),
    text: chance.sentence()
  })));
};
