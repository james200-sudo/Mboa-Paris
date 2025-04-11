const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'comments',
  timestamps: true
});

module.exports = Comment;
