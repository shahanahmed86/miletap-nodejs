const chai = require('chai');
const chaiHttp = require('chai-http');
const { httpServer } = require('../../helper');
const configs = require('../../../src/config/app');

chai.use(chaiHttp);

const { admin } = configs;

const BASE_URL = '/api/v1/admin/auth';

const login = async (email = admin.email, password = admin.password) => {
	return chai
		.request(httpServer)
		.post(BASE_URL)
		.set('content-type', 'application/json')
		.send({ email, password });
};

const loggedIn = async () => {
	const { body } = await login();

	return chai
		.request(httpServer)
		.get(BASE_URL)
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${body.accessToken}`);
};

const refreshToken = async () => {
	const { body } = await login();

	return chai
		.request(httpServer)
		.get(`${BASE_URL}/refresh/${body.refreshToken}`)
		.set('content-type', 'application/json');
};

module.exports = {
	login,
	loggedIn,
	refreshToken,
};
