const Expense = require('../model/expense.js');
const Group = require("../model/group");

const expenseDao = {
    createExpense: async (data) => {
        const newExpense = new Expense(data);
        return await newExpense.save();
    },

    updateExpense: async (data) => {
        const { expenseId, title, description, totalAmount, split, paidBy } = data;
        return await Expense.findByIdAndUpdate(expenseId, {
            title, description, totalAmount, split, paidBy
        }, { new: true });
    },

    deleteExpense: async (expenseId) => {
        return await Expense.findByIdAndDelete(expenseId);
    },

    getExpensesById: async (groupId) => {
        return await Expense.find({ groupId: groupId });
    },
    getExpenseSummary: async (groupId) => {
    const group = await Group.findById(groupId);
    if (!group) return {};
    const lastSettledDate = group.paymentStatus?.isPaid
        ? group.paymentStatus.date: null;
    let expenses;
    if (lastSettledDate) {
        expenses = await Expense.find({
            groupId,
            createdAt: { $gt: lastSettledDate }
        });
    } else {
        expenses = await Expense.find({ groupId });
    }
    const balanceMap = {};
    expenses.forEach((expense) => {
        const { paidBy, totalAmount, split } = expense;
        balanceMap[paidBy] =
            (balanceMap[paidBy] || 0) + totalAmount;
        split.forEach((member) => {
            balanceMap[member.email] =
                (balanceMap[member.email] || 0) - member.amount;
        });
    });
    return balanceMap;
}

};
module.exports = expenseDao;