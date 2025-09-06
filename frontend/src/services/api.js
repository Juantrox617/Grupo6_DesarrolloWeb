import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia por la URL de tu backend
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;