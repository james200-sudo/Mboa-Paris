const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Event = sequelize.define('Event', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: DataTypes.STRING,
  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  image: DataTypes.STRING,
  availableSeats: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  totalTickets: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Event;
