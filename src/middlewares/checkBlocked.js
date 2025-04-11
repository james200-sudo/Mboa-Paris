const BlockedUser = require('../models/BlockedUser');

module.exports = async (req, res, next) => {
  const senderId = req.user.id;
  const receiverId = req.body.receiverId;

  try {
    const isBlocked = await BlockedUser.findOne({
      where: {
        blockerId: receiverId,
        blockedId: senderId
      }
    });

    if (isBlocked) {
      return res.status(403).json({ message: "Vous avez été bloqué par cet utilisateur." });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
