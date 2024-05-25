const login = require('./login.controller');
const loggedIn = require('./loggedIn.controller');
const refreshToken = require('./refreshToken.controller');

const auth = {
	login,
	loggedIn,
	refreshToken,
};

module.exports = auth;
