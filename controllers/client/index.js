const router = require("express").Router();
const authRoutes = require("./auth-routes");
const dashboardRoutes = require("./dashboard-routes");
const transactionRoutes = require("./transaction-routes");

router.use("/", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/transaction", transactionRoutes);

module.exports = router;
