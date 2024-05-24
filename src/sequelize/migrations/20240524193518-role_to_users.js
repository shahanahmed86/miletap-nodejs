'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('users', 'role_id', {
			allowNull: false,
			type: Sequelize.UUID,
			references: {
				model: 'roles',
				key: 'id',
			},
		});
	},

	down: async (queryInterface) => {
		await queryInterface.removeColumn('users', 'role_id');
	},
};
