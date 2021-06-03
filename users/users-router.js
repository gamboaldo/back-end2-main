const router = require('express').Router();
const bcrypt = require('bcryptjs');
const restricted = require('../auth/restricted');
const Users = require('./users-model');

const { checkUserId } = require('./users-middleware');

// get all the users by ID
router.get('/:id', restricted, checkUserId, (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ message: 'something went wrong in the router' });
    });
});

// user can update password and phone number
router.put('/:id', restricted, checkUserId, (req, res, next) => {
  const credentials = req.body;

  if (!credentials.password || !credentials.phone) {
    res
      .status(400)
      .json({ message: 'username, password, and phone number are  required' });
  } else {
    const hash = bcrypt.hashSync(credentials.password, 8);
    credentials.password = hash;

    Users.updateUser(req.params.id, credentials)
      .then(() => {
        res.status(200).json('Succesfully Updated');
      })
      .catch(next);
  }
});

router.use((err, req, res, next) /*eslint-disable-line*/ => {
  res.status(500).json({
    customMessage: 'Something went wrong in user router',
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
