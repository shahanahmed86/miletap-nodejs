const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const path = require('path');
const { SIZE_LIMIT } = require('./utils/constants.util');
const swagger = require('./library/swagger.library');
const { errorHandler, notFound } = require('./middleware/error.middleware');
const routes = require('./routes');
const { NUMBER_OF_PROXY } = require('./utils/constants.util');

/**
 * @param {import('express').Express} app
 */
async function expressApp(app) {
	// parser
	app.use(express.urlencoded({ extended: true, limit: SIZE_LIMIT }));
	app.use(express.json({ limit: SIZE_LIMIT }));

	/**
	 * cors options
	 * @type {import('cors').CorsOptions}
	 */
	const corsOptions = { origin: true, credentials: true };
	app.use(cors(corsOptions));

	// compression
	app.use(compression({ level: 1 }));

	// enable proxy
	app.set('trust proxy', NUMBER_OF_PROXY);

	// logs
	app.use(morgan('dev'))

	// disable x-powered-by to avoid giving hint to hackers
	app.disable('x-powered-by');

	// healthcheck
	app.get('/healthcheck', (_req, res) => {
		res.send('I am happy and healthy');
	});

	// routings
	app.use('/api/v1', routes);

	// swagger
	swagger(app);

	// assets
	const assets = path.join(process.cwd(), 'assets');
	app.use('/assets', express.static(assets));
	app.use('/favicon.ico', (_, res) => res.sendFile(path.join(assets, 'favicon.ico')));

	// when route not found
	app.use(notFound);

	// error handler
	app.use(errorHandler);
}

module.exports = expressApp;
