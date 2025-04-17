import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

const TransactionForm = ({ fetchTransactions }) => { //function to post a new transaction to mongodb
  const [amount, setAmount] = useState('');
  const [senderName, setSenderName] = useState('');
  const [method, setMethod] = useState(''); 
  const [memo, setMemo] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/transactions', { //using post method first
        amount,
        senderName,
        method,
        memo,
        date: selectedDate 
      });

      setAmount(''); //clears form fields after successful submission
      setSenderName('');
      setMethod('');
      setMemo('');
      setSelectedDate('');

      fetchTransactions(); //fetch updated transactions after submission and clear
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return ( //display forms
    <div className="transaction-form-container"> 
      <h2>Add Transaction 🤓</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="transaction-input"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="transaction-input"
        />
        <input
          type="text"
          placeholder="Sender Name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          className="transaction-input"
        />
        <input
          type="text"
          placeholder="Method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="transaction-input"
        />
        <input
          type="text"
          placeholder="Memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="transaction-input"
        />
        <button type="submit" className="submit-button">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm; //export for app.js
