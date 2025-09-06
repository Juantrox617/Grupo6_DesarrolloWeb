// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';
import NewPublication from './pages/NewPublication';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Puedes usar el login o saltarlo */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Rutas para diseño (accesibles sin login) */}
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/crear-publicacion" element={<NewPublication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;