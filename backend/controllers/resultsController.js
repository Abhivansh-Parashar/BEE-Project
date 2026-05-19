const jwt = require("jsonwebtoken");
const TestResult = require("../models/TestResult");

const getResults = async (req, res) => {
  try {
    const results = await TestResult.find({ userId: req.userId }).sort({ completedAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching results" });
  }
};

const saveResult = async (req, res) => {
  try {
    const result = new TestResult({
      ...req.body,
      userId: req.userId,
    });
    await result.save();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save test result" });
  }
};

const getProgress = async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
      return res.json({ totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const results = await TestResult.find({ userId: decoded.userId }).sort({ completedAt: -1 });

    if (!results.length) {
      return res.json({ totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0 });
    }

    const latestByTest = new Map();
    for (const result of results) {
      if (!latestByTest.has(result.testId)) {
        latestByTest.set(result.testId, result);
      }
    }

    let totalSolved = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    for (const result of latestByTest.values()) {
      totalSolved += result.score || 0;
      const difficulty = (result.difficulty || "Medium").toLowerCase();
      if (difficulty === "easy") easySolved += result.score || 0;
      else if (difficulty === "hard") hardSolved += result.score || 0;
      else mediumSolved += result.score || 0;
    }

    res.json({ totalSolved, easySolved, mediumSolved, hardSolved });
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.json({ totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0 });
    }
    console.error("Get progress error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getResults, saveResult, getProgress };
