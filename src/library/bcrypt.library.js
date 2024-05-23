const bcrypt = require('bcryptjs');
const configs = require('../config/app');

const { salt } = configs.bcrypt;

/**
 * hashSync
 * @param {string} str
 * @returns {string}
 */
const hashSync = (str) => bcrypt.hashSync(str, salt);

/**
 * compareSync
 * @param {string} str
 * @param {string} hash
 * @returns {boolean}
 */
const compareSync = (str, hash) => bcrypt.compareSync(str, hash);

module.exports = { hashSync, compareSync };
