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

// delete expense
exports.deleteExpense = async (req, res) => {
  const id = req.params.id;

  try {
    await Expense.findByIdAndDelete(id);

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "Error deleting expense" });
  }
};

// edit expense

exports.editExpense = async (req, res) => {
  const id = req.params.id;
  const { amount, date, category } = req.body;

  if (!amount || !date || !category)
    return res
      .status(400)
      .json({ message: "At least one field needs to be updated" });

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      {
        category,
        amount,
        date: new Date(date),
      },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (e) {
    res.status(500).json({ message: "Error updating expense" });
  }
};
