class BaseDao {
	constructor(modelName) {
		/** @type {string} */
		this.modelName = modelName;
		/** @type {import('sequelize').ModelStatic<import('sequelize').Model<any, any>>} */
		this.model = models[modelName];
	}
}

module.exports = BaseDao;
