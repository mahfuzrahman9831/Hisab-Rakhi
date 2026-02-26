import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { CustomerProvider } from "./Context/CustomerContext";
import { ThemeProvider } from '@emotion/react';
import theme from './assets/theme/theme.js';


ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
  <CustomerProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CustomerProvider>
  </ThemeProvider>
);


