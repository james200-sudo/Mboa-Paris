const admin = require('../config/firebase');

module.exports = async (token, payload) => {
  try {
    const response = await admin.messaging().sendToDevice(token, payload);
    return response;
  } catch (err) {
    console.error('❌ FCM Error:', err.message);
    return null;
  }
};
