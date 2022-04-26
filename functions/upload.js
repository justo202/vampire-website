const functions = require("firebase-functions");
const {GoogleAuth} = require("google-auth-library");
const tinify = require("tinify");
// authenticates TINIFY API KEY
tinify.key = process.env.TINIFY_API_KEY;

exports.upload = functions
  .region("europe-west2")
  .https.onCall(async (data, context) => {
    // can assume at this point that the file is of type image as this was handled in front-end
    const buff = Buffer.from(data.image, "base64");

    // initialises a new GoogleAuth client instance
    const client = await new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/devstorage.read_write",
      projectId: "vampire-research",
    }).getClient();

    // stores gcp token to be used in store() request
    const token = await client.getAccessToken().then((res) => res.token);

    // stores compressed image in Firebase Storage at path specified by front-end request
    const meta = tinify.fromBuffer(buff).store({
      service: "gcs",
      gcp_access_token: token,
      headers: {
        "Cache-Control": "public, max-age: 31536000",
      },
      path: `vampire-research.appspot.com/${data.path}`,
    });

    return {path: `vampire-research.appspot.com/${data.path}`, meta};
  });
