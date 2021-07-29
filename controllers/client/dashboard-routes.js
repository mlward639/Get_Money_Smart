const router = require('express').Router();
const withAuth = require('../../utils/auth');
const Checking = require('../../models/Checking');
const Credit = require('../../models/Credit');
const Saving = require('../../models/Saving');

// get checking by user id
router.get('/', async (req, res) => {
  //router.get('/', withAuth, async (req, res) => {

  /*
  const userId = req.session.user_id;

  const checkingData = await Checking.findAll({
    where: {
      user_id: userId,
    },
  });

  const savingData = await Saving.findAll({
    where: {
      user_id: userId,
    },
  });

  const creditData = await Credit.findAll({
    where: {
      user_id: userId,
    },
  });

  res.render('dashboard', {
    checkingData,
    creditData,
    savingData,
  });
  */

  res.render('dashboard');
});

module.exports = router;
