const router = require('express').Router();
// const thoughtsRoutes = require('./appRoutes');
const userRoutes = require('./api/userRoutes');

// router.use('/apps', appRoutes);
router.use('/users', userRoutes);

module.exports = router;