require("dotenv").config({ path: "./credentials.env" });
var Selenium = require("./bin/MarkAttendance");

Selenium();
