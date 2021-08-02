const router = require('express').Router();
const { User, Checking, Saving, Credit } = require('../../models');

//Log in the application after username and password verification
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    const validPassword = await userData.validPassword(req.body.password)
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
  } catch (err) {
    res.status(400).json(err);
  }
});

//Create New User with Accounts. The initial balance for accounts will be $0.
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      fname: req.body.firstName,
      lname: req.body.lastName,
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
      user_id: userData.id,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Log out and delete session data
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
