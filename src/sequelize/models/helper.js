/** @type {import('sequelize').ModelOptions} */
const defaultOptions = {
	createdAt: 'created_at',
	updatedAt: 'last_updated_at',
	underscored: true,
	timestamps: false,
	freezeTableName: true,
};

module.exports = { defaultOptions };
