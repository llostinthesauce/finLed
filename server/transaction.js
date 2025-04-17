const mongoose = require('mongoose'); //import mongoose 

const transactionSchema = new mongoose.Schema({ //define the schemna for a transaction to be stored in mongodb
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  memo: String
});

const Transaction = mongoose.model('Transaction', transactionSchema); //create a model from the data

module.exports = Transaction; //export the model
