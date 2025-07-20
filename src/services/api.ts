import axios from 'axios';

// ⬇️ If your backend runs somewhere else, update this URL.
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // for cookies (refresh token)
});

// Attach accessToken from sessionStorage to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('accessToken');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
