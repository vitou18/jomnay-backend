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

// login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (e) {
    res.status(500).json({ message: "Error login user", error: e.message });
  }
};

// get userinfo
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: "Error get user info", error: e.message });
  }
};
