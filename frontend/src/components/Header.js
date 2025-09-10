// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Kursum-homepage.png';

function Header() {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <img
        src={logo}
        alt="Logo Kursum"
        style={styles.logo}
        onClick={() => navigate('/homepage')}
      />
      <nav style={styles.nav}>
        <a href="/homepage" style={styles.navLink}>Inicio</a>
        <a
          href="/my-profile"
          onClick={(e) => { e.preventDefault(); navigate('/my-profile'); }}
          style={styles.navLink}
        >
          Mi perfil
        </a>
        <a
          href="/profiles"
          onClick={(e) => { e.preventDefault(); navigate('/profiles'); }}
          style={styles.navLink}
        >
          Perfiles
        </a>
        <a
          href="/about-us"
          onClick={(e) => { e.preventDefault(); navigate('/about-us'); }}
          style={styles.navLink}
        >
          Sobre Nosotros
        </a>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
          }}
          style={styles.logoutButton}
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#2d6a4f',
    color: 'white',
    height: '80px',
    padding: '0 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  logo: {
    width: '250px',
    cursor: 'pointer',
  },
  nav: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  navLink: {
    color: '#95d5b2',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'color 0.3s'
  },
  logoutButton: {
    backgroundColor: '#40916c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'background-color 0.3s'
  }
};

export default Header;