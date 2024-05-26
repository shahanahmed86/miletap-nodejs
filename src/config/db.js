const configs = require('./app');

const { username, password, database, host, port } = configs.db;

const inTest = configs.app.env === 'test';
const logging = inTest ? false : console.log;

const config = { username, password, database, host, port, dialect: 'postgres', logging };
const dbConfig = { development: config, test: config, production: config };

module.exports = dbConfig;
