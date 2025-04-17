import React, { useState, useEffect } from 'react'; //imports core react library w/ hooks
import TransactionForm from './TransactionForm'; //import function files
import TransactionDisplayDelete from './TransactionDisplayDelete'; //import function files
import axios from 'axios'; //import for http methods
import './App.css'; //import styles

function App() {
  const [transactions, setTransactions] = useState([]); //defines a state for storing transactions before pushing to serverside

  useEffect(() => {
    fetchTransactions();
  }, []); //defines an empty array where transactions are stored

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions'); //uses hhtp/axios method
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error); //error message
    }
  }; //function defined in app.js to fetch transactions from mongodb. this is done here because the imported files call this.

  return ( //rendering of the app, and uses custom .js files that define what we want to be displayed. Modular this way
    <div className="App">
      <header>
        <h1>Online Transaction Ledger</h1>
      </header>
      <main>
        <TransactionForm fetchTransactions={fetchTransactions} /> 
        <TransactionDisplayDelete transactions={transactions} fetchTransactions={fetchTransactions} />
      </main>
      <footer>{}</footer>
    </div>
  );
}

export default App; //allows for app to be imported in index.js
