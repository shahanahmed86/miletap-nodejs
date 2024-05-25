const jwt = require('jsonwebtoken');
const configs = require('../config/app');
const { ONE_SECOND } = require('../utils/constants.util');
const { NotAuthenticated } = require('../utils/errors.util');
const { getToken } = require('../utils/logic.util');

/**
 * @typedef {object} DecodedPayload
 * @property {string} id
 * @property {string} email
 */

/**
 * encodePayload
 * @param {DecodedPayload} payload in object
 * @param {number} expiresIn in milliseconds
 * @returns {string} returns object
 */
function encodePayload(payload, expiresIn = configs.jwt.accessToken) {
	return jwt.sign(payload, configs.jwt.secret, { expiresIn: expiresIn / ONE_SECOND });
}

/**
 * decodePayload
 * @param {string} token bearer $token
 * @returns {Promise<import('jsonwebtoken').JwtPayload & DecodedPayload>}
 */
function decodePayload(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, configs.jwt.secret, (err, decoded) => {
			if (err) reject(err);
			if (!decoded) reject(new Error('Token payload is empty'));

			resolve(decoded);
		});
	});
}

/**
 * generateAuthTokens
 * @param {{id: string}} data object
 * @returns {[string, string]}
 */
function generateAuthTokens(data) {
	const accessToken = encodePayload(data, configs.jwt.accessToken);
	const refreshToken = encodePayload(data, configs.jwt.refreshToken);

	return [accessToken, refreshToken];
}

/**
 * validateToken
 * @param {string} token
 * @returns {Promise<import('jsonwebtoken').JwtPayload & DecodedPayload>}
 */
async function validateToken(token) {
	const decoded = await decodePayload(token);
	const now = Date.now() / ONE_SECOND;

	const isExpired = now >= decoded.exp;
	if (isExpired) throw new NotAuthenticated('Token expired');

	return decoded;
}

module.exports = {
	encodePayload,
	decodePayload,
	generateAuthTokens,
	validateToken,
};
