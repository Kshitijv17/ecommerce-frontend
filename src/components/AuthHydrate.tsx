'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import api from '@/services/api';

export default function AuthHydrate() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      api.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          setAuth(res.data, token);
        })
        .catch(() => {
          clearAuth();
          sessionStorage.removeItem('accessToken');
        });
    }
  }, [setAuth, clearAuth]);

  return null;
}
