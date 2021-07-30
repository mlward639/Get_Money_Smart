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
      creditData.current_balance + parseInt(req.body.chargeAmount);
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
    if (req.body.depositTo === 'checking') {
      checkingData.current_balance =
        checkingData.current_balance + parseInt(req.body.depositAmount);
      await checkingData.save();
    } 
    if (req.body.depositTo === 'saving') {
      savingData.current_balance =
        savingData.current_balance + parseInt(req.body.depositAmount);
      await savingData.save();
    }
    res.redirect('/dashboard');
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
    let sender = req.body.transferFrom;
    let receiver = req.body.transferTo;
    let amount = parseInt(req.body.transferAmount);

    switch (sender, receiver) {
      case 'checking', 'saving': 
        checkingData.current_balance = checkingData.current_balance - amount;
        savingData.current_balance = savingData.current_balance + amount;
        await checkingData.save();
        await savingData.save();
      break;
      case 'checking', 'credit':
        checkingData.current_balance = checkingData.current_balance - amount;
        creditData.current_balance = creditData.current_balance + amount;
        await checkingData.save();
        await creditData.save();
      break;
      case 'saving', 'checking':
        savingData.current_balance = savingData.current_balance - amount;
        checkingData.current_balance = checkingData.current_balance + amount;
        await savingData.save();
        await checkingData.save();
      break;
      case 'saving', 'credit':
        savingData.current_balance = savingData.current_balance - amount;
        creditData.current_balance = creditData.current_balance - amount;
        await savingData.save();
        await creditData.save();
      break;     ;;
      default:
        throw error;
    }
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
