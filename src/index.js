const express = require('express');
const http = require('http');
const configs = require('./config/app');
const expressApp = require('./app');
const { unhandledOrUncaught } = require('./utils/errors.util');
const { sequelize } = require('./sequelize/models');

const { port, baseUrl } = configs.app;

const app = express();
const httpServer = http.createServer(app);

main();

async function main() {
	await sequelize.authenticate();
	await expressApp(app);

	process.on('uncaughtException', unhandledOrUncaught('uncaughtException'));
	process.on('unhandledRejection', unhandledOrUncaught('unhandledRejection'));

	httpServer.listen(port, () => console.log(`⚡️[server]: ${baseUrl}`));
}
