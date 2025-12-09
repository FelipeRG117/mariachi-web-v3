/**
 * Cart Store (Zustand)
 *
 * Global state management for shopping cart with localStorage persistence
 *
 * Features:
 * - Add/remove/update items
 * - Automatic persistence to localStorage
 * - Real-time calculations (subtotal, total)
 * - TypeScript strict types
 * - Mini-cart drawer state
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartStore, CartItem, CartSummary } from '@/types/cart';
import type { Product } from '@/types/business/product';
import { getProductPrice } from '@/types/business/product';

/**
 * Tax rate (16% IVA for Mexico)
 * Change this based on your location/requirements
 */
const TAX_RATE = 0.16;

/**
 * Shipping calculation
 * TODO: Implement dynamic shipping based on location/weight
 */
const calculateShipping = (subtotal: number): number => {
  if (subtotal === 0) return 0;
  if (subtotal >= 1000) return 0; // Free shipping over $1000 MXN
  return 150; // Fixed shipping: $150 MXN
};

/**
 * Main Cart Store
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // ==========================================
      // STATE
      // ==========================================
      items: [],
      isOpen: false,

      // ==========================================
      // ITEM MANAGEMENT ACTIONS
      // ==========================================

      /**
       * Add item to cart
       * If item already exists, increase quantity
       */
      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );

          if (existingItem) {
            // Item exists, increase quantity
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          // New item
          const newItem: CartItem = {
            product,
            quantity,
            addedAt: new Date().toISOString(),
          };

          return {
            items: [...state.items, newItem],
          };
        });
      },

      /**
       * Remove item from cart completely
       */
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        }));
      },

      /**
       * Update item quantity
       * If quantity is 0 or less, remove item
       */
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      /**
       * Clear entire cart
       */
      clearCart: () => {
        set({ items: [] });
      },

      // ==========================================
      // UI STATE ACTIONS
      // ==========================================

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      // ==========================================
      // COMPUTED VALUES
      // ==========================================

      /**
       * Get total number of items (sum of quantities)
       */
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      /**
       * Calculate subtotal (before tax and shipping)
       */
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + getProductPrice(item.product) * item.quantity,
          0
        );
      },

      /**
       * Calculate final total (subtotal + tax + shipping - discount)
       */
      getTotal: () => {
        const summary = get().getSummary();
        return summary.total;
      },

      /**
       * Get complete cart summary with all calculations
       */
      getSummary: (): CartSummary => {
        const items = get().items;
        const itemCount = get().getItemCount();

        // Calculate subtotal
        const subtotal = items.reduce(
          (total, item) => total + getProductPrice(item.product) * item.quantity,
          0
        );

        // Calculate tax (16% IVA)
        const tax = subtotal * TAX_RATE;

        // Calculate shipping
        const shipping = calculateShipping(subtotal);

        // Calculate discount (TODO: implement coupon system)
        const discount = 0;

        // Calculate final total
        const total = subtotal + tax + shipping - discount;

        return {
          subtotal: Math.round(subtotal * 100) / 100,
          tax: Math.round(tax * 100) / 100,
          shipping: Math.round(shipping * 100) / 100,
          discount: Math.round(discount * 100) / 100,
          total: Math.round(total * 100) / 100,
          itemCount,
        };
      },

      // ==========================================
      // UTILITY METHODS
      // ==========================================

      /**
       * Check if product is in cart
       */
      hasItem: (productId: string) => {
        return get().items.some((item) => item.product._id === productId);
      },

      /**
       * Get specific cart item
       */
      getItem: (productId: string) => {
        return get().items.find((item) => item.product._id === productId);
      },
    }),

    {
      name: 'mariachi-cart-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),

      // Only persist items, not UI state (isOpen)
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);

/**
 * Selector hooks for better performance
 * Use these instead of accessing the whole store
 */

// Get just the item count (for navbar badge)
export const useCartItemCount = () => useCartStore((state) => state.getItemCount());

// Get just the total (for display)
export const useCartTotal = () => useCartStore((state) => state.getTotal());

// Get just the items (for cart page)
export const useCartItems = () => useCartStore((state) => state.items);

// Get drawer state
export const useCartDrawer = () => useCartStore((state) => ({
  isOpen: state.isOpen,
  toggle: state.toggleCart,
  open: state.openCart,
  close: state.closeCart,
}));
