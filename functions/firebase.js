const admin = require("firebase-admin");
const {SecretManagerServiceClient} = require("@google-cloud/secret-manager");

let credentials,
  client = new SecretManagerServiceClient();

// Code taken from Step 3 of
// https://medium.com/@shashkiranr/typescript-gcp-secret-manager-firebase-app-engine-multiple-environment-better-credential-45198f3e53e
export const app = async () => {
  if (credentials) {
    return credentials;
  } else {
    const [version] = await client.getSecret({
      name: "projects/444693724107/secrets/service_account/versions/latest",
    });
    const {
      type,
      project_id,
      private_key_id,
      private_key,
      client_email,
      client_id,
      auth_uri,
      token_uri,
      auth_provider_x509_cert_url,
      client_x509_cert_url,
    } = JSON.parse(version.payload.data.toString());

    const params = {
      type: type,
      projectId: project_id,
      privateKeyId: private_key_id,
      privateKey: private_key,
      clientEmail: client_email,
      clientId: client_id,
      authUri: auth_uri,
      tokenUri: token_uri,
      authProviderX509CertUrl: auth_provider_x509_cert_url,
      clientC509CertUrl: client_x509_cert_url,
    };

    credentials = admin.initializeApp({
      credential: admin.credential.cert(params),
      storageBucket: `gs://${project_id}.appspot.com`,
    });

    return credentials;
  }
};

exports.admin = app;
exports.firestore = app.firestore();
