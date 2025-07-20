import type { Product } from '@/types/product';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="border rounded p-3 shadow hover:shadow-lg transition cursor-pointer">
        <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
        <div className="font-bold text-blue-700 mb-1">₹{product.price}</div>
        <p className="text-gray-600 mb-2">{product.description}</p>
      </div>
    </Link>
  );
}
