const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const { getGroupMembers } = require('../controllers/groupController');

router.get('/:id/members', auth, getGroupMembers);

module.exports = router;