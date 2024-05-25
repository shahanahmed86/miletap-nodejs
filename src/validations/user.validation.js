const z = require('zod');
const { commonErrors } = require('./helper.validation');
const { BadRequest } = require('../utils/errors.util');

const GetUser = z.object({
	id: z.string(commonErrors('id')).uuid(new BadRequest('The ID was not valid!')),
});

module.exports = {
	GetUser,
};
