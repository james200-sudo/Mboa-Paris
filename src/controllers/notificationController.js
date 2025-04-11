const DeviceToken = require('../models/DeviceToken');
const sendFCMNotification = require('../utils/sendFCMNotification');


exports.registerDeviceToken = async (req, res) => {
  const userId = req.user.id;
  const { token, platform } = req.body;

  try {
    const [device, created] = await DeviceToken.findOrCreate({
      where: { token },
      defaults: { userId, platform }
    });

    if (!created && device.userId !== userId) {
      device.userId = userId;
      await device.save();
    }

    res.status(200).json({ message: 'Device token registered successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sendTestNotification = async (req, res) => {
  const userId = req.body.userId || req.user.id;

  try {
    const tokens = await DeviceToken.findAll({ where: { userId } });
    if (!tokens.length) {
      return res.status(404).json({ message: 'No tokens found for this user' });
    }

    for (const device of tokens) {
      await sendFCMNotification(device.token, {
        notification: {
          title: '📲 Test Notification',
          body: '✅ Your push notification setup works!',
        },
        data: {
          type: 'test',
        }
      });
    }

    res.status(200).json({ message: 'Test notification sent ✅' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

