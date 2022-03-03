const functions = require("firebase-functions");

exports.get_token = functions.region("europe-west2").https.onRequest(async (req, res) => {
  const { name } = req.query;

  res.send(process.env[name]);
})
