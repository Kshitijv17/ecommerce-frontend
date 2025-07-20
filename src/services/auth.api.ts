import api from './api';

// Login
export async function login(email: string, password: string) {
  const res = await api.post('/auth/login', { email, password });
  return res.data; // expects { user, accessToken }
}

// Register
export async function register(name: string, email: string, password: string) {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data;
}

// Logout
export async function logout() {
  await api.post('/auth/logout');
}
