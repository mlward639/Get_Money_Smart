const router = require('express').Router();
const { User, Checking, Saving, Credit } = require('../../models');

router.get("/",  (req, res) => {
  // If a session exists, redirect the request to the dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render("login");
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

//Log in the application after username and password verification 
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json(err);
  }
});

//It will direct to signup page
router.get("/signup", async (req, res) => {
  // If a session exists, redirect the request to the dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render("signup");
});


//Create New User with Accounts. The initial balance for accounts will be $0.
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      fname: req.body.first_name,
      lname: req.body.last_name,
      username: req.body.username,
      password: req.body.password
     });
     await Checking.create({
      current_balance: 0,
      user_id: userData.id
     })
     await Saving.create({
      current_balance: 0,
      user_id: userData.id
     })
     await Credit.create({
      current_balance: 0,
      user_id: userData.id
     })
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json(err);
  }
});

//Log out and delete session data
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.redirect('/login');
  } else {
    res.status(404).end();
  }
});

module.exports = router;
