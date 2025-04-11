const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: '', // Auth sociale = pas de mot de passe
        photo: picture,
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ user, token });

  } catch (err) {
    res.status(401).json({ message: "Invalid Google token", error: err.message });
  }
};
