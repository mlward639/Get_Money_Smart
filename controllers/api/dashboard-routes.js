const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Checking } = require('../../models/Checking');
const { Saving } = require('../../models/Saving');
const { Credit } = require('../../models/Credit');

// get checking by user id
router.get('/', withAuth, async (req, res) => {
  try {
    const checkingData = await Checking.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    if (!checkingData) {
      res
        .status(404)
        .json({ message: 'no checking account found with this id!' });
      return;
    }

    res.status(200).json(checkingData);
    res.render.json(checkingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get saving by user id
router.get('/', withAuth, async (req, res) => {
  try {
    const savingData = await Saving.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    if (!savingData) {
      res
        .status(404)
        .json({ message: 'no savings account found with this id!' });
      return;
    }

    res.status(200).json(savingData);
    res.render.json(savingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get credit by user id
router.get('/', withAuth, async (req, res) => {
  try {
    const creditData = await Credit.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    if (!creditData) {
      res
        .status(404)
        .json({ message: 'no checking account found with this id!' });
      return;
    }

    res.status(200).json(creditData);
    res.render.json(creditData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
