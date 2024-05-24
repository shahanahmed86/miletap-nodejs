const configs = require('./app');

const { username, password, database, host, port, logging } = configs.db;

const config = { username, password, database, host, port, dialect: 'postgres', logging };
const dbConfig = { development: config, test: config, production: config };

module.exports = dbConfig;
