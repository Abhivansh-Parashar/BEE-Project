require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

const connectDB = require("./config/db");
const User = require("./models/User");
const TestResult = require("./models/TestResult");
const { authMiddleware, generateToken } = require("./middleware/auth");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "placeholder",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profilePic: profile.photos[0].value,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

app.use(passport.initialize());

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

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      if (!userExists.password && userExists.googleId) {
        userExists.password = password;
        if (name && !userExists.name) userExists.name = name;
        await userExists.save();
        return res.status(200).json({ message: "Password set successfully. You can now log in with email and password." });
      }

      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = await User.create({ name, email: normalizedEmail, password });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = (email || "").trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    if (!user.password) {
      return res.status(400).json({ error: "This account uses Google sign-in. First set a password using Sign Up with the same email, or continue with Google." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user._id);
    
    res.json({
      message: "Login successful",
      token,
      user: user.toProfile(),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login?error=true" }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`http://localhost:5173/login?token=${token}`);
  }
);

app.get("/api/user/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.toProfile());
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.toProfile());
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/tips", (req, res) => {
  res.json(interviewTips);
});

app.get("/api/progress", async (req, res) => {
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
});

app.put("/api/user/:id", authMiddleware, upload.single("profilePic"), async (req, res) => {
  try {
    const { age, bio, university, profilePicUrl } = req.body;
    let updateFields = { age, bio, university };

    if (req.file) {
      updateFields.profilePic = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    } else if (profilePicUrl) {
      updateFields.profilePic = profilePicUrl;
    }

    Object.keys(updateFields).forEach(key => updateFields[key] === undefined && delete updateFields[key]);

    const updatedUser = await User.findByIdAndUpdate(req.userId, updateFields, { new: true });

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Profile updated successfully", user: updatedUser.toProfile() });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/results", authMiddleware, async (req, res) => {
  try {
    const results = await TestResult.find({ userId: req.userId }).sort({ completedAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching results" });
  }
});

app.post("/api/results", authMiddleware, async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
