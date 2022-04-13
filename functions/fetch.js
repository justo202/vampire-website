const functions = require("firebase-functions");
const { firestore } = require("./firebase");

exports.fetch = functions
  .region("europe-west2")
  .https.onCall(async (data, context) => {
    const snapshot = await firestore.collection("team").get();
    return { result: snapshot };
  });
