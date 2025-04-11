const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Group = sequelize.define('Group', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'groups',
  timestamps: true
});

module.exports = Group;
