const { defaultOptions } = require('./helper');

const INDEX_FIELDS = [
	'email',
	'first_name',
	'last_name',
	'birthday',
	'created_at',
	'last_updated_at'
];

/**
 * User Model
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns {import('sequelize').ModelStatic<import('sequelize').Model<any, any>>}
 */
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'users',
		{
			id: {
				allowNull: false,
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: sequelize.literal('gen_random_uuid()')
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
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
			},
			last_updated_at: {
				type: DataTypes.DATE,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
			}
		},
		{
			...defaultOptions,
			indexes: INDEX_FIELDS.map((name) => ({ fields: [{ name }] })),
		}
	);

	User.associate = (models) => {
		User.belongsTo(models.roles, { as: 'role', foreignKey: 'role_id' });
	};

	return User;
};
