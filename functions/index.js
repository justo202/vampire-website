const functions = require("firebase-functions");

exports.addMessage = functions.https.onRequest((req, res) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  res.json({msg: "Hello from Firebase!"});
});
