const Author = require('../lib/models/author');
const Book = require('../lib/models/book');
const chance = require('chance').Chance();

module.exports = async({ authorsToCreate = 10, booksToCreate = 100 } = {}) => {

  const authorOption = ['@shakespeare', '@ramDass', '@edgarAllenPoe'];
  const authors = await Author.create([...Array(authorsToCreate)].map(() => ({
    name: chance.pickone(authorOption),
    genre: chance.sentence()
  })));

  await Book.create([...Array(booksToCreate)].map(() => ({
    authorId: chance.pickone(authors)._id,
    text: chance.sentence()
  })));
};
