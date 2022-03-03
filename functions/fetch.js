const functions = require("firebase-functions");
const {firestore} = require(".");

exports.fetch = functions.region("europe-west2").https.onRequest(async (req, res) => {
  const { collection, page, perPage } = req.query;
  const snapshot = await firestore.collection(collection).get();
  let results = {};
  snapshot.forEach(doc => {
    results[doc.id] = doc.data()
  });
  res.set('Access-Control-Allow-Origin', '*').send(results);
})
