const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Post = sequelize.define('Post', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reported: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'posts',
  timestamps: true
});

module.exports = Post;
