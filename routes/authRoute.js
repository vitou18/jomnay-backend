const express = require("express");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController.js");
const { protect } = require("../middlewares/authMiddleware.js");
const upload = require("../middlewares/uploadMiddleware.js");

const router = express.Router();

// Auth routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", protect, getProfile);

// Upload image
router.post("/uploads", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}:://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.status(200).json({ imageUrl });
});

module.exports = router;
