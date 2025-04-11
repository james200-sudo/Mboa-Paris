const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const DeviceToken = sequelize.define('DeviceToken', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  platform: {
    type: DataTypes.ENUM('android', 'ios', 'web'),
    defaultValue: 'web',
  }
}, {
  tableName: 'device_tokens',
  timestamps: true
});

module.exports = DeviceToken;
