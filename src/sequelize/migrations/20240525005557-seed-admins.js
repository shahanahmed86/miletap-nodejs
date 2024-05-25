'use strict';

const configs = require('../../config/app');
const { hashSync } = require('../../library/bcrypt.library');

const ROLES = ['user', 'admin'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const [[{ id: role_id }]] = await queryInterface.sequelize.query(
			`select id from roles where name = 'admin'`,
		);

		const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

		await queryInterface.bulkInsert('admins', [
			{ email: ADMIN_EMAIL, password: hashSync(ADMIN_PASSWORD), role_id },
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.deel;
		await queryInterface.bulkDelete('admins', null, {});
	},
};
