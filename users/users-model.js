const db = require('../api/db-config');

function find() {
  return db('users');
}

function findByUsername(username) {
  return db('users').where('username', username);
}

function updateUser(id, user) {
  return db('users')
    .where('user_id', id)
    .update(user, ['user_id', 'username', 'password', 'phone']);
}

async function findId(username) {
  const data = await db('users').select('user_id').where('username', username);
  try {
    return data[0];
  } catch {
    next();
  }
}

function findById(id) {
  return db('users')
    .select('user_id', 'username', 'phone')
    .where('user_id', id)
    .first();
}

function add(user) {
  return db('users').insert(user, ['user_id', 'username', 'password', 'phone']);
}

module.exports = {
  find,
  findByUsername,
  updateUser,
  findById,
  add,
  findId,
};
