const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Event = require('./Event');

const Ticket = sequelize.define('Ticket', {
    qrCode: {
        type: DataTypes.TEXT, // 
        allowNull: true
    },
      
    status: {
        type: DataTypes.STRING,
        defaultValue: 'reserved', // ou 'paid'
        validate: {
          isIn: [['reserved', 'paid', 'checkedIn']]
        }
      }
      
});

User.hasMany(Ticket);

Event.hasMany(Ticket);
Ticket.belongsTo(Event);

Ticket.associate = models => {
    Ticket.belongsTo(models.Event, { foreignKey: 'eventId', as: 'Event' });
  };
  

Ticket.belongsTo(User, { foreignKey: 'userId', as: 'User' });
module.exports = Ticket;
