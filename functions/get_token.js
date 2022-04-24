const functions = require("firebase-functions");

const variables = functions.config();

exports.get_token = functions
  .region("europe-west2")
  .https.onCall((data, context) => {
    const {name, value} = data;
    return {result: variables[name][value]};
  });
