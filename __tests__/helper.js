const http = require('http');
const express = require('express');

const app = express();

const httpServer = http.createServer(app);

module.exports = { app, httpServer };
