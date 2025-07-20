// export async function fetchAllProducts() {
//   const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' });
//   if (!res.ok) throw new Error('Failed to load products');
//   const data = await res.json();
//   // Return the array inside the object:
//   return data.products;  // <--- Correct!
// }
// src/services/products.api.ts

import api from './api'; // this is your axios instance (from earlier). If you prefer fetch, see below.

// FETCH ALL PRODUCTS (for homepage)
export async function fetchAllProducts() {
  // Using fetch (remove/comment this if you use axios only):
  // const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' });
  // if (!res.ok) throw new Error('Failed to load products');
  // const data = await res.json();
  // return data.products;

  // Using axios instance:
  const res = await api.get('/products');
  return res.data.products;
}

// FETCH PRODUCT BY ID
export async function fetchProductById(id: string) {
  // const res = await fetch(`http://localhost:5000/api/products/${id}`);
  // if (!res.ok) throw new Error('Failed to load product');
  // const data = await res.json();
  // return data.product || data;

  const res = await api.get(`/products/${id}`);
  // Adjust if your backend wraps in `{ product }`
  return res.data.product || res.data;
}

// FETCH REVIEWS FOR PRODUCT
export async function fetchReviewsForProduct(productId: string) {
  // const res = await fetch(`http://localhost:5000/api/reviews/product/${productId}`);
  // if (!res.ok) return [];
  // return (await res.json()).reviews || (await res.json());

  const res = await api.get(`/reviews/product/${productId}`);
  // Adjust if your backend wraps in `{ reviews }`
  return res.data.reviews || res.data;
}
