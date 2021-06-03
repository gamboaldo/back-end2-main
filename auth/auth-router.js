const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./index');
const bcrypt = require('bcryptjs');
const users = require('../users/users-model');

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, phone } = req.body;
    if (!username || !password) {
      return res.status(409).json({
        message: 'a username and password are required',
      });
    }
    const invalidUsername = await users.findByUsername(username);

    if (!invalidUsername) {
      return res.status(409).json({
        message: 'that username is taken',
      });
    }
    const hashedPW = await bcrypt.hashSync(password, 8);
    const newUser = await users.add({
      username,
      password: hashedPW,
      phone,
    });
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      password: newUser.password,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(409).json({
        message: 'username and password are required',
      });
    }

    const user = await users.findByUsername(username);
    if (!user) {
      return res.status(401).json({
        message: 'invalid credentials',
      });
    }

    const token = buildToken(user);
    const data = users
      .findId(username)
      .then((id) => {
        res.cookie('token', token);
        res.status(200).json({
          message: `Welcome, ${username}`,
          user_id: id.user_id,
          token: token,
        });
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
});

function buildToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    lat: Date.now(),
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: 'something went wrong in auth router',
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
