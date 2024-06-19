import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {UserContextProvider} from './Contexts/UserContext';
import {AlertContextProvider} from './Contexts/AlertContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
    <AlertContextProvider>
    <App/>
    </AlertContextProvider>
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)

