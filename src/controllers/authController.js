const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: 'user' });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!user.isActive) {
        return res.status(403).json({ message: "Account suspended" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign( { id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' } );
    

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, email, bio, photo } = req.body;
  
    try {
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.name = name || user.name;
      user.email = email || user.email;
      user.bio = bio || user.bio;
      user.photo = photo || user.photo;
  
      await user.save();
      res.status(200).json({ message: "Profile updated successfully", user });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const user = await User.findOne({
        where: {
          resetToken: token,
          resetTokenExpiration: { [require('sequelize').Op.gt]: Date.now() }
        }
      });
  
      if (!user) return res.status(400).json({ message: "Invalid or expired token" });
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiration = null;
  
      await user.save();
  
      res.status(200).json({ message: "Password has been reset successfully" });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const sendResetEmail = require('../utils/mailer');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;

    await user.save();

    await sendResetEmail(email, token);

    res.status(200).json({ message: "Password reset email sent" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  

