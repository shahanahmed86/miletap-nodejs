const { Sequelize } = require('sequelize');
const configs = require('./app');

const { host, logging, database, port, username, password } = configs.db;

const sq = new Sequelize({
	dialect: 'postgres',
	username,
	password,
	host,
	port,
	logging,
	database
});

module.exports = { sq };
