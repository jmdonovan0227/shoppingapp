import { Product } from "@/utils/api";
import { create } from "zustand";

// we want the products properties plus quantity
export interface ProductWithQuantity extends Product {
  quantity: number;
}

export interface CartState {
  products: ProductWithQuantity[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearCart: () => void;
  total: number; // total number of items
  count: number; // the count of items in the cart
}

const INITIAL_STATE = {
  products: [],
  total: 0,
  count: 0,
};

const useCartStore = create<CartState>((set) => ({
  ...INITIAL_STATE,

  addProduct: (product: Product) => {},

  removeProduct: (product: Product) => {},

  clearCart: () => {},
}));
