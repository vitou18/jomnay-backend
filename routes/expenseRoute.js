const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  addExpense,
  getAllExpenses,
  deleteExpense,
  editExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/", protect, getAllExpenses);
router.delete("/delete/:id", protect, deleteExpense);
router.put("/edit/:id", protect, editExpense);

module.exports = router;
