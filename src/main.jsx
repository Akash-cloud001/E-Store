import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './contexts/UserProvider';
import App from './App.jsx';
import './index.css';
import { UserAuthProvider } from './contexts/UserAuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserAuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </UserAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
