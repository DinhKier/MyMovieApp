// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // <--- Thêm dòng này
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
