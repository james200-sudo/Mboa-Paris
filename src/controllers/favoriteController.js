const Favorite = require('../models/Favorite');

exports.addFavorite = async (req, res) => {
  const { targetId, targetType } = req.body;
  try {
    const [fav, created] = await Favorite.findOrCreate({
      where: { userId: req.user.id, targetId, targetType }
    });
    res.status(created ? 201 : 200).json({
      message: created ? 'Added to favorites' : 'Already in favorites'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFavorite = async (req, res) => {
  const { targetId, targetType } = req.body;
  try {
    await Favorite.destroy({
      where: { userId: req.user.id, targetId, targetType }
    });
    res.status(200).json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFavorites = async (req, res) => {
  const { type } = req.query;
  try {
    const favorites = await Favorite.findAll({
      where: {
        userId: req.user.id,
        ...(type ? { targetType: type } : {})
      },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
