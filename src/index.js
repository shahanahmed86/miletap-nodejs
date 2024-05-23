const express = require('express');
const http = require('http');
const configs = require('./config/app');
const expressApp = require('./app');
const { unhandledOrUncaught } = require('./utils/errors.util');
const { sq } = require('./config/db');
const models = require('./models');

const { port, baseUrl } = configs.app;

const app = express();
const httpServer = http.createServer(app);

main();

async function main() {
	await sq.authenticate();
	await Promise.all(models.map((model) => model.sync({ alter: true })));

	await expressApp(app);

	process.on('uncaughtException', unhandledOrUncaught('uncaughtException'));
	process.on('unhandledRejection', unhandledOrUncaught('unhandledRejection'));

	httpServer.listen(port, () => console.log(`⚡️[server]: ${baseUrl}`));
}
