"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState, CartItem, Product, ProductSize, PromoCode } from "@/types";
import { validatePromoCode } from "./promoCodes";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedPromo: null,
      isOpen: false,

      addItem: (product: Product, size: ProductSize) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.size.value === size.value
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.size.value === size.value
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, size, quantity: 1 }] };
        });
      },

      removeItem: (productId: string, sizeValue: string) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.id === productId && i.size.value === sizeValue)
          ),
        }));
      },

      updateQuantity: (productId: string, sizeValue: string, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(productId, sizeValue);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId && i.size.value === sizeValue
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      applyPromo: (code: string) => {
        const promo = validatePromoCode(code);
        if (!promo) {
          return { success: false, message: "Invalid promo code" };
        }
        set({ appliedPromo: promo });
        return { success: true, message: `Discount applied (${promo.percentPct}% off)` };
      },

      removePromo: () => set({ appliedPromo: null }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getSubtotal: () => {
        const { items } = get();
        return items.reduce(
          (sum, item) =>
            sum + item.product.salePrice * item.size.multiplier * item.quantity,
          0
        );
      },

      getDiscount: () => {
        const { appliedPromo } = get();
        if (!appliedPromo) return 0;
        return get().getSubtotal() * (appliedPromo.percentPct / 100);
      },

      getTotal: () => get().getSubtotal() - get().getDiscount(),

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "well-electrolytes-cart",
      partialize: (state) => ({
        items: state.items,
        appliedPromo: state.appliedPromo,
      }),
    }
  )
);
