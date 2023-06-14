const router = require("express").Router();
const thoughtsRoutes = require("./api/thoughtRoutes");
const userRoutes = require("./api/userRoutes");

router.use("/thoughts", thoughtsRoutes);
router.use("/users", userRoutes);

module.exports = router;
