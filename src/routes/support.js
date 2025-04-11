const express = require('express');
const router = express.Router();
const { sendSupportMessage } = require('../controllers/supportController');

router.post('/', sendSupportMessage);

module.exports = router;
