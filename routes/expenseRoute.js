const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  addExpense,
  getAllExpenses,
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/", protect, getAllExpenses);

module.exports = router;
