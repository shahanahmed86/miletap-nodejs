const { Router } = require('express');
const controllers = require('../../controllers');
const { checkAuth } = require('../../middleware/error.middleware');

const router = Router();

const { signup, loggedIn, login, refreshToken } = controllers.auth;

router.post('/signup', signup);

router.route('/').get(checkAuth, loggedIn).post(login);

router.get('/refresh/:token', refreshToken);

module.exports = router;
