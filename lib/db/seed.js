const Tweet = require('../lib/models/Tweet');
const Book = require('../lib/models/Book');
const chance = require('chance').Chance();

// specifying the number of tweets to create with our seed function
module.exports = async({ authorsToCreate = 10, booksToCreate = 100 } = {}) => {
  // creating tweets
  // creating an array of tweetsToCreate length
  // map through the array
  // -> for each item in the array we create an object with { handle, text }
  // for each tweet in the mapped array we create a tweet in our mongodb
  const authors = ['@spot', '@rover', '@bingo'];
  const tweets = await Tweet.create([...Array(authorsToCreate)].map(() => ({
    handle: chance.pickone(authors),
    text: chance.sentence()
  })));

  await Book.create([...Array(booksToCreate)].map(() => ({
    tweetId: chance.pickone(tweets)._id,
    handle: chance.pickone(handles),
    text: chance.sentence()
  })));
};
