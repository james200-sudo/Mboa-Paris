const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { registerDeviceToken } = require('../controllers/notificationController');

router.post('/register-token', auth, registerDeviceToken);

module.exports = router;
