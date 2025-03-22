const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { addIncome } = require("../controllers/incomeController.js");

const router = express.Router();

router.post("/add", protect, addIncome);

module.exports = router;
