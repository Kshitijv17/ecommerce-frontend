import ProductCard from '@/components/ProductCard';
import { fetchAllProducts } from '@/services/products.api';

export default async function HomePage() {
  const products = await fetchAllProducts();

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
