const router = require("express").Router();

router.get("/chargecard", async (req, res) => {
  res.render("chargecard");
});

router.get("/depositmoney", async (req, res) => {
  res.render("depositmoney");
});

router.get("/transfermoney", async (req, res) => {
  res.render("transfermoney");
});

module.exports = router;
