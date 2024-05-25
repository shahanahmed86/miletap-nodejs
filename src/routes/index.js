const { Router } = require('express');
const appRoutes = require('./app');
const adminRoutes = require('./admin');

const router = Router();

router.use('/admin', adminRoutes);
router.use('/app', appRoutes);

module.exports = router;
