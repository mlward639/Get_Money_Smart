const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    res.render("login");
  });

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('dashboard');
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

module.exports = router;
