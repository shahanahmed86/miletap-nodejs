const { NotFound } = require('../../utils/errors.util');
const BaseDao = require('./base.dao');

/**
 * @typedef {object} RoleDoc
 * @property {string} name
 *
 * @typedef {import('./base.dao').BaseDoc | RoleDoc} Document
 *
 * @typedef {import('sequelize').Model<Document, any>} Model
 * @typedef {import('sequelize').ModelStatic<Model>} ModelStatic
 * @typedef {import('sequelize').FindOptions<Document>} FindOptions
 * @typedef {import('sequelize').CreateOptions<Document>} CreateOptions
 */

/** @extends BaseDao<RoleDoc> */
class RoleDao extends BaseDao {
	constructor() {
		super('roles');
	}

	/**
	 * getRoleId
	 * @param {'user'|'admin'} name
	 * @returns {Promise<string>} returns UUID of the role
	 */
	async getRoleId(name) {
		const role = await this.findOne({ where: { name } });

		if (!role) throw new NotFound('Role not found!');

		return role.toJSON().id;
	}
}

module.exports = new RoleDao();
