const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Message = require('./Message');
const GroupMessage = require('./GroupMessage');

const ReportedMessage = sequelize.define('ReportedMessage', {
  messageId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reporterId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('private', 'group'),
    defaultValue: 'private'
  },
  status: {
    type: DataTypes.ENUM('pending', 'handled'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'reported_messages',
  timestamps: true
});

ReportedMessage.belongsTo(Message, {
  foreignKey: 'messageId',
  constraints: false,
  as: 'privateMessage'
});

ReportedMessage.belongsTo(GroupMessage, {
  foreignKey: 'messageId',
  constraints: false,
  as: 'groupMessage'
});

module.exports = ReportedMessage;
