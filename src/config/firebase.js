var admin = require("firebase-admin");

var serviceAccount = require("../../../cle notif fiwebase/firebaseServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
