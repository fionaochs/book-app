require('dotenv').config();
require('./lib/utils/connect')();

const seedData = require('./db/seed');

seedData({ tweetsToCreate: 100, commentsToCreate: 1000 })
  .then(() => console.log('done'));
