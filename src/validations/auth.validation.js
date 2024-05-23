const z = require('zod');
const { BadRequest } = require('../utils/errors.util');
const { commonErrors } = require('./helper.validation');
const { PASSWORD_REGEX, PHONE_REGEX } = require('../utils/constants.util');
const configs = require('../config/app');

const { maxBytes } = configs.bcrypt;

const Email = z.string(commonErrors('Email')).email(new BadRequest('Email is not valid'));

const Password = z
	.string(commonErrors('Password'))
	.trim()
	.max(maxBytes, new BadRequest(`Password length cannot exceed from ${maxBytes.toString()}!`))
	.regex(
		PASSWORD_REGEX,
		new BadRequest('Password must contain at least one uppercase/lowercase/digit!')
	);

const Login = z.object({ email: Email, password: z.string(commonErrors('Password')) }).required();

const SignUp = Login.extend({
	password: Password,
	first_name: z.string(commonErrors('First Name')).optional(),
	last_name: z.string(commonErrors('Last Name')).optional(),
	phone: z
		.string(commonErrors('Phone'))
		.regex(PHONE_REGEX, new BadRequest('Phone number must have 10 digits!'))
		.optional(),
	birthday: z.string(commonErrors('BirthDay')).pipe(z.coerce.date()).optional()
});

module.exports = { Login, SignUp };
