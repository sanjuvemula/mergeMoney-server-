const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    title:{type:String, required: true},
    description: { type: String, required: false },
    amount: {type: Number, required:true},
    split: [
        {
            email: {type: String, required: true},
            amount: {type: Number, required: true}
        }
    ],
    paidBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Expense', expenseSchema);