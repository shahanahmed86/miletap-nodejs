const { Router } = require('express');
const controllers = require('../../../controllers');

const router = Router();

const { getUsers, getUser } = controllers.admin.users;

router.get('/', getUsers);
router.get('/:id', getUser);

module.exports = router;
