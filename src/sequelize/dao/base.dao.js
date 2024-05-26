const models = require('../models');

/**
 * @typedef {object} BaseDoc
 * @property {string} id
 * @property {Date|string} created_at
 * @property {Date|string} last_updated_at
 */

/** @template TDoc */
class BaseDao {
	/**
	 * @typedef {import('sequelize').Model<TDoc | BaseDoc, any>} Model
	 * @typedef {import('sequelize').ModelStatic<Model>} ModelStatic
	 * @typedef {import('sequelize').FindOptions<TDoc | BaseDoc>} FindOptions
	 * @typedef {import('sequelize').CreateOptions<TDoc | BaseDoc>} CreateOptions
	 */

	/**
	 * constructor
	 * @param {string} modelName
	 * @param {ModelStatic} model
	 */
	constructor(modelName) {
		/** @type {string} */
		this.modelName = modelName;

		/** @type {ModelStatic} */
		this.model = models[modelName];
	}

	/**
	 * findOne
	 * @param {FindOptions} filter
	 * @returns {Promise<Model | null>} returns found object or null
	 */
	async findOne(filter) {
		return this.model.findOne(filter);
	}

	/**
	 * findAll
	 * @param {FindOptions} filter
	 * @returns {Promise<Model[]>} returns found object or null
	 */
	async findAll(filter) {
		return this.model.findAll(filter);
	}

	/**
	 * create
	 * @param {TDoc | BaseDoc} payload
	 * @param {CreateOptions} options
	 */
	async create(payload, options) {
		return this.model.create(payload, options);
	}

	/**
	 * hardDelete
	 * @param {FindOptions} filter
	 * @returns {Promise<number>} returns found object or null
	 */
	async hardDelete(filter) {
		const status = await this.model.destroy(filter);
		return !!status;
	}
}

module.exports = BaseDao;
