'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('admins', {
			id: {
				allowNull: false,
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: Sequelize.literal('gen_random_uuid()')
			},
			email: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			password: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			last_updated_at: {
				type: DataTypes.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		});
	},

	async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('admins');
	}
};
