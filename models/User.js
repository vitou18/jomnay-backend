const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

// create schema
const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileUrl: { type: String, default: null },
  },
  { timestamps: true }
);

// hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 10);

  next();
});

// compare password
UserSchema.methods.comparePassword = async function (userPassword) {
  return await bcryptjs.compare(userPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
