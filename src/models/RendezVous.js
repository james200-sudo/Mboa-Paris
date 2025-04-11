const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const RendezVous = sequelize.define('RendezVous', {
  entrepriseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending',
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'rendezvous',
  timestamps: true,
});

module.exports = RendezVous;
