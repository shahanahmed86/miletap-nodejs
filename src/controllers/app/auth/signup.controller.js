const { hashSync } = require('bcryptjs');
const userDao = require('../../../sequelize/dao/users.dao');
const roleDao = require('../../../sequelize/dao/roles.dao');
const { ConflictError } = require('../../../utils/errors.util');
const { SignUp } = require('../../../validations/auth.validation');
const { generateAuthTokens } = require('../../../library/jwt.library');
const { sendEmailWhenUserCreated } = require('../../../utils/logic.util');

/**
 * signup controller
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
async function signup(req, res, next) {
	const _args = { ...req.params, ...req.query, ...req.body };
	const { password, ...args } = await SignUp.parseAsync(_args);

	const exists = await userDao.findOne({ where: { email: args.email } });
	if (exists) return next(new ConflictError('User already exists!'));

	const payload = { ...args, password: hashSync(password) };
	payload.role_id = await roleDao.getRoleId('user');

	const user = await userDao.create(payload, {
		include: [{ association: 'role', required: true }],
	});

	const [accessToken, refreshToken] = generateAuthTokens({
		id: user.dataValues.id,
		email: user.dataValues.email,
		role_id: user.dataValues.role_id,
	});

	await sendEmailWhenUserCreated('A New User Registered', user.dataValues);

	res.status(200).send({ user, accessToken, refreshToken });
}

module.exports = signup;
