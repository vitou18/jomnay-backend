const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  editIncome,
} = require("../controllers/incomeController.js");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/", protect, getAllIncome);
router.delete("/delete/:id", protect, deleteIncome);
router.put("/edit/:id", protect, editIncome);

module.exports = router;
