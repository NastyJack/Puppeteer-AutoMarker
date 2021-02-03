const Automarker = require("./MarkAttendance");
const SendMail = require("../../helpers/Email_Utils");
let MarkAttendance = {};

MarkAttendance.SignIn = async (req, res, next) => {
  try {
    if (req.body.passcode == process.env.PASSCODE) {
      let ScriptResult = await Automarker("SIGN IN");
      if (ScriptResult == "script success")
        res.status(200).send("Sign IN completed");
      else {
        throw ScriptResult;
      }
    } else res.status(401).send("Passcode Denied.");
  } catch (error) {
    SendMail.Mail("Sign IN Failed", error);
    console.log("ERROR. Script Faliure at SignIn", error);
    res.status(500).send({ error: error });
  }
};

MarkAttendance.SignOut = async (req, res, next) => {
  try {
    if (req.body.passcode == process.env.PASSCODE) {
      let ScriptResult = await Automarker("SIGN OUT");
      if (ScriptResult == "script success")
        res.status(200).send("Sign OUT completed");
      else throw ScriptResult;
    } else res.status(401).send("Passcode Denied.");
  } catch (error) {
    SendMail.Mail("Sign OUT Failed", error);
    console.log("ERROR. Script Faliure at SignOut", error);
    res.status(500).send({ error: error });
  }
};

module.exports = MarkAttendance;
