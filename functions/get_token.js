const functions = require("firebase-functions");

exports.get_token = functions.region("europe-west2").https.onCall((data, context) => {
  const { name } = data;

  return {result: process.env[name]};
})
