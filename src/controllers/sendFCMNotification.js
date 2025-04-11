const admin = require('../config/firebase');
const DeviceToken = require('../models/DeviceToken');

module.exports = async (token, payload) => {
  try {
    const response = await admin.messaging().sendToDevice(token, payload);

    const result = response.results?.[0];
    const error = result?.error;

    if (error) {
      const knownInvalid = [
        'messaging/invalid-registration-token',
        'messaging/registration-token-not-registered'
      ];

      if (knownInvalid.includes(error.code)) {
        await DeviceToken.destroy({ where: { token } });
        console.warn(`🧹 Token supprimé (invalide) : ${token}`);
      } else {
        console.error('❌ FCM error:', error.code);
      }
    }

    return response;
  } catch (err) {
    console.error('❌ FCM general error:', err.message);
    return null;
  }
};
