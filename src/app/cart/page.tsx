'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { fetchCart, removeFromCart } from '@/services/cart.api';

export default function CartPage() {
  const items = useCartStore((s) => Array.isArray(s.items) ? s.items : []);
  const setCart = useCartStore((s) => s.setCart);
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    fetchCart()
      .then((data) => {
        console.log('fetchCart response:', data);
        const newItems = Array.isArray(data.cart?.items) ? data.cart.items : [];
        setCart(newItems);
      })
      .catch((err) => {
        console.error('fetchCart error:', err);
        clearCart();
      });
    // eslint-disable-next-line
  }, []);

  async function handleRemove(itemId: string) {
    try {
      const data = await removeFromCart(itemId);
      const newItems = Array.isArray(data.cart?.items) ? data.cart.items : [];
      setCart(newItems);
    } catch (e) {
      alert('Failed to remove item');
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {items.map((item) => (
              <li key={item._id} className="mb-4 flex justify-between items-center border-b pb-3">
                <div>
                  <div className="font-semibold">{item.product.name}</div>
                  <div>Quantity: {item.quantity}</div>
                  <div>Price: ₹{item.product.price}</div>
                  <div className="text-sm text-gray-500">
                    Subtotal: ₹{item.product.price * item.quantity}
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="btn btn-sm btn-error ml-2"
                >Remove</button>
              </li>
            ))}
          </ul>
          <div className="font-bold mt-5 flex justify-between">
            <span>Total Items:</span>
            <span>
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <div className="font-bold flex justify-between">
            <span>Total Price:</span>
            <span>
              ₹{items.reduce((sum, item) => sum + (item.quantity * item.product.price), 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
