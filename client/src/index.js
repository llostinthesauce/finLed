import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); //render out App
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);

reportWebVitals();
