const express = require("express");
router = express.Router();
const MarkAttendance = require("./controller");
const bodyParser = require("body-parser").json();

router.post("/signIn", bodyParser, MarkAttendance.SignIn);
router.post("/signOut", bodyParser, MarkAttendance.SignOut);

module.exports = router;
