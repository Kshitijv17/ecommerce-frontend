'use client';

import { useState } from 'react';
import { addToCart, fetchCart } from '@/services/cart.api';
import { useCartStore } from '@/store/cartStore';

export default function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const setCart = useCartStore((s) => s.setCart);

  async function handleAdd() {
    setLoading(true);
    setMessage(null);
    console.log(`[AddToCart] Button clicked! Product ID:`, productId);

    try {
      const cart = await addToCart(productId, 1);
      console.log('[AddToCart] API response:', cart);

      // NOW use cart.items if fully populated, but for consistency, always refetch
      const freshCart = await fetchCart();
      console.log('[AddToCart] Fetched full cart:', freshCart);

      // THE FIX: Items are in freshCart.cart.items
      const newItems = Array.isArray(freshCart.cart?.items) ? freshCart.cart.items : [];
      setCart(newItems);
      console.log('[AddToCart] Stored items in Zustand (populated):', newItems);

      setMessage('Added to cart!');
    } catch (e: any) {
      setMessage('Failed to add to cart');
      console.error('[AddToCart] Caught error:', e);
    } finally {
      setLoading(false);
      console.log('[AddToCart] Finished handleAdd');
    }
  }

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={handleAdd}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
      {message && <div className="mt-2 text-green-600 text-sm">{message}</div>}
    </div>
  );
}
