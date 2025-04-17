const express = require('express'); //require express 
const router = express.Router(); //define route for middleware and routing
const Transaction = require('./transaction'); //require our transaction.js file so data can be written/pulled

//route to add a new transaction
router.post('/', async (req, res) => {
  try {
    const { amount, senderName, method, memo } = req.body;

    const newTransaction = new Transaction({ //creates new tx
      amount,
      senderName,
      method,
      memo
    });

    await newTransaction.save(); //saves new tx

    res.status(201).json(newTransaction); //success & error handling
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//route to fetch all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find(); //fetching logic

    res.json(transactions); //send found tx
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//route to delete a transaction
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; //find transaction id via and delete
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router; //export for use up the stack