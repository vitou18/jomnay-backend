const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

// generate the token
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

// register user
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileUrl } = req.body;

  // validate missing fields
  if (!fullName) res.status(400).json({ message: "Full name is required" });
  if (!email) res.status(400).json({ message: "Email is required" });
  if (!password) res.status(400).json({ message: "Password is required" });

  try {
    const existingEmail = await User.findOne({ email });

    // check if email already exists
    if (existingEmail)
      res.status(400).json({ message: "Email already exists" });

    // create user
    const user = await User.create({
      fullName,
      email,
      password,
      profileUrl,
    });

    res.status(200).json({ id: user.id, user, token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: "Error register user", error: e.message });
  }
};
