'use client';
import { useState } from 'react';
import { addReview } from '@/services/review.api';

export default function ReviewForm({
  productId,
  onReviewSubmit,
}: {
  productId: string;
  onReviewSubmit: () => Promise<void>;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await addReview(productId, rating, comment);
      setComment('');
      setRating(5);
      await onReviewSubmit(); // Refresh review list
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded">
      <div className="mb-2">
        <label className="font-semibold">Your Rating:</label>
        <select
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
          className="ml-2"
        >
          {[5, 4, 3, 2, 1].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="font-semibold">Comment:</label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
          className="w-full mt-1 p-1 border rounded min-h-[60px]"
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="btn btn-accent mt-2" disabled={loading}>
        {loading ? "Posting..." : "Submit Review"}
      </button>
    </form>
  );
}
