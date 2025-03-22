const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getDashboard } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", protect, getDashboard);

module.exports = router;
