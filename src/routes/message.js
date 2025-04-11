const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');
const checkBlocked = require('../middlewares/checkBlocked');

// Controllers
const {
  sendMessage,
  getConversation,
  markAsRead
} = require('../controllers/messageController');

// 📩 Send a private message (with checkBlocked middleware)
router.post('/', auth, checkBlocked, sendMessage);

// 📥 Get conversation between connected user and another user
router.get('/:userId', auth, getConversation);

// ✅ Mark a message as read
router.put('/:id/read', auth, markAsRead);

module.exports = router;
