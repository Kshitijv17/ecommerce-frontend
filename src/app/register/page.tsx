'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/services/auth.api';
import { useAuthStore } from '@/store/authStore';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const onSubmit = async (data: { name?: string; email: string; password: string }) => {
    setError(null);
    setLoading(true);
    try {
      const res = await register(data.name || "", data.email, data.password);
      setAuth(res.user, res.accessToken);
      sessionStorage.setItem('accessToken', res.accessToken); // Persist!
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
      <AuthForm type="register" onSubmit={onSubmit} error={error} loading={loading} />
      <div className="text-center mt-4">
        <Link href="/" className="text-blue-500 underline">Return to Homepage</Link>
      </div>
    </div>
  );
}
