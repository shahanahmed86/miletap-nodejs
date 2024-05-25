const ejs = require('ejs');
const uuid = require('uuid');
const { NotAuthenticated } = require('./errors.util');
const configs = require('../config/app');
const nodemailerService = require('../library/nodemailer.library');

const generateId = () => uuid.v4();

/**
 * getToken
 * @param {import('express').Request} req
 * @returns {string}
 */
function getToken(req) {
	const bearerToken = req.get('Authorization');
	if (!bearerToken) throw new NotAuthenticated('Token not found!');

	const [, token] = bearerToken.split(' ');
	return token;
}

/**
 * @param {string} file
 * @returns {string}
 **/
const getImageUrl = (file) => `${configs.app.baseUrl}/assets/${file}`;

/**
 * sendEmailWhenUserCreated
 * @param {string} title
 * @param {import('../sequelize/dao/users.dao').UserDoc} user
 */
async function sendEmailWhenUserCreated(title, user) {
	const payload = { ...user, title, attachment: getImageUrl('logo.png') };
	const html = await ejs.renderFile(`views/registered-user.ejs`, payload);

	await nodemailerService.handleSend([configs.admin.email], title, html);
}

module.exports = {
	generateId,
	getToken,
	getImageUrl,
	sendEmailWhenUserCreated,
};
