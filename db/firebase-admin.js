const admin = require('firebase-admin');
const serviceAccount = require('../vampire-research-2ed0a724decf.json');

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vampire-project.firebaseio.co"
});

module.exports = firebaseAdmin;
