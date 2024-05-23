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
		logging: z.boolean()
	}),
	bcrypt: z.object({
		salt: z.string().min(2).transform(transformToInteger),
		maxBytes: z.string().min(2).transform(transformToInteger),
	}),
	firebase: z.object({
		type: z.string().min(1, 'Required').describe('Firebase Type'),
		projectId: z.string().min(1, 'Required').describe('Firebase Project ID'),
		privateKeyId: z.string().min(1, 'Required').describe('Firebase Private Key ID'),
		privateKey: z
			.string()
			.min(1, 'Required')
			.describe('Firebase Private Key')
			.transform((arg) => arg.replace(/\\n/g, '\n')),
		clientEmail: z.string().min(1, 'Required').describe('Firebase Client Email'),
		clientId: z
			.string()
			.min(1, 'Required')
			.transform(transformToInteger)
			.describe('Firebase Client ID'),
		authUri: z.string().min(1, 'Required').describe('Firebase Auth URI'),
		tokenUri: z.string().min(1, 'Required').describe('Firebase Token URI'),
		authProviderX509CertUrl: z
			.string()
			.min(1, 'Required')
			.describe('Firebase Auth provider x509 cert URL'),
		clientX509CertUrl: z.string().min(1, 'Required').describe('Firebase Client x509 cert URL'),
		universeDomain: z.string().min(1, 'Required').describe('Firebase Universe Domain'),
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
		logging: true
	},
	bcrypt: {
		salt: process.env.BCRYPT_SALT,
		maxBytes: process.env.BCRYPT_MAX_BYTES,
	},
	firebase: {
		type: process.env.FIREBASE_TYPE,
		projectId: process.env.FIREBASE_PROJECT_ID,
		privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
		privateKey: process.env.FIREBASE_PRIVATE_KEY,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		clientId: process.env.FIREBASE_CLIENT_ID,
		authUri: process.env.FIREBASE_AUTH_URI,
		tokenUri: process.env.FIREBASE_TOKEN_URI,
		authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
		clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
		universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
		apiKey: process.env.FIREBASE_API_KEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.FIREBASE_APP_ID,
	}
};

const configs = Configs.parse(allEnvs);

module.exports = configs;
