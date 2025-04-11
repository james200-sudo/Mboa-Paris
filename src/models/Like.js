const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Like = sequelize.define('Like', {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'likes',
  timestamps: true
});

module.exports = Like;
