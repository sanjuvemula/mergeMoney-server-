const expenseDao = require('../dao/expenseDao');

const expenseController = {

  create: async (req, res) => {
    try {
      const expense = await expenseDao.createExpense(req.body);
      res.status(201).json({
        message: 'Expense created successfully',
        expenseId: expense._id
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Error creating expense'
      });
    }
  },

  update: async (req, res) => {
    try {
      const updatedExpense = await expenseDao.updateExpense(req.body);
      if (!updatedExpense) {
        return res.status(404).json({
          message: 'Expense not found'
        });
      }
      res.status(200).json(updatedExpense);
    } catch (err) {
      res.status(500).json({
        message: 'Error updating expense'
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { expenseId } = req.params;
      const deletedExpense = await expenseDao.deleteExpense(expenseId);

      if (!deletedExpense) {
        return res.status(404).json({
          message: 'Expense not found'
        });
      }
      res.status(200).json({
        message: 'Expense deleted successfully'
      });
    } catch (err) {
      res.status(500).json({
        message: 'Error deleting expense'
      });
    }
  },

  getByGroup: async (req, res) => {
    try {
      const { groupId } = req.params;
      const expenses = await expenseDao.getExpensesById(groupId);
      res.status(200).json(expenses);
    } catch (err) {
      res.status(500).json({
        message: 'Error fetching expenses'
      });
    }
  },
  summary: async (req, res) => {
    try {
      const { groupId } = req.params;
      const summary = await expenseDao.getExpenseSummary(groupId);

      res.status(200).json(summary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching expense summary" });
    }
  }
};

module.exports = expenseController;
