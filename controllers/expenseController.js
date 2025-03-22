const Expense = require("../models/Expense.js");

// add expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id;
  const { amount, date, category } = req.body;

  if (!amount || !date || !category)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const newExpense = new Expense({
      userId,

      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense" });
  }
};
