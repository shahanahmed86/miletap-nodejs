const { validateToken, generateAuthTokens } = require('../../../library/jwt.library');
const adminDao = require('../../../sequelize/dao/admins.dao');
const { NotAuthenticated } = require('../../../utils/errors.util');

/**
 * refreshToken controller
 * @param {import('express').Request<{ token: string }>} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
async function refreshToken(req, res, next) {
	const { token } = req.params;

	const decoded = await validateToken(token);

	const user = await adminDao.findOne({
		where: { id: decoded.id, email: decoded.email },
		include: [{ association: 'role', required: true }],
	});
	if (!user) return next(new NotAuthenticated('User not found!'));

	const [accessToken, refreshToken] = generateAuthTokens({ id: user.id, email: user.email });
	res.status(200).send({ admin: user, accessToken, refreshToken });
}

module.exports = refreshToken;
