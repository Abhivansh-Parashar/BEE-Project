const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const { getUserById, getCurrentUser, updateUserProfile } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.get("/me", authMiddleware, getCurrentUser);

router.get("/user/:id", authMiddleware, getUserById);

router.put("/user/:id", authMiddleware, upload.single("profilePic"), updateUserProfile);

module.exports = router;
