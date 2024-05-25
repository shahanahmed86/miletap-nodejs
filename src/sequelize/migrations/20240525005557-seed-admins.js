'use strict';

const ROLES = ['user', 'admin'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const [[{ id: role_id }]] = await queryInterface.sequelize.query(
			`select id from roles where name = 'admin'`,
		);
		await queryInterface.bulkInsert('admins', [
			{ email: 'shahan.khaan@gmail.com', password: '123Abc456', role_id },
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.deel;
		await queryInterface.bulkDelete('admins', null, {});
	},
};
