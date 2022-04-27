var axios = require("axios");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY); //CHANGE API KEY LATER TO ENV aeshthg

exports.handler = async (event, context, callback) => {
  const {
    name,
    email,
    affiliation,
    description,
    reason,
    images,
    feedback,
    token,
  } = JSON.parse(event.body);
  var success = "fail";

  await axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?
      secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}` 
    )
    .then((res) => {
      if (res.data.success) {
        const msg = {
          to: "justaslabeikis23@gmail.com", // Change to your recipient
          from: "vampire_enquiries@dundee.ac.uk", // Change to your verified sender
          templateId: process.env.SENDGRID_TEMPLATE_ID,
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
          });
        success = "success";
      }

      return callback(null, {
        statusCode: 200,
        body: success,
      });
    });
};
