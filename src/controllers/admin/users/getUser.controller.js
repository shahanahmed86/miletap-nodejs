const userDao = require('../../../sequelize/dao/users.dao');
const { NotFound } = require('../../../utils/errors.util');
const { GetUser } = require('../../../validations/user.validation');

/**
 * getUser controller
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
async function getUser(req, res, next) {
	const _args = { ...req.params, ...req.query, ...req.body };
	const args = await GetUser.parseAsync(_args);

	const user = await userDao.findOne({ where: { id: args.id } });
	if (!user) return next(new NotFound('User not found!'));

	res.status(200).send(user);
}

module.exports = getUser;
