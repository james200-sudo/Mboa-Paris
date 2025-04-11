
const Event = require('./Event');
const Ticket = require('./Ticket');
const User = require('./User'); // déjà existant normalement

// Associations (si pas déjà faites dans les modèles eux-mêmes)
User.hasMany(Ticket);
Ticket.belongsTo(User);

Event.hasMany(Ticket);
Ticket.belongsTo(Event);

module.exports = { Event, Ticket, User };
