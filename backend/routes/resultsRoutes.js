const express = require("express");
const router = express.Router();

const { getResults, saveResult, getProgress } = require("../controllers/resultsController");
const { authMiddleware } = require("../middleware/auth");

router.get("/progress", getProgress);

router.get("/results", authMiddleware, getResults);

router.post("/results", authMiddleware, saveResult);

module.exports = router;
