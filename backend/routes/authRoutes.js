const express = require("express");
const passport = require("passport");
const router = express.Router();

const { signup, login, googleCallback } = require("../controllers/authController");

router.post("/signup", signup);

router.post("/login", login);

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login?error=true" }),
  googleCallback
);

module.exports = router;
