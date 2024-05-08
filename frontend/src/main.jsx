import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './styles/nav.css';
import './styles/pages.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/sharedlayout.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
