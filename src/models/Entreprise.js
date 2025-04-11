const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Entreprise = sequelize.define('Entreprise', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  }
}, {
  tableName: 'entreprises',
  timestamps: true,
});

module.exports = Entreprise;
