const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Checking, Saving, Credit, History } = require('../../models/');

//sends Data(Checking, Saving, Credit, History) to 'dashboard' handlebar
router.get('/', withAuth, async (req, res) => {
  try {
    const checkingData = await Checking.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const savingData = await Saving.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const creditData = await Credit.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const historyData = await History.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const checking = checkingData.get({ plain: true });
    const saving = savingData.get({ plain: true });
    const credit = creditData.get({ plain: true });
    const history = historyData.get({ plain: true });
    res.render('dashboard', {
      ...credit,
      ...saving,
      ...checking,
      ...history,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
