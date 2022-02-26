const {default: axios} = require('axios');
const getUuidByString = require('uuid-by-string');
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const {ieeeXploreSearch, googleScholarSearch, pubMedSearch, parseString} = require('./create');
admin.initializeApp({}, "main");
const firestore = admin.firestore();
const bulkWriter = firestore.bulkWriter();

exports.update = functions.region("europe-west2").https.onRequest(async (req, res) => {
  const { data, collection, toDelete, id } = req.body;
  if (toDelete) {
    firestore.collection(collection).doc(id).delete();
    res.json({statusCode: 200, message: `Item with ID: ${id} has been deleted`})
    return;
  }

  const docRef = firestore
  .collection(collection)
  .doc(data.id);

  docRef.set(data.body, {merge: true});

  res.json({result: `Message with ID: ${docRef.id} added.`});
});


exports.create = functions.region("europe-west2").https.onRequest(async (req, res) => {
  let articlesAdded = 0;
  const { collection, author } = req.body;
  const {articles: ieeeArticles} = await ieeeXploreSearch(author);
  const scholRes = await googleScholarSearch(author);
  const pubMedRes = await pubMedSearch(author);

  for (let item in pubMedRes) {
    let ref = firestore.collection(collection).doc(getUuidByString(parseString(pubMedRes[item].title.match(/[\p{Letter}\p{Mark}\s]+/gu)[0].split(" ").join(""))));
    bulkWriter.set(ref, pubMedRes[item]);
    articlesAdded++;
  }

  scholRes.forEach(article => {
    let ref = firestore.collection(collection).doc(getUuidByString(parseString(article.value.citation.title.match(/[\p{Letter}\p{Mark}\s]+/gu)[0].split(" ").join(""))));
    bulkWriter.set(ref, article.value.citation);
    articlesAdded++;
  });

  ieeeArticles.forEach(article => {
    let ref = firestore.collection(collection).doc(getUuidByString(parseString(article.title.match(/[\p{Letter}\p{Mark}\s]+/gu)[0].split(" ").join(""))));
    bulkWriter.set(ref, article);
    articlesAdded++;
  });

  await bulkWriter.close();
  res.json({articlesAdded, ieeeArticles, scholRes, pubMedRes})
});
