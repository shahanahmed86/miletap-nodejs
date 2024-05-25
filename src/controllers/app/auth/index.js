const login = require('./login.controller');
const loggedIn = require('./loggedIn.controller');
const signup = require('./signup.controller');
const refreshToken = require('./refreshToken.controller');

const auth = {
	login,
	loggedIn,
	signup,
	refreshToken,
};

module.exports = auth;
