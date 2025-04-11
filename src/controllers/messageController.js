const Message = require('../models/Message');
const User = require('../models/User');
const GroupMessage = require('../models/GroupMessage');

exports.sendMessage = async (req, res) => {
  const senderId = req.user.id;
  const { receiverId, content } = req.body;

  try {
    const message = await Message.create({ senderId, receiverId, content });
    const receiverSocketId = users.get(receiverId);
    if (receiverSocketId) {
    io.to(receiverSocketId).emit('new-private-message', {
        id: message.id,
        senderId,
        receiverId,
        content,
        createdAt: message.createdAt,
    });
    }

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getConversation = async (req, res) => {
  const userId = req.user.id;
  const otherUserId = req.params.userId;

  try {
    const messages = await Message.findAll({
      where: {
        [require('sequelize').Op.or]: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ]
      },
      order: [['createdAt', 'ASC']]
    });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Message.findByPk(id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    message.read = true;
    await message.save();

    res.status(200).json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.sendGroupMessage = async (req, res) => {
  const senderId = req.user.id;
  const { groupId, content } = req.body;

  try {
    const message = await GroupMessage.create({ senderId, groupId, content });

    // Émettre le message à tous les membres connectés de la room du groupe
    io.to(`group-${groupId}`).emit('new-group-message', {
      id: message.id,
      groupId,
      senderId,
      content,
      createdAt: message.createdAt,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
