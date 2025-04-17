import React from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

const TransactionDisplayDelete = ({ transactions, fetchTransactions }) => {//function to fetch transactions and display them, as well as the ability to delete. 
  const handleDeleteTransaction = async (id) => {
    try {
      const response = await axios.delete(`/api/transactions/${id}`); //delete the tx with found mongo id
      if (response.status === 200) { //if deletion was successful, fetch
        fetchTransactions();
      }
    } catch (error) {
      console.error('Error deleting transaction:', error); //or throw an error
    }
  };

  return ( //display logic 
    <div className="transaction-display-container"> 
      <h2>Transaction History</h2>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li key={transaction._id} className="transaction-item">
            <p><strong>Amount: $</strong> {transaction.amount}</p>
            <p><strong>Sender Name:</strong> {transaction.senderName}</p>
            <p><strong>Method:</strong> {transaction.method}</p>
            <p><strong>Memo:</strong> {transaction.memo}</p>
            <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
            {}
            <button onClick={() => handleDeleteTransaction(transaction._id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionDisplayDelete; //export for app.js to be rendered out
