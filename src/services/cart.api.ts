import api from './api';

// Add item to cart
export async function addToCart(productId: string, quantity: number = 1) {
  const res = await api.post('/cart/add', { productId, quantity });
  return res.data; // { message, cart }
}

// Fetch cart items
export async function fetchCart() {
  const res = await api.get('/cart');
  return res.data; // { cart }
}

// Remove item from cart
export async function removeFromCart(itemId: string) {
  const res = await api.delete(`/cart/remove/${itemId}`);
  return res.data; // { cart }
}
