const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String },
  googleId: { type: String },
  profilePic: { type: String, default: "" },
  age: { type: String, default: "" },
  bio: { type: String, default: "" },
  university: { type: String, default: "" },
}, { timestamps: true });

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toProfile = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    profilePic: this.profilePic,
    age: this.age,
    bio: this.bio,
    university: this.university,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model("User", userSchema);
