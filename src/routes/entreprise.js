const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

const {
  createEntreprise,
  getEntreprises,
  getEntrepriseById,
  updateEntreprise,
  deleteEntreprise
} = require('../controllers/entrepriseController');

const {
  bookRendezVous,
  getMyRendezVous,
  getRendezVousForEntreprise
} = require('../controllers/rendezvousController');

// 🔐 Admin CRUD Entreprise
router.post('/', auth, isAdmin, createEntreprise);
router.get('/', auth, getEntreprises);
router.get('/:id', auth, getEntrepriseById);
router.put('/:id', auth, isAdmin, updateEntreprise);
router.delete('/:id', auth, isAdmin, deleteEntreprise);

// 📅 Réservation d’un rendez-vous
router.post('/:id/reserver', auth, bookRendezVous);

// 👤 Mes rendez-vous (user connecté)
router.get('/me/rendezvous', auth, getMyRendezVous);

// 🏢 Tous les rendez-vous pour une entreprise
router.get('/:id/rendezvous', auth, isAdmin, getRendezVousForEntreprise);

module.exports = router;
