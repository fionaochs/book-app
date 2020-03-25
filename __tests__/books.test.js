require('dotenv').config();
const { getAuthor, getBook } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('creates a book', async() => {
    const author = await getAuthor();

    return request(app)
      .post('/api/v1/books')
      .send({
        authorId: author._id,
        text: 'test'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          authorId: author._id,
          text: 'test',
          __v: 0
        });
      });
  });

  it('gets a book by id', async() => {
    const author = await getAuthor();
    const book = await getBook({ authorId: author._id });

    return request(app)
      .get(`/api/v1/books/${book._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...book,
          authorId: author
        });
      });
  });

  it('updates a book by id', async() => {
    const book = await getBook();

    return request(app)
      .patch(`/api/v1/books/${book._id}`)
      .send({ text: 'new text' })
      .then(res => {
        expect(res.body).toEqual({
          ...book,
          text: 'new text'
        });
      });
  });

  it('deletes a book by id', async() => {
    const book = await getBook();

    return request(app)
      .delete(`/api/v1/books/${book._id}`)
      .then(res => {
        expect(res.body).toEqual(book);
      });
  });

});
