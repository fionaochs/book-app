const Author = require('../lib/models/Author');
const Book = require('../lib/models/Book');
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
