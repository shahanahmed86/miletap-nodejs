/**
 * loggedIn controller
 * @param {import('express').Request} _
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 * @returns {Promise<void>}
 */
async function loggedIn(_, res) {
	res.status(200).send(res.locals.user);
}

module.exports = loggedIn;
