const router = require("express").Router();
const authRoutes = require("./auth-routes");
const transactionRoutes = require("./transaction-routes");

router.use("/", authRoutes);
router.use("/transaction", transactionRoutes);

module.exports = router;
