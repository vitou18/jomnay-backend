const Income = require("../models/Income.js");

// add Income
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { source, amount, date } = req.body;

    if (!source && !amount && !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon: "",
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (e) {
    res.status(500).json({ message: "Error adding income" });
  }
};

// get all Income
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    res.status(200).json(income);
  } catch (e) {
    res.status(500).json({ message: "Error getting income" });
  }
};

// delete income
exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "Error deleting income" });
  }
};
