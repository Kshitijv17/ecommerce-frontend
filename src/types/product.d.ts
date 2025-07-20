export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock?: number;
  category?: { name: string };
  images?: string[];
  ratings?: number;
  reviews?: any[];
}
