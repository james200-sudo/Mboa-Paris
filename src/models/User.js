const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'admin']]
    }
    },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetTokenExpiration: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'users',
  timestamps: true,
});
module.exports = User;
