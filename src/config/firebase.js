const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccount.json'); // exporté depuis Firebase console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
