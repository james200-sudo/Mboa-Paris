const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const QRCode = require('qrcode');
const { Op } = require('sequelize');
const User = require('../models/User');



exports.getMyTickets = async (req, res) => {
  const userId = req.user.id;

  try {


    const tickets = await Ticket.findAll({
    where: { userId },
    include: [{ model: Event, as: 'Event' }]
    });


    res.status(200).json(tickets);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.reserveTicket = async (req, res) => {
  const userId = req.user.id;
  const { eventId } = req.body;

  try {
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.availableSeats < 1) return res.status(400).json({ message: 'No seats available' });

    // Créer ticket sans QR dans un premier temps
    const ticket = await Ticket.create({ userId, eventId, status: 'reserved' });

    // Générer un QR code avec l'ID du ticket ou une URL unique
    const qrData = `TICKET:${ticket.id}`;
    const qrImage = await QRCode.toDataURL(qrData); // base64 string image

    ticket.qrCode = qrImage;
    await ticket.save();

    // Mettre à jour les places
    event.availableSeats -= 1;
    await event.save();

    res.status(201).json({
      message: 'Ticket reserved successfully',
      ticket
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.scanTicket = async (req, res) => {
    const { qrData } = req.body; // exemple : "TICKET:123"
  
    try {
      if (!qrData || !qrData.startsWith('TICKET:')) {
        return res.status(400).json({ message: 'Invalid QR data' });
      }
  
      const ticketId = qrData.replace('TICKET:', '').trim();
      const ticket = await Ticket.findByPk(ticketId, {
        include: ['Event', 'User']
      });
  
      if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
  
      if (ticket.status === 'checkedIn') {
        return res.status(400).json({ message: 'Ticket already used' });
      }
  
      // Marquer comme scanné
      ticket.status = 'checkedIn';
      await ticket.save();
      io.emit('ticket-checkedin', {
        id: ticket.id,
        eventId: ticket.eventId,
        userId: ticket.userId,
        updatedAt: ticket.updatedAt
      });
      const total = await Ticket.count({ where: { eventId: ticket.eventId } });
        const checkedIn = await Ticket.count({ where: { eventId: ticket.eventId, status: 'checkedIn' } });

        io.emit(`event-${ticket.eventId}-stats`, { eventId: ticket.eventId, total, checkedIn });
        const user = await User.findByPk(ticket.userId, {
            attributes: ['id', 'name', 'email']
          });
          
          io.emit(`event-${ticket.eventId}-checkin`, {
            ticketId: ticket.id,
            user,
            eventId: ticket.eventId,
            checkinTime: ticket.updatedAt
          });
          
  
      res.status(200).json({
        message: 'Ticket validated successfully',
        ticket
      });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.getCheckinStats = async (req, res) => {
  const { eventId } = req.params;

  try {
    const total = await Ticket.count({ where: { eventId } });
    const checkedIn = await Ticket.count({ where: { eventId, status: 'checkedIn' } });

    res.status(200).json({ total, checkedIn });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  

