const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Checking, Saving, Credit, History } = require('../models');
const { User } = require('../models');

//sends Data(Checking, Saving, Credit, History) to 'dashboard' handlebar
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });
    const checkingData = await Checking.findOne({
      where: {
        user_id: req.session.user_id,
      },
    });
    const savingData = await Saving.findOne({
      where: {
        user_id: req.session.user_id,
      },
    });
    const creditData = await Credit.findOne({
      where: {
        user_id: req.session.user_id,
      },
    });
    const historyData = await History.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    if (!historyData) {
      res.status(404).json({ message: "User doesn't have past transaction" });
    }
    const checking = checkingData.get({ plain: true });
    const saving = savingData.get({ plain: true });
    const credit = creditData.get({ plain: true });
    const user = userData.get({ plain: true });
    const history =
      historyData.length > 0
        ? historyData.map((item) => item.get({ plain: true }))
        : null;
    console.log(history)
    res.render('dashboard', {
      user,
      credit,
      saving,
      checking,
      history,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;