const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Favorite = sequelize.define('Favorite', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  targetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  targetType: {
    type: DataTypes.ENUM('post', 'event', 'entreprise'),
    allowNull: false,
  }
}, {
  tableName: 'favorites',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'targetId', 'targetType']
    }
  ]
});

module.exports = Favorite;
