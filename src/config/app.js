require('dotenv/config');

const z = require('zod');

/**
 * transformStringIntoInteger
 * @param {string} arg
 * @returns {number}
 */
const transformToInteger = (arg) => parseInt(arg, 10);

const Configs = z.object({
	app: z.object({
		env: z.enum(['development', 'test', 'production']),
		protocol: z.enum(['http', 'https']),
		host: z.string(),
		port: z
			.string()
			.length(4)
			.transform((arg) => parseInt(arg, 10)),
		baseUrl: z.string().url('Invalid Base URL')
	}),
	db: z.object({
		host: z.string().min(1),
		port: z
			.string()
			.length(4)
			.transform((arg) => parseInt(arg, 10)),
		username: z.string().min(1),
		password: z.string().min(1),
		database: z.string().min(1),
		logging: z.enum(['true', 'false']).transform((arg) => (arg === 'true' ? console.log : false))
	}),
	bcrypt: z.object({
		salt: z.string().min(2).transform(transformToInteger),
		maxBytes: z.string().min(2).transform(transformToInteger)
	}),
	jwt: z.object({
		secret: z.string().min(1),
		accessToken: z.string().min(1).transform(transformToInteger),
		refreshToken: z.string().min(1).transform(transformToInteger)
	})
});

const allEnvs = {
	app: {
		env: process.env.NODE_ENV,
		protocol: process.env.APP_PROTOCOL,
		host: process.env.APP_HOST,
		port: process.env.APP_PORT,
		baseUrl: `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}`
	},
	db: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		logging: 'true'
	},
	bcrypt: {
		salt: process.env.BCRYPT_SALT,
		maxBytes: process.env.BCRYPT_MAX_BYTES
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		accessToken: process.env.ACCESS_TOKEN,
		refreshToken: process.env.REFRESH_TOKEN
	}
};

const configs = Configs.parse(allEnvs);

module.exports = configs;
