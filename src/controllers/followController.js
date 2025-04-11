const Follow = require('../models/Follow');
const Entreprise = require('../models/Entreprise');

exports.followEntreprise = async (req, res) => {
  const { entrepriseId } = req.body;
  try {
    const [follow, created] = await Follow.findOrCreate({
      where: { userId: req.user.id, entrepriseId }
    });
    res.status(created ? 201 : 200).json({
      message: created ? 'Followed successfully' : 'Already following'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.unfollowEntreprise = async (req, res) => {
  const { entrepriseId } = req.body;
  try {
    await Follow.destroy({
      where: { userId: req.user.id, entrepriseId }
    });
    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyFollows = async (req, res) => {
  try {
    const follows = await Follow.findAll({
      where: { userId: req.user.id },
      include: [{ model: Entreprise }]
    });
    res.status(200).json(follows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
