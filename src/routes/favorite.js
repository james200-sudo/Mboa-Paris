const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  addFavorite,
  removeFavorite,
  getFavorites
} = require('../controllers/favoriteController');

router.post('/', auth, addFavorite);
router.delete('/', auth, removeFavorite);
router.get('/', auth, getFavorites);

module.exports = router;
