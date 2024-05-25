const { compareSync } = require('bcryptjs');
const adminDao = require('../../../sequelize/dao/admins.dao');
const { NotAuthenticated } = require('../../../utils/errors.util');
const { Login } = require('../../../validations/auth.validation');
const { generateAuthTokens } = require('../../../library/jwt.library');

/**
 * login Controller
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
async function login(req, res, next) {
	const _args = { ...req.params, ...req.query, ...req.body };
	const args = await Login.parseAsync(_args);

	const user = await adminDao.findOne({
		where: { email: args.email },
		include: [{ association: 'role', required: true }],
	});
	if (!user) return next(new NotAuthenticated('User not found!'));

	const isValid = compareSync(args.password, user.password);
	if (!isValid) return next(new NotAuthenticated('Password mismatched!'));

	const [accessToken, refreshToken] = generateAuthTokens({ id: user.id, email: user.email });
	res.status(200).send({ user, accessToken, refreshToken });
}

module.exports = login;
