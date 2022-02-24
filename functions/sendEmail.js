var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'vampire.bot.donotreply@gmail.com',
      pass: 'testbot85'
    }
  });

exports.handler =  async (event, context, callback)  => {
  const {name, email, affiliation, description, reason, images, feedback  } = JSON.parse(event.body);

  const message = `
    <p>New contact request received</p>
    <h5>Name</h5>
    <p>${name}</p>
    <h5>Email address</h5>
    <p>${email}</p>
    <h5>Please enter your Affiliation</h5>
    <p>${affiliation}</p>
    <h5>Describe your project</h5>
    <p>${description}</p>
    <h5>Why is VAMPIRE needed?</h5>
    <p>${reason}</p>
    <h5>How many images would you like to measure with VAMPIRE, and from how many patients?</h5>
    <p>${images}</p>
    <h5>How did you hear of VAMPIRE?</h5>
    <p>${feedback}</p>
  `


    var mailOptions = {
      from: 'vampire.bot.donotreply@gmail.com',
      to: 'justaslabeikis23@gmail.com',
      subject: 'New VAMPIRE contact request received!',
      html: message
    };
    
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
    return callback(null, {
      statusCode: 200,
      body: "success"
    })
  }