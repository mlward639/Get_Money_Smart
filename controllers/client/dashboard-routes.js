const router = require('express').Router();
const withAuth = require('../../utils/auth');
const Checking = require('../../models/Checking');
const Credit = require('../../models/Credit');
const Saving = require('../../models/Saving');

// get checking by user id
router.get('/', async (req, res) => {
  res.render('dashboard');
});

module.exports = router;
