const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Ticket = sequelize.define('Ticket', {
  qrCode: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'reserved',
    validate: {
      isIn: [['reserved', 'paid', 'checkedIn']]
    }
  }
}, {
  tableName: 'tickets',
  timestamps: true,
});

module.exports = Ticket;
