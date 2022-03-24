const admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore();
const bulkWriter = firestore.bulkWriter();

exports.admin = admin;
exports.firestore = firestore;
exports.bulkWriter = bulkWriter;
