const User = require("../models/User");

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.toProfile());
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.toProfile());
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { age, bio, university, profilePicUrl } = req.body;
    let updateFields = { age, bio, university };

    if (req.file) {
      const PORT = process.env.PORT || 5000;
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
};

module.exports = { getUserById, getCurrentUser, updateUserProfile };
