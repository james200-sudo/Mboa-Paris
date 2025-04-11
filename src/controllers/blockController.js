const BlockedUser = require('../models/BlockedUser');

exports.blockUser = async (req, res) => {
  const blockerId = req.user.id;
  const { userId: blockedId } = req.body;

  if (blockerId === blockedId) {
    return res.status(400).json({ message: "Impossible de se bloquer soi-même" });
  }

  try {
    const existing = await BlockedUser.findOne({ where: { blockerId, blockedId } });
    if (existing) {
      return res.status(400).json({ message: "Utilisateur déjà bloqué" });
    }

    await BlockedUser.create({ blockerId, blockedId });
    res.status(201).json({ message: "Utilisateur bloqué avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.unblockUser = async (req, res) => {
  const blockerId = req.user.id;
  const { userId: blockedId } = req.body;

  try {
    const row = await BlockedUser.findOne({ where: { blockerId, blockedId } });
    if (!row) return res.status(404).json({ message: "Utilisateur non bloqué" });

    await row.destroy();
    res.status(200).json({ message: "Utilisateur débloqué" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
