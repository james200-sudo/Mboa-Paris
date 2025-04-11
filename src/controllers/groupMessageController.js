const GroupMessage = require('../models/GroupMessage');

exports.sendGroupMessage = async (req, res) => {
  const senderId = req.user.id;
  const { groupId, content } = req.body;

  try {
    const message = await GroupMessage.create({ senderId, groupId, content });

    // Émettre le message à la room correspondante
    io.to(`group-${groupId}`).emit('new-group-message', {
      id: message.id,
      senderId,
      groupId,
      content,
      createdAt: message.createdAt,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
