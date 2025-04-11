const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // ou 'hotmail', 'outlook', etc.
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendResetEmail = async (to, token) => {
  const resetUrl = `http://localhost:3000/reset-password?token=${token}`; // Lien frontend à adapter

  await transporter.sendMail({
    from: `"Mboa Paris" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Reset your Mboa Paris password',
    html: `
      <p>Hello 👋,</p>
      <p>You requested a password reset. Click the link below:</p>
      <a href="${resetUrl}">Reset your password</a>
      <p>If you did not request this, ignore this email.</p>
    `
  });
};

module.exports = sendResetEmail;
