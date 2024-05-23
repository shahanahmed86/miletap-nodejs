const { Router } = require('express');
const authRoutes = require('./auth/auth.routes');

const router = Router();

router.use('/auth', authRoutes)

module.exports = router;
