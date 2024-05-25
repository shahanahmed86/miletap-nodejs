'use strict';

const ROLES = ['user', 'admin'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'roles',
			ROLES.map((name) => ({ name })),
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.deel;
		await queryInterface.bulkDelete('roles', null, {});
	},
};
