'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { logout } from '@/services/auth.api';

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const router = useRouter();

const cartCount = useCartStore(
  (s) => Array.isArray(s.items)
    ? s.items.reduce((acc, item) => acc + item.quantity, 0)
    : 0
);
// OR even shorter/safer (optional chaining):
// (s) => s.items?.reduce?.((acc, item) => acc + item.quantity, 0) ?? 0


  const handleLogout = async () => {
    try {
      await logout();
      clearAuth();
      sessionStorage.removeItem('accessToken');
      router.push('/login');
    } catch (error) {
      alert('Logout failed. Try again.');
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-100">
      <Link href="/" className="font-bold text-xl text-blue-700">
        Ecommerce
      </Link>
      <div className="space-x-5 flex items-center">
        <Link href="/products" className="hover:underline">
          Products
        </Link>

        {/* Cart Icon/Count */}
        <Link href="/cart" className="relative flex items-center gap-1 text-blue-700 font-medium">
          <span role="img" aria-label="cart" className="text-xl">🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
              {cartCount}
            </span>
          )}
          <span className="ml-1">Cart</span>
        </Link>

        {user ? (
          <button
            className="text-blue-800 font-medium hover:underline ml-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="text-blue-700 font-medium hover:underline ml-2">Login</Link>
            <Link href="/register" className="text-blue-700 font-medium hover:underline ml-2">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
