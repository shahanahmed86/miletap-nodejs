const uuid = require('uuid');
const { NotAuthenticated } = require('./errors.util');

const generateId = () => uuid.v4();

/**
 * getToken
 * @param {import('express').Request} req
 * @returns {string}
 */
function getToken(req) {
	const bearerToken = req.get('Authorization');
	if (!bearerToken) throw new NotAuthenticated('Token not found!');

	const [, token] = bearerToken.split(' ');
	return token;
}

module.exports = {
	generateId,
	getToken,
};
