const chai = require('chai');
const chaiHttp = require('chai-http');
const { httpServer } = require('../../helper');
const configs = require('../../../src/config/app');

chai.use(chaiHttp);

const BASE_URL = '/api/v1/app/auth';

/** @type {import('../../../src/sequelize/dao/users.dao').UserDoc} */
const PAYLOAD = {
	email: 'test-user@yopmail.com',
	password: '123Abc456',
	first_name: 'test first name',
	last_name: 'test last name',
	phone: '+923001234567',
	birthday: '1996-03-15',
};

const signup = async (payload = PAYLOAD) => {
	return chai
		.request(httpServer)
		.post(`${BASE_URL}/signup`)
		.set('content-type', 'application/json')
		.send(payload);
};

const login = async (email = PAYLOAD.email, password = PAYLOAD.password) => {
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
	signup,
	login,
	loggedIn,
	refreshToken,
};
