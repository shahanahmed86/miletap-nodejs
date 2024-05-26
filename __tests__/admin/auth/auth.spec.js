const chai = require('chai');
const { login, loggedIn, refreshToken } = require('./auth.helper');

const { expect } = chai;

const PROPS = ['user', 'accessToken', 'refreshToken'];

const BASE_URL = '/api/v1/admin/auth';

describe('Test Admin Auth APIs', function () {
	it(`admin login ${BASE_URL} [POST]`, async () => {
		const res = await login();

		expect(res.error).to.be.false;
		expect(res.statusCode).to.be.equal(200);
		expect(res.body).to.be.an('object');

		PROPS.map((prop) => expect(res.body).to.have.a.property(prop));
	});

	it(`admin loggedIn ${BASE_URL} [GET]`, async () => {
		const res = await loggedIn();

		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('object');
	});

	it(`admin refreshToken ${BASE_URL}/refresh/:refreshToken [GET]`, async () => {
		const res = await refreshToken();

		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('object');

		PROPS.map((prop) => expect(res.body).to.have.a.property(prop));
	});
});
