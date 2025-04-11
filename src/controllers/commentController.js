const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.create({ userId, postId, content });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.findAll({
      where: { postId },
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
