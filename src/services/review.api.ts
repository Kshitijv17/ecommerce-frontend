import api from './api';

// POST: submit a new review for a product
export async function addReview(productId: string, rating: number, comment: string) {
  // Your backend route is POST /api/reviews
  const res = await api.post('/reviews', { productId, rating, comment });
  return res.data; // { message, review }
}

// GET: get all reviews for a product
export async function fetchReviewsForProduct(productId: string) {
  // Your backend route is /api/reviews/product/:productId
  const res = await api.get(`/reviews/product/${productId}`);
  return res.data.reviews || res.data;
}
