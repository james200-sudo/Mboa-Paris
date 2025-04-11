const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SUPPORT_EMAIL,
    pass: process.env.SUPPORT_PASS
  }
});

module.exports = async ({ name, email, message }) => {
  const mailOptions = {
    from: email,
    to: process.env.SUPPORT_EMAIL,
    subject: `💬 Message de support - ${name}`,
    text: message
  };

  await transporter.sendMail(mailOptions);
};
