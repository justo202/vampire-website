var axios = require("axios");
const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY); //CHANGE API KEY LATER TO ENV aeshthg

exports.sendEmail = functions
  .region("europe-west2")
  .https.onCall(async (data, context) => {
  const {
    name,
    email,
    affiliation,
    description,
    reason,
    images,
    feedback,
    token,
  } = data;
  var success = "fail";
  return await axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?
      secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}` 
    )
    .then((res) => {
        const msg = {
          to: "justaslabeikis23@gmail.com", // Change to your recipient
          from: "vampire_enquiries@dundee.ac.uk", // Change to your verified sender
          templateId: 'd-339511a2de714683bb9ed3ae33c5515b',
          dynamicTemplateData: {
            name: name,
            email: email,
            affiliation: affiliation,
            description: description,
            reason: reason,
            images: images,
            feedback: feedback,
          },
        };
        sgMail
          .send(msg)
          .then((response) => {})
          .catch((error) => {
            console.error(error);
            return {
              statusCode: 400,
              body: success,
            };
          });
        success = "success";
        return {
          statusCode: 200,
          body: success,
        };
      
    });
  });
