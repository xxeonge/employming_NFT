const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
router.post("/", async (req, res) => {
    res.send("Not Implemented").end();
});

module.exports = router;