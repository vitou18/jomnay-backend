const express = require("express");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", protect, getProfile);

module.exports = router;
