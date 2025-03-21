import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {AlertContextProvider} from './Contexts/AlertContext';
import {CurrentContextProvider} from './Contexts/CurrentContext';
import {SidebarProvider} from "./Contexts/SidebarContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <SidebarProvider>
    <AlertContextProvider>
    <CurrentContextProvider>
    <App/>
    </CurrentContextProvider>
    </AlertContextProvider>
    </SidebarProvider>
    </BrowserRouter>
  </React.StrictMode>
)

