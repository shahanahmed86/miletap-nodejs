const login = require('./login.controller');
const loggedIn = require('./loggedIn.controller');
const signup = require('./signup.controller');
const refreshToken = require('./refreshToken.controller');

module.exports = {
	login,
	loggedIn,
	signup,
	refreshToken,
};
