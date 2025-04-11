const admin = require('../config/firebase');
const DeviceToken = require('../models/DeviceToken');
const GroupMember = require('../models/GroupMember');

const sendGroupNotification = async ({ groupId, senderId, content }) => {
  try {
    // 1. Récupérer les membres du groupe (sauf sender)
    const members = await GroupMember.findAll({
      where: {
        groupId
      }
    });

    const userIds = members
      .map(m => m.userId)
      .filter(uid => uid !== senderId);

    // 2. Récupérer tous leurs tokens
    const tokens = await DeviceToken.findAll({
      where: {
        userId: userIds
      }
    });

    if (!tokens.length) return;

    // 3. Envoyer via FCM
    const payload = {
      notification: {
        title: '💬 Nouveau message dans le groupe',
        body: content,
      },
      data: {
        groupId: groupId.toString(),
        type: 'group',
      }
    };

    const tokenList = tokens.map(t => t.token);
    const response = await admin.messaging().sendToDevice(tokenList, payload);
    console.log('✅ Groupe notification envoyée :', response.successCount);

  } catch (err) {
    console.error('❌ Erreur FCM groupe :', err.message);
  }
};

module.exports = sendGroupNotification;
