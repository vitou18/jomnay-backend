const Income = require("../models/Income.js");
const xlsx = require("xlsx");

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

// edit income
exports.editIncome = async (req, res) => {
  try {
    const { source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res
        .status(400)
        .json({ message: "At least one field needs to be updated" });
    }

    const id = req.params.id;

    const updateIncome = await Income.findByIdAndUpdate(
      id,
      {
        source,
        amount,
        date: new Date(date),
      },
      { new: true }
    );

    if (!updateIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json(updateIncome);
  } catch (e) {
    res.status(500).json({ message: "Error updating income" });
  }
};

// download income
exports.downloadIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");

    res.download("income_details.xlsx");
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};
