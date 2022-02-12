const admin = require('../db/firebase-admin');

const firestore = admin.firestore();

exports.handler = async (event, context, callback) => {
  const { data, collection, toDelete } = JSON.parse(event.body)[0];
  const docRef = firestore.collection(collection).doc("test");
  if (toDelete) {
    await docRef.delete();
  } else {
    await docRef.update(data);
  }
  return {
    statusCode: 200,
    data: JSON.stringify({
      text: "Successfully created document"
    })
  }
}
