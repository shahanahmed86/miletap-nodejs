const chai = require('chai');
const userDao = require('../../../src/sequelize/dao/users.dao');
const appAuthHelper = require('../../app/auth/auth.helper');
const { getUsers, getUser } = require('./users.helper');

const { expect } = chai;

const BASE_URL = '/api/v1/admin/users';

describe('Test Admin Users APIs', function () {
	before(async () => {
		await appAuthHelper.signup();
	});

	it(`getUsers ${BASE_URL} [GET]`, async () => {
		const res = await getUsers();

		expect(res.error).to.be.false;
		expect(res.statusCode).to.be.equal(200);
		expect(res.body).to.be.an('array');
	});

	it(`getUser ${BASE_URL}/:id [GET]`, async () => {
		const { body } = await getUsers();

		const res = await getUser(body[0].id);

		expect(res.error).to.be.false;
		expect(res.statusCode).to.be.equal(200);
		expect(res.body).to.be.an('object');
	});

	after(async () => {
		const { body } = await appAuthHelper.login();
		await userDao.hardDelete({ where: { id: body.user.id } });
	});
});
