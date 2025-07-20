'use client';
import { useEffect, useState } from 'react';
import { fetchReviewsForProduct } from '@/services/review.api';
import { useAuthStore } from '@/store/authStore';
import ReviewForm from './ReviewForm';

export default function ReviewSectionClient({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const user = useAuthStore((s) => s.user);

  async function loadReviews() {
    const reviewsList = await fetchReviewsForProduct(productId);
    setReviews(Array.isArray(reviewsList) ? reviewsList : []);
  }

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line
  }, [productId]);

  return (
    <>
      {user && (
        <ReviewForm productId={productId} onReviewSubmit={loadReviews} />
      )}
      {(!reviews || reviews.length === 0) && <div>No reviews yet.</div>}
      <ul>
        {reviews.map((review: any) => (
          <li key={review._id} className="mb-3 border-b pb-2">
            <div className="font-semibold">
              {review.user?.email || review.user?.name || 'Anonymous'}
            </div>
            <div className="text-yellow-500 text-sm">Rating: {review.rating}/5</div>
            <div>{review.comment}</div>
            <div className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
