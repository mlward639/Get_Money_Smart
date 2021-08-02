const router = require('express').Router();

router.get('/', (req, res) => {
  // If a session exists, redirect the request to the dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
  console.log('logged out');
});

//It will direct to login page
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;
