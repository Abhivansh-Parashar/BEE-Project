const User = require("../models/User");
const { generateToken } = require("../middleware/auth");

const signup = async (req, res) => {
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
};

const login = async (req, res) => {
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
};

const googleCallback = (req, res) => {
  const token = generateToken(req.user._id);
  res.redirect(`http://localhost:5173/login?token=${token}`);
};

module.exports = { signup, login, googleCallback };
