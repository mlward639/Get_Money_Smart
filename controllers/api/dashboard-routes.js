const router = require("express").Router();

router.get("/", async (req, res) => {
  //pull the user to show user information on dashboard
  res.render("dashboard");
});

module.exports = router;
