import { Product } from "@/utils/api";
import { create } from "zustand";
import { zustandStorage } from "./mmkv";
import { createJSONStorage, persist } from "zustand/middleware";

// we want the products properties plus quantity
export interface ProductWithQuantity extends Product {
  quantity: number;
}

export interface CartState {
  products: ProductWithQuantity[];
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
  total: number; // total price of the items in the cart
  count: number; // the count of items in the cart
}

const INITIAL_STATE = {
  products: [],
  total: 0,
  count: 0,
};

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      addProduct: (product: Product) => {
        set((state) => {
          const hasProduct = state.products.find((p) => p.id === product.id);
          const newTotal = Number(state.total) + Number(product.price);
          const newCount = state.count + 1;

          if (hasProduct) {
            return {
              products: state.products.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              ),
              total: newTotal,
              count: newCount,
            };
          } else {
            return {
              products: [...state.products, { ...product, quantity: 1 }],
              total: newTotal,
              count: newCount,
            };
          }
        });
      },

      reduceProduct: (product: Product) => {
        set((state) => {
          const newTotal = Number(state.total) - Number(product.price);
          const newCount = state.count - 1;

          return {
            products: state.products
              .map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
              )
              .filter((p) => p.quantity > 0),
            total: newTotal,
            count: newCount,
          };
        });
      },

      clearCart: () => {
        set(INITIAL_STATE);
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => zustandStorage), // converts zustand storage into JSON and uses mmkv to store in file system.
    }
  )
);

export default useCartStore;
