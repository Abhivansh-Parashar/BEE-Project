const interviewTips = [
  {
    id: 1,
    title: "Explain Your Thought Process",
    content: "Speak while solving problems. Interviewers evaluate your approach as much as the final answer.",
  },
  {
    id: 2,
    title: "Clarify Requirements First",
    content: "Before coding, ask clarifying questions about input size, edge cases, and expected constraints.",
  },
  {
    id: 3,
    title: "Start With a Brute Force Plan",
    content: "Briefly mention a simple baseline and then optimize. This shows structured problem-solving.",
  },
  {
    id: 4,
    title: "Test With Edge Cases",
    content: "Always validate your solution with edge cases such as empty input, duplicates, and single-element data.",
  },
  {
    id: 5,
    title: "Manage Time in Rounds",
    content: "If stuck for too long, communicate your blocker and pivot. Good communication can save the interview.",
  },
  {
    id: 6,
    title: "Review Complexity Clearly",
    content: "End by stating time and space complexity and one potential improvement if given more time.",
  },
  {
    id: 7,
    title: "Narrate Trade-offs",
    content: "When choosing one approach over another, clearly state what you gain and what you sacrifice.",
  },
  {
    id: 8,
    title: "Use Meaningful Test Cases",
    content: "Pick one normal case, one edge case, and one stress case to demonstrate confidence in your solution.",
  },
  {
    id: 9,
    title: "Keep Variable Names Clear",
    content: "Readable code helps interviewers follow your logic quickly and reduces avoidable mistakes.",
  },
  {
    id: 10,
    title: "Ask for Feedback During Solution",
    content: "Check in with the interviewer after your high-level plan to avoid solving a different problem.",
  },
  {
    id: 11,
    title: "Practice Verbal Summaries",
    content: "At the end, summarize your algorithm in 30 seconds. This leaves a strong final impression.",
  },
  {
    id: 12,
    title: "Handle Mistakes Calmly",
    content: "If you notice a bug, explain the fix calmly. Interviewers value debugging maturity.",
  },
];

const getTips = (req, res) => {
  res.json(interviewTips);
};

module.exports = { getTips };
