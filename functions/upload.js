const functions = require("firebase-functions");
const tinify = require("tinify");
tinify.key = process.env.TINIFY_API_KEY;

exports.upload = functions
  .region("europe-west2")
  .https.onCall(async (data, context) => {
    const buff = Buffer.from(data.image, "base64");

    return tinify.fromBuffer(buff).store({
      service: "gcs",
      gcp_access_token: process.env.GOOGLE_ACCESS_TOKEN,
      headers: {
        "Cache-Control": "public, max-age: 31536000",
      },
      path: `vampire-research.appspot.com/${data.path}`,
    });
  });
