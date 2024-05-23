const configs = require("../config/app");
const { NotFound, convertUnknownIntoError } = require("../utils/errors.util");

/**
 * notFound
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
function notFound(req, res, next) {
	const err = new NotFound('Route not found');
	next(err);
}

/**
 * errorHandler
 * @param {unknown} e 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
function errorHandler(e, req, res, next) {
	const err = convertUnknownIntoError(e);

	res.status(err.status);
	res.json({
		message: err.message,
		stack: configs.app.env === 'production' ? '🥞' : err.stack,
	});
}

module.exports = {
	notFound,
	errorHandler,
}
