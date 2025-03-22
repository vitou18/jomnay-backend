const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  addExpense,
  getAllExpenses,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/", protect, getAllExpenses);
router.delete("/delete/:id", protect, deleteExpense);

module.exports = router;
