const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { sendGroupMessage } = require('../controllers/groupMessageController');

router.post('/', auth, sendGroupMessage);

module.exports = router;
