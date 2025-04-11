
const express = require('express');
const router = express.Router();
const { reserveTicket, getMyTickets } = require('../controllers/ticketController');
const auth = require('../middlewares/auth');
const { scanTicket } = require('../controllers/ticketController');
const isAdmin = require('../middlewares/isAdmin'); 
const { getCheckinStats } = require('../controllers/ticketController');



router.post('/', auth, reserveTicket);
router.get('/my', auth, getMyTickets);
router.post('/scan', auth, isAdmin, scanTicket);
router.get('/event/:eventId/checkin-stats', auth, isAdmin, getCheckinStats);

module.exports = router;
