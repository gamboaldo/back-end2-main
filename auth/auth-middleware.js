const User = require('../users/users-model');
//
const checkUsernameAvailable = async (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.phone) {
    next();
  } else {
    const { username } = req.body;
    const userExists = await User.findByUsername(username);
    if (userExists.length > 0) {
      res.status(401).json({ message: 'this username is already in use' });
    } else {
      next();
    }
  }
};

const checkUsernameExists = async (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.phone) {
    next();
  } else {
    const { username } = req.body;
    const userExists = await User.findByUsername(username);
    if (!userExists) {
      res.status(401).json({ message: 'invalid credentials' });
    } else {
      next();
    }
  }
};

module.exports = {
  checkUsernameAvailable,
  checkUsernameExists,
};
