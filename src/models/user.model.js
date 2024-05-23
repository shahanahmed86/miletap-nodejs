const { sq } = require('../config/db');
const { DataTypes, Sequelize } = require('sequelize');

const INDEX_FIELDS = [
	'email',
	'first_name',
	'last_name',
	'birthday',
	'created_at',
	'last_updated_at'
];

const User = sq.define(
	'user',
	{
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
		first_name: {
			type: DataTypes.STRING(100)
		},
		last_name: {
			type: DataTypes.STRING(100)
		},
		phone: {
			type: DataTypes.STRING(16)
		},
		birthday: {
			type: DataTypes.DATEONLY
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
		},
		last_updated_at: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
		}
	},
	{
		indexes: INDEX_FIELDS.map((name) => ({ fields: [{ name }] })),
		createdAt: 'created_at',
		updatedAt: 'last_updated_at'
	}
);

module.exports = { User };
