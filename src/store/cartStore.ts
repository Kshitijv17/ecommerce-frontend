import { create } from 'zustand';

export type CartItem = {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    // Add more fields as needed
  };
  quantity: number;
};

interface CartState {
  items: CartItem[];
  setCart: (items: CartItem[]) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  setCart: (items) => set({ items: Array.isArray(items) ? items : [] }),
  clearCart: () => set({ items: [] }),
}));
