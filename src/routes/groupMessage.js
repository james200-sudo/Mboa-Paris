const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const GroupMessage = sequelize.define('GroupMessage', {
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'group_messages',
  timestamps: true
});

module.exports = GroupMessage;
