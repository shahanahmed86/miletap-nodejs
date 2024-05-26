const chai = require('chai');
const userDao = require('../../../src/sequelize/dao/users.dao');
const { login, loggedIn, refreshToken, signup } = require('./auth.helper');

const { expect } = chai;

const PROPS = ['user', 'accessToken', 'refreshToken'];

const BASE_URL = '/api/v1/app/auth';

describe('Test App Auth APIs', function () {
	it(`app signup ${BASE_URL}/signup [POST]`, async () => {
		const res = await signup();

		expect(res.error).to.be.false;
		expect(res.statusCode).to.be.equal(200);
		expect(res.body).to.be.an('object');

		PROPS.map((prop) => expect(res.body).to.have.a.property(prop));
	});

	it(`app login ${BASE_URL} [POST]`, async () => {
		const res = await login();

		expect(res.error).to.be.false;
		expect(res.statusCode).to.be.equal(200);
		expect(res.body).to.be.an('object');

		PROPS.map((prop) => expect(res.body).to.have.a.property(prop));
	});

	it(`app loggedIn ${BASE_URL} [GET]`, async () => {
		const res = await loggedIn();

		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('object');
	});

	it(`app refreshToken${BASE_URL}/refresh/:refreshToken [GET]`, async () => {
		const res = await refreshToken();

		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('object');

		PROPS.map((prop) => expect(res.body).to.have.a.property(prop));
	});

	after(async () => {
		const { body } = await login();
		await userDao.hardDelete({ where: { id: body.user.id } });
	});
});
