var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  service: "gmail",
  port: 2526,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PWD,
  },
});

function setEmailPayload(scriptResults, error) {
  if (scriptResults == "Sign IN Success")
    return (mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_RECIPIENT,
      subject: "SIGNED IN",
      text:
        "You have successfully signed in to greytHR at " +
        new Date().toLocaleTimeString(),
      html: "",
    });
  if (scriptResults == "Sign IN Failed")
    return (mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_RECIPIENT,
      subject: "FAILED AT SIGN IN",
      text: "",
      html: "<span>Error = " + error + "</span>",
    });
  if (scriptResults == "Sign OUT Success")
    return (mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_RECIPIENT,
      subject: "SIGNED OUT",
      text:
        "You have successfully signed out of greytHR at " +
        new Date().toLocaleTimeString(),
      html: "",
    });
  if (scriptResults == "Sign OUT Failed")
    return (mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_RECIPIENT,
      subject: "FAILED AT SIGN OUT",
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
