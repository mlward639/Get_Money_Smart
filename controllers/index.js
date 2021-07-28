const router = require("express").Router();
const clientRoutes = require("./client");

router.use(clientRoutes);

module.exports = router;
