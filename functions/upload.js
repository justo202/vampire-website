const functions = require("firebase-functions");
const {GoogleAuth} = require("google-auth-library");
const tinify = require("tinify");
const {SecretManagerServiceClient} = require("@google-cloud/secret-manager");

const client = new SecretManagerServiceClient();

exports.upload = functions
  .region("europe-west2")
  .https.onCall(async (data, context) => {
    const key = await client
      .accessSecretVersion({
        name: "projects/444693724107/secrets/TINIFY_API_KEY/versions/1",
      })
      .then((res) => {
        tinify.key = process.env.TINIFY_API_KEY;
      });

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
