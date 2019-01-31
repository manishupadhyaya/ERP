const mongoose = require('mongoose')

var Form1 = mongoose.Schema({
    advNo: Number,
    transactionId: String,
    bankName: String,
    branchName: String,
    amount: Number,
    clickedForm1: Boolean,
    userId: String
})

var Form1 = module.exports = mongoose.model('Form1',Form1)