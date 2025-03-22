const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { addExpense } = require("../controllers/expenseController");

const router = express.Router();

router.post("/add", protect, addExpense);

module.exports = router;
