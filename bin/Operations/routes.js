const express = require("express");
router = express.Router();
const Operations = require("./controller");

router.get("/operations", Operations);

module.exports = router;
