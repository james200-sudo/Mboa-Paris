const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  followEntreprise,
  unfollowEntreprise,
  getMyFollows
} = require('../controllers/followController');

router.post('/', auth, followEntreprise);
router.delete('/', auth, unfollowEntreprise);
router.get('/', auth, getMyFollows);

module.exports = router;
