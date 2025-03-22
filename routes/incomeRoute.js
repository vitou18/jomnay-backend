const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  addIncome,
  getAllIncome,
} = require("../controllers/incomeController.js");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/", protect, getAllIncome);

module.exports = router;
