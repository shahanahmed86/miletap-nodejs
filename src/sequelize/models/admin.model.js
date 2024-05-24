const INDEX_FIELDS = ['email'];

/**
 * User Model
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns {import('sequelize').ModelStatic<import('sequelize').Model<any, any>>}
 */
module.exports = (sequelize, DataTypes) => {
	const Admin = sequelize.define(
		'admins',
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
			indexes: INDEX_FIELDS.map((name) => ({ fields: [{ name }] })),
			createdAt: 'created_at',
			updatedAt: 'last_updated_at'
		}
	);

	Admin.associate = (models) => {
		Admin.belongsTo(models.roles, { as: 'role', foreignKey: 'role_id' });
	};

	return Admin;
};
