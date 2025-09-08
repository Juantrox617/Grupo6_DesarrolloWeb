import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; //IMPORTAMOS BROWSERrOUTER AQUI
import { AuthProvider } from './context/AuthContext'; // Importnuestro proveedor de autenticación


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>{/* Envuelve la app con el enrutador */}
      <AuthProvider> {/*y con el proveedor e autnticacion. */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
