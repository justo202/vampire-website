const functions = require("firebase-functions");
const {GoogleAuth} = require("google-auth-library");
const tinify = require("tinify");
tinify.key = process.env.TINIFY_API_KEY;
const serviceAccount = require("./vampire-research-2ed0a724decf.json");

exports.upload = functions
  .region("europe-west2")
  .https.onCall(async (data, context) => {
    const buff = Buffer.from(data.image, "base64");
    const client = await new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/devstorage.read_write",
      projectId: "vampire-research",
    }).getClient();

    const token = await client.getAccessToken().then((res) => {
      return res.token;
    });

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
