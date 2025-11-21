import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  count: () => number;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const { items } = get();
        const productInCart = items.find((item) => item.id === product.id);

        if (productInCart) {
          const newItems = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set({ items: newItems });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },

      clearCart: () => set({ items: [] }),

      count: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: "vendrix-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
