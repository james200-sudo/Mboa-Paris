const express = require('express');
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin'); // facultatif

// Routes publiques (lecture)
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Routes protégées
router.post('/', auth, isAdmin, createEvent);
router.put('/:id', auth, isAdmin, updateEvent);
router.delete('/:id', auth, isAdmin, deleteEvent);

module.exports = router;
