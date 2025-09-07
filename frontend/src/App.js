// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/HomePage';
import MyProfile from './pages/MyProfile';
import Profiles from './pages/Profiles';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/profiles" element={<Profiles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;