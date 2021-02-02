var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  // service: "gmail",
  // port: 2526,
  // auth: {
  //   user: process.env.EMAIL_SENDER,
  //   pass: process.env.EMAIL_PWD,
  // },

  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PWD,
  },
});

function setEmailPayload(scriptResults, error) {
  if (scriptResults == "Sign OUT Failed")
    return (mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_RECIPIENT,
      subject: "FAILED AT SIGN OUT",
      text: "",
      html: "<span>Error = " + error + "</span>",
    });
  if (scriptResults == "Sign IN Failed")
    return (mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_RECIPIENT,
      subject: "FAILED AT SIGN IN",
      text: "",
      html: "<span>Error = " + error + "</span>",
    });
}
module.exports = {
  Mail: function (scriptResults, error) {
    let mailOptions = setEmailPayload(scriptResults, error);
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("E-Mail sent: ", info.messageId);
    });
  },
};
