const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const GroupMember = sequelize.define('GroupMember', {
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'member', // roles: 'admin', 'moderator', 'member'
  }
}, {
  tableName: 'group_members',
  timestamps: true
});

// Association (un membre appartient à un User)
GroupMember.belongsTo(User, { foreignKey: 'userId' });

module.exports = GroupMember;

