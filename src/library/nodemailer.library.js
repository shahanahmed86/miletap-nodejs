const nodemailer = require('nodemailer');
const configs = require('../config/app');

class NodemailerService {
	constructor() {
		const { host, port, auth } = configs.nodemailer;
		this.mailer = nodemailer.createTransport({ host, port, secure: port === 465, auth });

		this.address = { name: auth.name, address: auth.user };
	}

	/**
	 * handleSend email
	 * @param {string[]} recipients
	 * @param {string} subject
	 * @param {string} html
	 * @returns {Promise<boolean>}
	 */
	handleSend(recipients, subject, html) {
		/**
		 * @type {import('nodemailer/lib/mailer').Mail.Options}
		 */
		const message = {
			from: this.address,
			to: recipients,
			subject,
			html,
		};

		return new Promise((resolve, reject) => {
			this.mailer.sendMail(message, (error, result) => {
				if (error) return reject(error);
				resolve(!!result);
			});
		});
	}
}

module.exports = new NodemailerService();
