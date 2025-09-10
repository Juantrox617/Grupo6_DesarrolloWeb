// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/HomePage';
import MyProfile from './pages/MyProfile';
import Profiles from './pages/Profiles';
import NewPublication from './pages/NewPublication';
import PubDetail from './pages/PubDetail';
import SobreNosotros from './pages/SobreNosotros';

function App() {
  return (
    <div className="App"> {/* ✅ El div va AQUÍ, fuera de <Routes> */}
      <Routes> {/* ✅ Solo UN <Routes>, sin anidamiento */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/crear-publicacion" element={<NewPublication />} />
        <Route path="/publicacion/:id" element={<PubDetail />} />
        <Route path="/SobreNosotros" element={<SobreNosotros />} />
        
      </Routes>
    </div>
  );
}

export default App;