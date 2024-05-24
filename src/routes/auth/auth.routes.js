const { Router } = require('express');
const { Login, SignUp } = require('../../validations/auth.validation');
const { User } = require('../../models/user.model');
const { NotAuthenticated, ConflictError } = require('../../utils/errors.util');
const { compareSync, hashSync } = require('../../library/bcrypt.library');

const router = Router();

router.post('/signup', async (req, res, next) => {
	const _args = { ...req.params, ...req.query, ...req.body };
	const { password, ...args } = await SignUp.parseAsync(_args);

	const exists = await User.findOne({ where: { email: args.email } });
	if (exists) return next(new ConflictError('User already exists!'));

	const payload = { ...args, password: hashSync(password) };
	const user = await User.create(payload);

	res.status(201).send({ user, token });
});

router
	.route('/')
	.get(checkAuth, async (req, res, next) => {
		res.status(200).send(res.locals.user);
	})
	.post(async (req, res, next) => {
		const _args = { ...req.params, ...req.query, ...req.body };
		const args = await Login.parseAsync(_args);

		const user = await User.findOne({ where: { email: args.email } });
		if (!user) return next(new NotAuthenticated('User not found!'));

		const isValid = compareSync(args.password, user.password);
		if (!isValid) return next(new NotAuthenticated('Password mismatched!'));

		res.status(200).send({ user, token });
	});

module.exports = router;

/**
 * getToken
 * @param {import('express').Request} req 
 * @returns {string}
 */
function getToken(req) {
	const bearerToken = req.get('Authorization');
	if (!bearerToken) return next(new NotAuthenticated('Token not found!'));

	const [, token] = bearerToken.split(' ');
	return token;
}

/**
 * checkAuth
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
async function checkAuth(req, res, next) {
	try {
		const now = Math.floor(Date.now() / 1000);

		const isExpired = now >= decoded.exp;
		if (isExpired) throw new NotAuthenticated('Token expired');
	
		const user = await User.findOne({ where: { id: decoded.id, email: decoded.email }});
		if (!user) throw new NotAuthenticated();
	
		res.locals.user = user;
	
		next();
	} catch (error) {
		next(error);
	}
}