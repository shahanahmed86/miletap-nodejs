const { Router } = require('express');
const authRoutes = require('./auth/auth.routes');
const usersRoutes = require('./users/users.routes');
const { checkAuth } = require('../../middleware/error.middleware');

const router = Router();

router.use('/auth', authRoutes);

router.use('/users', checkAuth('admin'), usersRoutes);

module.exports = router;
