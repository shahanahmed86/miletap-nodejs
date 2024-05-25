const configs = require('../config/app');
const { validateToken } = require('../library/jwt.library');
const userDao = require('../sequelize/dao/users.dao');
const { NotFound, convertUnknownIntoError, NotAuthenticated } = require('../utils/errors.util');
const { getToken } = require('../utils/logic.util');

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

/**
 * checkAuth
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function checkAuth(req, res, next) {
	try {
		const token = getToken(req);
		const decoded = await validateToken(token);

		const user = await userDao.findOne({
			where: { id: decoded.id, email: decoded.email },
			include: [{ association: 'role', required: true }],
		});
		if (!user) throw new NotAuthenticated();

		res.locals.user = user;

		next();
	} catch (error) {
		next(error);
	}
}

module.exports = {
	notFound,
	errorHandler,
	checkAuth,
};
