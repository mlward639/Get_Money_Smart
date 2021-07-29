const router = require('express').Router();
const { Checking, Saving, Credit } = require('../../models/');
const withAuth = require('../../utils/auth');

router.get('/chargecard', withAuth, async (req, res) => {
  try {
    const creditData = await Credit.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const credit = creditData.get({ plain: true });
    res.render('chargecard', {
      ...credit,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put('/chargecard', withAuth, async (req, res) => {
  try {
    const creditData = await Credit.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    creditData.current_balance =
      creditData.current_balance + parseInt(req.body.charge_amount);
    await creditData.save();
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/depositmoney', withAuth, async (req, res) => {
  try {
    const checkingData = await Credit.findAll({
      where: {
        user_id: req.session.user_id
      },
    });
    const savingData = await Credit.findAll({
      where: {
        user_id: req.session.user_id
      }
    })
    const checking = checkingData.get({ plain: true });
    const saving = savingData.get({ plain: true });
    res.render('depositmoney', {
      ...checking, ...saving,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put('/depositmoney', async (req, res) => {
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
    if (req.body.selected_account === checkingData.account_number) {
      checkingData.current_balance =
        checkingData.current_balance + parseInt(req.body.deposit_amount);
      await checkingData.save();
    } 
    if (req.body.selected_account === savingData.account_number) {
      savingData.current_balance =
        savingData.current_balance + parseInt(req.body.deposit_amount);
      await savingData.save();
      res.redirect('/dashboard');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/transfermoney', withAuth, async (req, res) => {
  try {
    const checkingData = await Credit.findAll({
      where: {
        user_id: req.session.user_id
      },
    });
    const savingData = await Credit.findAll({
      where: {
        user_id: req.session.user_id
      }
    });
    const creditData = await Credit.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const checking = checkingData.get({ plain: true });
    const saving = savingData.get({ plain: true });
    const credit = creditData.get({ plain: true });
    res.render('transfermoney', {
      ...checking, ...saving, ...credit,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put('/transfermoney', async (req, res) => {
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

    if (req.body.sender === checkingData.account_number) {
      checkingData.current_balance =
        checkingData.current_balance - parseInt(req.body.transfer_amount);
      await checkingData.save();
      savingData.current_balance =
        savingData.current_balance + parseInt(req.body.transfer_amount);
      await savingData.save();
    } 
    if (req.body.sender === savingData.account_number) {
      savingData.current_balance =
        savingData.current_balance - parseInt(req.body.deposit_amount);
      await savingData.save();
      checkingData.current_balance =
        checkingData.current_balance + parseInt(req.body.deposit_amount);
      await checkingData.save();
    }
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
