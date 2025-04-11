const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BlockedUser = sequelize.define('BlockedUser', {
  blockerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  blockedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'blocked_users',
  timestamps: true
});

module.exports = BlockedUser;
