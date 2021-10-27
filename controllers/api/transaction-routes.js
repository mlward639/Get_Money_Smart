const router = require('express').Router();
const { Checking, Saving, Credit, History } = require('../../models/');
const withAuth = require('../../utils/auth');

//Send data to 'chargecard' handlebar to be rendered.
router.get('/chargecard', withAuth, async (req, res) => {
  try {
    const creditData = await Credit.findOne({
      where: {
        user_id: req.session.user_id,
      },
    });
    const credit = creditData.get({ plain: true });
    res.render('chargecard', {
      credit,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Updates the Credit Account after a transaction. It stores the transaction in the History table.
router.put('/chargecard', withAuth, async (req, res) => {
  const creditData = await Credit.findOne({
    where: {
      user_id: req.session.user_id,
    },
  });
  const chargeAmount = parseInt(req.body.chargeAmount);
  Credit.update(
    { current_balance: creditData.current_balance + chargeAmount },
    { returning: true, where: { user_id: req.session.user_id } }
  )
    .then(function () {
      History.create({
        merchant: req.body.chargeTo,
        amount: req.body.chargeAmount,
        user_id: req.session.user_id,
      });
      res.status(200).json('transaction saved');
      res.render('dashboard');
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Send data to 'depositmoney' handlebar to be rendered.
router.get('/depositmoney', withAuth, async (req, res) => {
  try {
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
    const checking = checkingData.get({ plain: true });
    const saving = savingData.get({ plain: true });
    res.render('depositmoney', {
      checking,
      saving,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

///Update Checking or Saving Accounts deposit amount. Then, it redirects to the 'dashboard'.
router.put('/depositmoney', withAuth, async (req, res) => {
  try {
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
    if (req.body.depositTo === 'checking') {
      checkingData.current_balance =
        checkingData.current_balance + parseInt(req.body.depositAmount);
      await checkingData.save();
    }
    if (req.body.depositTo === 'savings') {
      savingData.current_balance =
        savingData.current_balance + parseInt(req.body.depositAmount);
      await savingData.save();
    }
    res.render('dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

//Send data to 'transfermoney' handlebar to be rendered.
router.get('/transfermoney', withAuth, async (req, res) => {
  try {
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
    const checking = checkingData.get({ plain: true });
    const saving = savingData.get({ plain: true });
    const credit = creditData.get({ plain: true });
    res.render('transfermoney', {
      checking,
      saving,
      credit,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Checking, Saving and/or Credit Accounts after a money transfer. Then, it redirects to the dashboard.
router.put('/transfermoney', withAuth, async (req, res) => {
  try {
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
    let sender = req.body.transferFrom;
    let receiver = req.body.transferTo;
    let amount = parseInt(req.body.transferAmount);
    switch ((sender, receiver)) {
      case ('checking', 'savings'):
        checkingData.current_balance = checkingData.current_balance - amount;
        savingData.current_balance = savingData.current_balance + amount;
        await checkingData.save();
        await savingData.save();
        break;
      case ('checking', 'credit-card'):
        checkingData.current_balance = checkingData.current_balance - amount;
        creditData.current_balance = creditData.current_balance - amount;
        await checkingData.save();
        await creditData.save();
        break;
      case ('savings', 'checking'):
        savingData.current_balance = savingData.current_balance - amount;
        checkingData.current_balance = checkingData.current_balance + amount;
        await savingData.save();
        await checkingData.save();
        break;
      case ('savings', 'credit-card'):
        savingData.current_balance = savingData.current_balance - amount;
        creditData.current_balance = creditData.current_balance - amount;
        await savingData.save();
        await creditData.save();
        break;
      default:
        return;
    }
    res.render('dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

//Send data to 'wire money' handlebar to be rendered.
router.get('/wiremoney', withAuth, async (req, res) => {
  try {
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
    const checking = checkingData.get({ plain: true });
    const saving = savingData.get({ plain: true });
    res.render('wiremoney', {
      checking,
      saving,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Checking, Saving and/or Credit Accounts after a money transfer. Then, it redirects to the dashboard.
router.post('/wiremoney', withAuth, async (req, res) => {
  try {
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
    const checkingWireData = await Checking.findOne({
      where: {
        account_number: req.body.wireToAccount,
      },
    });
    const savingWireData = await Saving.findOne({
      where: {
        account_number: req.body.wireToAccount,
      },
    });
    if (!checkingWireData && !savingWireData) {
      return res
        .status(404)
        .send({ message: "Unable to find receiver's Account Number" });
    }
    const sender = req.body.wireFrom;
    let amount = parseInt(req.body.wireAmount);
    switch (sender) {
      case 'checking':
        if (checkingWireData) {
          if (amount > checkingData.current_balance) {
            return res
              .status(404)
              .send({
                message: "You don't have enough money in your Checking Account",
              });
          }
          checkingWireData.current_balance =
            checkingWireData.current_balance + amount;
          checkingData.current_balance = checkingData.current_balance - amount;
          await checkingData.save();
          await checkingWireData.save();
        } else if (savingWireData) {
          if (amount > checkingData.current_balance) {
            return res
              .status(404)
              .send({
                message: "You don't have enough money in your Checking Account",
              });
          }
          savingWireData.current_balance =
            savingWireData.current_balance + amount;
          checkingData.current_balance = checkingData.current_balance - amount;
          await checkingData.save();
          await savingWireData.save();
        }
        break;
      case 'savings':
        if (checkingWireData) {
          if (amount > savingData.current_balance) {
            return res
            .status(404)
            .send({
              message: "You don\'t have enough money in your Savings Account",
            });
          }
          checkingWireData.current_balance =
            checkingWireData.current_balance + amount;
          savingData.current_balance = savingData.current_balance - amount;
          await savingData.save();
          await checkingWireData.save();
        } else if (savingWireData) {
          if (amount > savingData.current_balance) {
            return res
              .status(404)
              .send({
                message: "You don\'t have enough money in your Savings Account",
              });
          }
          savingWireData.current_balance =
            savingWireData.current_balance + amount;
          savingData.current_balance = savingData.current_balance - amount;
          await savingData.save();
          await savingWireData.save();
        }
        break;
      default:
        return;
    }
    res.status(200).render('dashboard');
  } catch (err) {
    res.status(500).send({
      message: "Unable to make the wire transfer",
    });
  }
});

//Delete Transaction History
router.delete('/clear', withAuth, async (req, res) => {
  try {
    const historyData = await History.destroy({
      where: {
        user_id: req.session.user_id,
      },
    });
    if (!historyData) {
      res.status(404).json({ message: "User doesn't have past transaction" });
      return;
    }
    res.status(200).json(historyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
