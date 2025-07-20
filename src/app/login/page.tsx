'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/auth.api';
import { useAuthStore } from '@/store/authStore';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const onSubmit = async (data: { email: string; password: string }) => {
    setError(null);
    setLoading(true);
    try {
      const res = await login(data.email, data.password);
      setAuth(res.user, res.accessToken);
      sessionStorage.setItem('accessToken', res.accessToken); // Persist!
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
      <AuthForm type="login" onSubmit={onSubmit} error={error} loading={loading} />
      <div className="text-center mt-4">
        <Link href="/" className="text-blue-500 underline">Return to Homepage</Link>
      </div>
    </div>
  );
}
