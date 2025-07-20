import { fetchProductById } from '@/services/products.api';
import type { Product } from '@/types/product';
import AddToCartButton from '@/components/AddToCartButton';
import Link from 'next/link';

import { Suspense } from 'react';
import ReviewSectionClient from '@/components/ReviewSectionClient';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product: Product = await fetchProductById(id);

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded shadow">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          {product.images && product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-contain h-60 rounded"
            />
          ) : (
            <span className="text-6xl">📦</span>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-1">{product.name}</h1>
          <div className="text-xl text-blue-700 mb-2 font-semibold">₹{product.price}</div>
          {product.category?.name && (
            <div className="text-gray-600 mb-2">
              <b>Category:</b> {product.category.name}
            </div>
          )}
          <div className="mb-4">{product.description}</div>
          <div className="mb-2 text-gray-500">Stock: {product.stock ?? 'N/A'}</div>
          <div className="flex gap-4 mb-6">
            <AddToCartButton productId={product._id} />
            <button className="btn btn-accent">Buy Now</button>
          </div>
        </div>
      </div>
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <Suspense fallback={<div>Loading reviews...</div>}>
          <ReviewSectionClient productId={product._id} />
        </Suspense>
        <Link href="/" className="inline-block mt-8 text-blue-500 underline">Back to Home</Link>
      </section>
    </div>
  );
}
