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
