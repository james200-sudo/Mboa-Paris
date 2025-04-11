const sendSupportEmail = require('../utils/sendSupportEmail');

exports.sendSupportMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    await sendSupportEmail({ name, email, message });
    res.status(200).json({ message: "Votre message a bien été envoyé. ✅" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'envoi du message.", error: err.message });
  }
};
