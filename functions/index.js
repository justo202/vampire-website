const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();
const bulkWriter = firestore.bulkWriter();

const fetch = require('./fetch');
const update = require('./update');
const upload = require('./upload');
const create = require('./create');
const get_token = require('./get_token');

exports.bulkWriter = bulkWriter;
exports.firestore = firestore;

exports.fetch = fetch.fetch;
exports.update = update.update;
exports.create = create.create;
exports.upload = upload.upload;
exports.get_token = get_token.get_token;


