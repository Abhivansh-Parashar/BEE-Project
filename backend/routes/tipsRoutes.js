const express = require("express");
const router = express.Router();

const { getTips } = require("../controllers/tipsController");

router.get("/tips", getTips);

module.exports = router;
