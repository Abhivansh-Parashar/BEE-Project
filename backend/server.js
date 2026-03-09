const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const questions = [
  { id: 1, title: "Two Sum", difficulty: "Easy", category: "Arrays", solved: false, url: "https://leetcode.com/problems/two-sum/" },
  { id: 2, title: "Valid Parentheses", difficulty: "Easy", category: "Stack", solved: false, url: "https://leetcode.com/problems/valid-parentheses/" },
  { id: 3, title: "Merge Two Sorted Lists", difficulty: "Easy", category: "Linked List", solved: false, url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
  { id: 4, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", category: "Arrays", solved: false, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { id: 5, title: "Valid Palindrome", difficulty: "Easy", category: "String", solved: false, url: "https://leetcode.com/problems/valid-palindrome/" },
  { id: 6, title: "Invert Binary Tree", difficulty: "Easy", category: "Trees", solved: false, url: "https://leetcode.com/problems/invert-binary-tree/" },

  { id: 7, title: "Longest Substring Without Repeating", difficulty: "Medium", category: "String", solved: false, url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { id: 8, title: "3Sum", difficulty: "Medium", category: "Arrays", solved: false, url: "https://leetcode.com/problems/3sum/" },
  { id: 9, title: "Binary Tree Level Order Traversal", difficulty: "Medium", category: "Trees", solved: false, url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { id: 10, title: "Clone Graph", difficulty: "Medium", category: "Graphs", solved: false, url: "https://leetcode.com/problems/clone-graph/" },
  { id: 11, title: "Course Schedule", difficulty: "Medium", category: "Graphs", solved: false, url: "https://leetcode.com/problems/course-schedule/" },
  { id: 12, title: "Implement Trie (Prefix Tree)", difficulty: "Medium", category: "Trie", solved: false, url: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
  { id: 13, title: "Coin Change", difficulty: "Medium", category: "Dynamic Programming", solved: false, url: "https://leetcode.com/problems/coin-change/" },

  { id: 14, title: "Merge K Sorted Lists", difficulty: "Hard", category: "Linked List", solved: false, url: "https://leetcode.com/problems/merge-k-sorted-lists/" },
  { id: 15, title: "Find Median from Data Stream", difficulty: "Hard", category: "Heap", solved: false, url: "https://leetcode.com/problems/find-median-from-data-stream/" },
  { id: 16, title: "Word Search II", difficulty: "Hard", category: "Trie", solved: false, url: "https://leetcode.com/problems/word-search-ii/" },
  { id: 17, title: "Alien Dictionary", difficulty: "Hard", category: "Graphs", solved: false, url: "https://leetcode.com/problems/alien-dictionary/" },
  { id: 18, title: "N-Queens", difficulty: "Hard", category: "Backtracking", solved: false, url: "https://leetcode.com/problems/n-queens/" },
];

const tips = [
  { id: 1, title: "Clarify the Problem", content: "Before writing any code, repeat the question back to the interviewer to ensure you fully understand the requirements and edge cases." },
  { id: 2, title: "Communicate Clearly", content: "Always talk through your thought process. An interviewer wants to see how you think, not just the final code." },
  { id: 3, title: "Start with Brute Force", content: "If you're stuck, start by explaining the naive/brute force approach. It gets you talking and often leads naturally to the optimized solution." },
  { id: 4, title: "Know Your Resume", content: "Be prepared to explain the architecture, challenges, and your specific contributions to every single project listed on your resume." },
  { id: 5, title: "Mock Interviews", content: "Practice with a friend or use platforms like Pramp to get used to the pressure of coding while someone watches." },
  { id: 6, title: "Master Big O Notation", content: "Always be ready to state the time and space complexity of your solution without prompting." },
  { id: 7, title: "Write Clean Code", content: "Use descriptive variable names, abstract logic into helper functions, and ensure your code is readable." },
  { id: 8, title: "Test Your Code", content: "Once you finish writing, mentally walk through your code with a simple test case to catch off-by-one errors." }
];

let progress = {
  totalSolved: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0
};

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let users = [];
  try {
    if (fs.existsSync("users.json")) {
      const data = fs.readFileSync("users.json", "utf8");
      users = data ? JSON.parse(data) : [];
    }
  } catch (err) {
    console.error("Error reading users.json:", err);
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const newUser = { id: newId, name, email, password };
  users.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.status(201).json({ message: "User created successfully", user: { id: newUser.id, name, email } });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  let users = [];
  try {
    if (fs.existsSync("users.json")) {
      const data = fs.readFileSync("users.json", "utf8");
      users = data ? JSON.parse(data) : [];
    }
  } catch (err) {
    console.error("Error reading users.json:", err);
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.get("/api/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  let users = [];
  try {
    if (fs.existsSync("users.json")) {
      const data = fs.readFileSync("users.json", "utf8");
      users = data ? JSON.parse(data) : [];
    }
  } catch (err) {
    console.error("Error reading users.json:", err);
  }

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Return user without password
  const { password, ...userProfile } = user;
  res.json(userProfile);
});

app.put("/api/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { age, bio, university } = req.body;

  let users = [];
  try {
    if (fs.existsSync("users.json")) {
      const data = fs.readFileSync("users.json", "utf8");
      users = data ? JSON.parse(data) : [];
    }
  } catch (err) {
    console.error("Error reading users.json:", err);
    return res.status(500).json({ error: "Server error" });
  }

  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update allowed fields
  users[userIndex] = {
    ...users[userIndex],
    age: age !== undefined ? age : users[userIndex].age,
    bio: bio !== undefined ? bio : users[userIndex].bio,
    university: university !== undefined ? university : users[userIndex].university
  };

  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  const { password, ...updatedProfile } = users[userIndex];
  res.json({ message: "Profile updated successfully", user: updatedProfile });
});

app.get("/api/questions", (req, res) => {
  res.json(questions);
});

app.get("/api/tips", (req, res) => {
  res.json(tips);
});

app.get("/api/progress", (req, res) => {
  res.json(progress);
});

app.post("/api/progress/:id", (req, res) => {
  const qId = parseInt(req.params.id);
  const { solved } = req.body;
  const question = questions.find(q => q.id === qId);

  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  if (question.solved !== solved) {
    question.solved = solved;

    if (solved) {
      progress.totalSolved++;
      if (question.difficulty === "Easy") progress.easySolved++;
      else if (question.difficulty === "Medium") progress.mediumSolved++;
      else if (question.difficulty === "Hard") progress.hardSolved++;
    } else {
      progress.totalSolved--;
      if (question.difficulty === "Easy") progress.easySolved--;
      else if (question.difficulty === "Medium") progress.mediumSolved--;
      else if (question.difficulty === "Hard") progress.hardSolved--;
    }
  }

  res.json({ message: "Progress updated successfully", progress, question });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
