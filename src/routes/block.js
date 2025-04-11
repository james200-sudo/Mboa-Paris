const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { blockUser, unblockUser } = require('../controllers/blockController');

router.post('/block', auth, blockUser);
router.post('/unblock', auth, unblockUser);

module.exports = router;
