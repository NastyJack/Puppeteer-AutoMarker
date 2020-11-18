const express = require("express");
router = express.Router();
const Operations = require("./controller");
const bodyParser = require("body-parser").json();

router.get("/operations", bodyParser, Operations);

module.exports = router;
