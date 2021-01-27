require("dotenv").config({ path: "./credentials.env" });

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

var Operations = require("./bin/Operations/routes");
var MarkAttendance = require("./bin/MarkAttendance/routes");
var Script = require("./bin/MarkAttendance/MarkAttendance");

app.get("/", function (req, res) {
  res.send("This is Home route");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Operations);
app.use("/operations", MarkAttendance);

//Script();

app.listen(process.env.PORT, function () {
  console.log("\n > Ready on http://localhost:" + process.env.PORT);
});
