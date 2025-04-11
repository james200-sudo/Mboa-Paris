const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  toggleLike,
  getPostLikes
} = require('../controllers/likeController');
const {
  addComment,
  getComments
} = require('../controllers/commentController');

// Likes
router.post('/:postId/like', auth, toggleLike);
router.get('/:postId/likes', getPostLikes);

// Comments
router.post('/:postId/comments', auth, addComment);
router.get('/:postId/comments', getComments);

module.exports = router;
