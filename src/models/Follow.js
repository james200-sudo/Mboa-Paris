const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Follow = sequelize.define('Follow', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  entrepriseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'follows',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'entrepriseId']
    }
  ]
});

module.exports = Follow;
