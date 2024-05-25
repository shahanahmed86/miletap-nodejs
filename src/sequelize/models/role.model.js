const { defaultOptions } = require('./helper');

const INDEX_FIELDS = ['name'];

/**
 * User Model
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns {import('sequelize').ModelStatic<import('sequelize').Model<any, any>>}
 */
module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define(
		'roles',
		{
			id: {
				allowNull: false,
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: sequelize.literal('gen_random_uuid()'),
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			last_updated_at: {
				type: DataTypes.DATE,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
		},
		{
			...defaultOptions,
			indexes: INDEX_FIELDS.map((name) => ({ fields: [{ name }] })),
		},
	);

	Role.associate = (models) => {
		Role.hasMany(models.users, { as: 'users' });
		Role.hasMany(models.admins, { as: 'admins' });
	};

	return Role;
};
