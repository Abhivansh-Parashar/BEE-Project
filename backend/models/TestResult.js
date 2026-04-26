const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  testId: { type: String, required: true },
  subject: { type: String, required: true },
  testName: { type: String, required: true },
  difficulty: { type: String, default: "Medium" },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  percentage: { type: Number, required: true },
  answers: [{
    questionId: Number,
    selected: Number,
    correct: Number,
    topic: String,
    isCorrect: Boolean,
  }],
  weakTopics: [String],
  timeTaken: { type: Number, default: 0 },
  completedAt: { type: Date, default: Date.now },
});

testResultSchema.index({ userId: 1, testId: 1 });

module.exports = mongoose.model("TestResult", testResultSchema);
