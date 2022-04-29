const functions = require("firebase-functions");

const variables = functions.config();

exports.get_token = functions
  .region("europe-west2")
  .https.onCall((data, context) => {
    if (context.app === undefined) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called from an App Check verified app."
      );
    }
    const {name, value} = data;
    return {result: variables[name][value]};
  });
