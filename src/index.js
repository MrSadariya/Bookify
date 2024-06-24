import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {UserContextProvider} from './Contexts/UserContext';
import {AlertContextProvider} from './Contexts/AlertContext';
import {CurrentContextProvider} from './Contexts/CurrentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
    <AlertContextProvider>
    <CurrentContextProvider>
    <App/>
    </CurrentContextProvider>
    </AlertContextProvider>
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)

