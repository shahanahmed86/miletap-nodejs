const BaseDao = require('./base.dao');

/**
 * @typedef {object} UserDoc
 * @property {string} email
 * @property {string} password
 * @property {?string} first_name
 * @property {?string} last_name
 * @property {?string} phone
 * @property {?string} birthday
 * @property {string} role_id
 * 
 * @typedef {import('./base.dao').BaseDoc | UserDoc} Document
 *
 * @typedef {import('sequelize').Model<Document, any>} Model
 * @typedef {import('sequelize').ModelStatic<Model>} ModelStatic
 * @typedef {import('sequelize').FindOptions<Document>} FindOptions
 * @typedef {import('sequelize').CreateOptions<Document>} CreateOptions
 */

/** @extends BaseDao<UserDoc> */
class UserDao extends BaseDao {
	constructor() {
		super('users');
	}
}

module.exports = new UserDao();
