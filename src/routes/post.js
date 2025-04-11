const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { reportPost } = require('../controllers/postController');
const { getReportedPosts } = require('../controllers/postController');
const isAdmin = require('../middlewares/isAdmin');
const { unreportPost } = require('../controllers/postController');

const upload = require('../middlewares/upload');

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', auth, upload.single('image'), createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.put('/:postId/report', auth, reportPost);
router.get('/reported', auth, getReportedPosts, isAdmin); // tu peux ajouter isAdmin si tu veux
router.put('/:postId/unreport', auth, unreportPost, isAdmin); // tu peux ajouter isAdmin plus tard


module.exports = router;
