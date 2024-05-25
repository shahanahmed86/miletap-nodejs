const BaseDao = require('./base.dao');

/**
 * @typedef {object} AdminDoc
 * @property {string} email
 * @property {string} password
 * @property {?string} role_id
 * 
 * @typedef {import('./base.dao').BaseDoc | AdminDoc} Document
 * 
 * @typedef {import('sequelize').Model<Document, any>} Model
 * @typedef {import('sequelize').ModelStatic<Model>} ModelStatic
 * @typedef {import('sequelize').FindOptions<Document>} FindOptions
 * @typedef {import('sequelize').CreateOptions<Document>} CreateOptions
 */

/** @extends BaseDao<AdminDoc> */
class AdminDao extends BaseDao {
	constructor() {
		super('admins');
	}
}

module.exports = new AdminDao();
