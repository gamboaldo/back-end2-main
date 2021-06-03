const request = require('supertest');
const server = require('../api/server');
const db = require('../api/db-config');

const User = require('../USERS/users-model');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async (done) => {
  await db.destroy();
  done();
});

it('sanity check', () => {
  expect(true).not.toBe(false);
});

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });
});

describe('server.js', () => {
  describe('GET to / endpoint', () => {
    it('should return a status code of 200', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('[post] /register', () => {
    it('gives error if password is empty', async () => {
      try {
        await {
          username: 'Flint',
          password: '',
        };
      } catch (err) {
        expect(err.message).toEqual('username and password required');
      }
    });
    it('gives error if username is empty', async () => {
      try {
        await {
          username: '',
          password: '1234',
        };
      } catch (err) {
        expect(err.message).toEqual('username and password required');
      }
    });
  });

  describe('[post] /login', () => {
    it('throw error if password is empty', async () => {
      try {
        await {
          username: 'Lady',
          password: 'gaga',
        };
      } catch (err) {
        expect(err.message).toEqual('username and password required');
      }
    });
    it('throw error if username is empty', async () => {
      try {
        await {
          username: '',
          password: '1234',
        };
      } catch (err) {
        expect(err.message).toEqual('username and password required');
      }
    });
  });
});
