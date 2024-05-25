const { BadRequest } = require('../utils/errors.util');

/**
 * refineArgument
 * @param {{}} args
 * @param {string[]} keys
 * @returns {boolean}
 */
const refineArgument = (args, keys) => keys.some((param) => param in args);

/**
 * commonErrors
 * @param {string} arg
 * @returns { { required_error: string; invalid_type_error: string } }
 */
const commonErrors = (arg) => ({
	required_error: new BadRequest(`${arg} is required!`),
	invalid_type_error: new BadRequest(`${arg} has an invalid type!`),
});

module.exports = { refineArgument, commonErrors };
