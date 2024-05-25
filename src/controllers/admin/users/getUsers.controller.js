const userDao = require('../../../sequelize/dao/users.dao');

/**
 * getUsers controller
 * @param {import('express').Request} _
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 * @returns {Promise<void>}
 */
async function getUsers(_, res) {
	const users = await userDao.findAll();

	res.status(200).send(users);
}

module.exports = getUsers;
