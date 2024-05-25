const swaggerJsDoc = require('swagger-jsdoc');
const { serve, setup } = require('swagger-ui-express');
const { description, name, version } = require('../../package.json');
const configs = require('../config/app');

/**
 * swagger
 * @param {import('express').Express} app
 * @returns
 */
const swagger = (app) => {
	const [first, ...res] = name.split('');
	const appTitle = `${first.toUpperCase()}${res.join('')}`;

	/** @type {import('swagger-ui-express').SwaggerOptions} */
	const options = {
		definition: {
			openapi: '3.0.0',
			info: {
				version,
				title: appTitle,
				description,
			},
			basePath: '/',
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
					},
				},
			},
			security: [
				{
					bearerAuth: [],
				},
			],
		},
		apis: ['**/*.swagger.yml'], // files containing annotations as above
	};

	const favicon = `${configs.app.baseUrl}/assets/favicon.ico`;

	// swagger setup
	const specs = swaggerJsDoc(options);
	/** @type {import('swagger-ui-express').SwaggerUiOptions} */
	const uiOpts = {
		customCss: '.swagger-ui .topbar { display: none }',
		customSiteTitle: `${appTitle} API docs`,
		customfavIcon: favicon,
	};

	app.use('/api-docs', serve);
	app.get('/api-docs', setup(specs, uiOpts));
};

module.exports = swagger;
