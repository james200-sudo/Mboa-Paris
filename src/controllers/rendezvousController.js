const RendezVous = require('../models/RendezVous');
const Entreprise = require('../models/Entreprise');

// Réserver un rendez-vous
exports.bookRendezVous = async (req, res) => {
  const { date, time, note } = req.body;
  const entrepriseId = req.params.id;
  const userId = req.user.id;

  try {
    const exists = await RendezVous.findOne({
      where: { entrepriseId, userId, date, time }
    });
    if (exists) {
      return res.status(409).json({ message: 'Ce créneau est déjà réservé' });
    }

    const rdv = await RendezVous.create({
      entrepriseId,
      userId,
      date,
      time,
      note
    });

    res.status(201).json({ message: 'Rendez-vous réservé', rdv });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Voir les rendez-vous pour l’utilisateur connecté
exports.getMyRendezVous = async (req, res) => {
  try {
    const list = await RendezVous.findAll({
      where: { userId: req.user.id },
      include: [{ model: Entreprise }]
    });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Voir les rendez-vous pour une entreprise donnée (admin ou propriétaire)
exports.getRendezVousForEntreprise = async (req, res) => {
  const entrepriseId = req.params.id;
  try {
    const list = await RendezVous.findAll({
      where: { entrepriseId },
      include: [{ model: Entreprise }]
    });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
