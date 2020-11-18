const Selenium = require("./MarkAttendance");
let MarkAttendance = {};

MarkAttendance.SignIn = async (req, res, next) => {
  try {
    if (req.body.passcode == "12345") {
      let ScriptResult = await Selenium("SIGN IN");
      if (ScriptResult == "script success")
        res.status(200).send("Sign IN completed");
      else throw ScriptResult;
    }
  } catch (error) {
    console.log("error = ", error);
    res.status(500).send({ error: error });
  }
};

MarkAttendance.SignOut = async (req, res, next) => {
  try {
    if (req.body.passcode == "12345") {
      let ScriptResult = await Selenium("SIGN OUT");
      if (ScriptResult == "script success")
        res.status(200).send("Sign OUT completed");
      else throw ScriptResult;
    }
  } catch (error) {
    console.log("error = ", error);
    res.status(500).send({ error: error });
  }
};

module.exports = MarkAttendance;
