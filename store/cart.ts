import { CartStateItem, getCartDetails } from "@/lib/get-cart-details";
import { Api } from "@/services/api-client";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CartState = {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  actions: {
    /* Get all items */
    fetchCartItems: () => Promise<void>;

    /* Update item quantity */
    updateItemTotalCount: (id: number, quantity: number) => Promise<void>;

    /* Add item */
    addCartItem: (values: CreateCartItemValues) => Promise<void>;

    /* Remove item */
    removeCartItem: (id: number) => Promise<void>;
  };
};

const useCartStore = create<CartState>()(
  devtools(
    (set) => ({
      items: [],
      error: false,
      loading: true,
      totalAmount: 0,
      actions: {
        fetchCartItems: async () => {
          try {
            set({ loading: true, error: false });
            const data = await Api.cart.getCart();
            set(getCartDetails(data));
          } catch (error) {
            console.error(error);
            set({ error: true });
          } finally {
            set({ loading: false });
          }
        },

        updateItemTotalCount: async (id: number, quantity: number) => {
          try {
            set({ loading: true, error: false });
            const data = await Api.cart.updateItemQuantity(id, quantity);
            set(getCartDetails(data));
          } catch (error) {
            console.error(error);
            set({ error: true });
          } finally {
            set({ loading: false });
          }
        },

        removeCartItem: async (id: number) => {
          try {
            set((state) => ({
              loading: true,
              error: false,
              items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
            }));
            const data = await Api.cart.removeCartItem(id);
            set(getCartDetails(data));
          } catch (error) {
            console.error(error);
            set({ error: true });
          } finally {
            set((state) => ({
              loading: false,
              items: state.items.map((item) => ({ ...item, disabled: false })),
            }));
          }
        },

        addCartItem: async (values: CreateCartItemValues) => {
          try {
            set({ loading: true, error: false });
            const data = await Api.cart.addCartItem(values);
            set(getCartDetails(data));
          } catch (error) {
            console.error(error);
            set({ error: true });
          } finally {
            set({ loading: false });
          }
        },
      },
    }),
    { name: "CartStore" }
  )
);

export const useCartItems = () => useCartStore((state) => state.items);
export const useCartTotal = () => useCartStore((state) => state.totalAmount);
export const useCartLoading = () => useCartStore((state) => state.loading);

export const useCartActions = () => useCartStore((state) => state.actions);
