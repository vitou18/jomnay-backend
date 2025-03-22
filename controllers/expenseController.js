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

// get all expenses
exports.getAllExpenses = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    res.status(200).json(expense);
  } catch (e) {
    res.status(500).json({ message: "Error getting expenses" });
  }
};
