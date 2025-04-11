const Like = require('../models/Like');

exports.toggleLike = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  try {
    const existingLike = await Like.findOne({ where: { userId, postId } });

    if (existingLike) {
      await existingLike.destroy();
      return res.status(200).json({ message: "Post unliked" });
    }

    await Like.create({ userId, postId });
    res.status(201).json({ message: "Post liked" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const likes = await Like.findAll({ where: { postId } });
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
