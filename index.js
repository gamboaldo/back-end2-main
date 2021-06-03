require('dotenv').config();

const path = require('path');
const express = require('express');

const server = require('./api/server.js');
const { POINT_CONVERSION_UNCOMPRESSED } = require('constants');

const port = process.env.PORT;

server.use(express.static(path.join(__dirname, 'client/dist')));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

server.listen(port, () => console.log(`server up on port ${port}`));
