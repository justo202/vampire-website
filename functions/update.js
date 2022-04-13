const functions = require("firebase-functions");
const { firestore } = require(".");

exports.update = functions
  .region("europe-west2")
  .https.onRequest(async (req, res) => {
    const { data, collection } = req.body;

    const docRef = firestore.collection(collection).doc();

    docRef.set(data.body, { merge: true });

    res.json({ result: `Message with ID: ${docRef.id} added.` });
  });
