const admin = require('../db/firebase-admin');

const firestore = admin.firestore();
const bulkWriter = firestore.bulkWriter();

exports.handler = async (event, context, callback) => {
  const { data: input, collection } = JSON.parse(event.body);
  for (let item in input) {
    let ref = firestore.collection(collection).doc(input[item].uid)
    bulkWriter.set(ref, input[item]);
  }
  await bulkWriter.close().then(() => {
    console.log("yes")
  })
  return {
    statusCode: 200,
    data: JSON.stringify({
      input
    })
  }
}
