const Entreprise = require('../models/Entreprise');
const geocodeAddress = require('../utils/geocodeAddress');

exports.createEntreprise = async (req, res) => {
  try {
    const { address, city, country } = req.body;
    const fullAddress = `${address}, ${city}, ${country}`;

    const location = await geocodeAddress(fullAddress);

    const entreprise = await Entreprise.create({
      ...req.body,
      latitude: location?.lat,
      longitude: location?.lng,
    });

    res.status(201).json(entreprise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getEntrepriseById = async (req, res) => {
    try {
      const entreprise = await Entreprise.findByPk(req.params.id);
      if (!entreprise) return res.status(404).json({ message: 'Entreprise not found' });
      res.status(200).json(entreprise); // inclut lat/lng
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.updateEntreprise = async (req, res) => {
  try {
    const entreprise = await Entreprise.findByPk(req.params.id);
    if (!entreprise) return res.status(404).json({ message: 'Entreprise not found' });

    await entreprise.update(req.body);
    res.status(200).json({ message: 'Entreprise updated', entreprise });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEntreprise = async (req, res) => {
  try {
    const entreprise = await Entreprise.findByPk(req.params.id);
    if (!entreprise) return res.status(404).json({ message: 'Entreprise not found' });

    await entreprise.destroy();
    res.status(200).json({ message: 'Entreprise deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEntreprises = async (req, res) => {
    try {
      const entreprises = await Entreprise.findAll({
        attributes: [
          'id', 'name', 'sector', 'address',
          'latitude', 'longitude', 'city', 'country'
        ],
        order: [['name', 'ASC']],
      });
  
      res.status(200).json(entreprises);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
