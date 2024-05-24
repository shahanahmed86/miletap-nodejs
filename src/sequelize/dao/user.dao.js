const BaseDao = require('./base.dao');

class UserDao extends BaseDao {
	constructor() {
		super('users');
	}
}

module.exports = new UserDao();
