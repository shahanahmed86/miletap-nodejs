const chai = require('chai');
const chaiHttp = require('chai-http');
const { httpServer } = require('../../helper');
const authHelper = require('../auth/auth.helper');
const configs = require('../../../src/config/app');

chai.use(chaiHttp);

const { admin } = configs;

const BASE_URL = '/api/v1/admin/users';

/**
 * getAccessToken
 * @returns {Promise<string>}
 */
const getAccessToken = async () => {
	const { body } = await authHelper.login();
	return body.accessToken;
};

/**
 * getUsers
 */
const getUsers = async () => {
	const accessToken = await getAccessToken();
	return chai
		.request(httpServer)
		.get(BASE_URL)
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${accessToken}`);
};

/**
 * getUser
 * @param {string} id
 */
const getUser = async (id) => {
	const accessToken = await getAccessToken();
	return chai
		.request(httpServer)
		.get(`${BASE_URL}/${id}`)
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${accessToken}`);
};

module.exports = {
	getUsers,
	getUser,
};
