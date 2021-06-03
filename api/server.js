const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const plantsRouter = require('../plants/plants-router');
const usersRouter = require('../users/users-router');
const authRouter = require('../auth/auth-router');
const restricted = require('../auth/restricted');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/users', restricted, usersRouter);
server.use('/api/plants', restricted, plantsRouter);
server.use('/api/auth', authRouter);

server.use('*', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
