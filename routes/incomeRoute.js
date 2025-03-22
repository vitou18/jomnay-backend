const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  addIncome,
  getAllIncome,
  deleteIncome,
} = require("../controllers/incomeController.js");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/", protect, getAllIncome);
router.delete("/delete/:id", protect, deleteIncome);

module.exports = router;
