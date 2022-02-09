const admin = require('../db/firebase-admin');

const firestore = admin.firestore();

exports.handler = async function (e, ctx, callback) {
  const snapshot = await firestore.collection("users").get()
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: snapshot
    })
  }
};
