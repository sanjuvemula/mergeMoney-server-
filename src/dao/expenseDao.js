const { get } = require('mongoose');
const Expense = require('../model/expense.js');

const expenseDao = {
    createExpense: async (data) => {
            const newExpense = new Expense(data);
            return await newExpense.save();
    },

    updateExpense: async (data) => {
        const { expenseId, title, description, amount, split, paidBy } = data;
        return await Expense.findByIdAndUpdate(expenseId, {
            title, description, amount, split, paidBy
        }, { new: true });
    },

    deleteExpense: async (expenseId) => {
        return await Expense.findByIdAndDelete(expenseId);
    },

    getExpensesById: async (groupId) => {
        return await Expense.find({ groupId: groupId });
    }
}

module.exports = expenseDao;