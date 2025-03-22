const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Total Income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);

    // Total Expenses
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalExpenses: { $sum: "$amount" } } },
    ]);

    // Last 60 Days Income Transactions
    const last60Days = new Date();
    last60Days.setDate(last60Days.getDate() - 60);

    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: last60Days },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

    // Last 30 Days Expense Transactions
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: last30Days },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

    // Last 5 Transactions (Income + Expense)
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({ ...txn.toObject(), type: "income" })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({ ...txn.toObject(), type: "expense" })
      ),
    ].sort((a, b) => b.date - a.date);

    res.json({
      totalBalance:
        (totalIncome[0]?.totalIncome || 0) -
        (totalExpense[0]?.totalExpenses || 0),
      totalIncome: totalIncome[0]?.totalIncome || 0,
      totalExpense: totalExpense[0]?.totalExpenses || 0,
      last30daysExpense: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Error getting dashboard" });
  }
};
