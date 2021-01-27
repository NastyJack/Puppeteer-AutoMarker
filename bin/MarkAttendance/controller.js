const Automarker = require("./MarkAttendance");
let MarkAttendance = {};

MarkAttendance.SignIn = async (req, res, next) => {
  console.log("I m inside signIn route");
  try {
    if (req.body.passcode == process.env.PASSCODE) {
      let ScriptResult = await Automarker("SIGN IN");
      if (ScriptResult == "script success")
        res.status(200).send("Sign IN completed");
      else {
        console.log("I m insdie if block like a madman", ScriptResult);
        throw ScriptResult;
      }
    } else res.status(401).send("Passcode Denied.");
  } catch (error) {
    console.log("ERROR. Script Faliure :", error);
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
    console.log("ERROR. Script Faliure :", error);
    res.status(500).send({ error: error });
  }
};

module.exports = MarkAttendance;
