const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  editIncome,
  downloadIncome,
} = require("../controllers/incomeController.js");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/", protect, getAllIncome);
router.delete("/delete/:id", protect, deleteIncome);
router.put("/edit/:id", protect, editIncome);
router.get("/download", protect, downloadIncome);

module.exports = router;
