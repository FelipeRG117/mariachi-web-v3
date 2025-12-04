/**
 * Cart Types
 *
 * Types and interfaces for shopping cart functionality
 */

import type { Product } from './business/product';

/**
 * Item in the shopping cart
 * Extends Product with cart-specific properties
 */
export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariantId?: string; // For future variant support
  addedAt: string; // ISO timestamp
}

/**
 * Cart summary calculations
 */
export interface CartSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
}

/**
 * Cart state
 */
export interface CartState {
  items: CartItem[];
  isOpen: boolean; // For mini-cart drawer
}

/**
 * Cart actions
 */
export interface CartActions {
  // Item management
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // UI state
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed values
  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
  getSummary: () => CartSummary;

  // Utilities
  hasItem: (productId: string) => boolean;
  getItem: (productId: string) => CartItem | undefined;
}

/**
 * Complete cart store type
 */
export type CartStore = CartState & CartActions;

/**
 * Cart item for display purposes
 */
export interface CartItemDisplay extends CartItem {
  subtotal: number;
}

/**
 * Cart toast notification types
 */
export type CartNotificationType = 'added' | 'removed' | 'updated' | 'cleared' | 'error';

export interface CartNotification {
  type: CartNotificationType;
  message: string;
  productName?: string;
  duration?: number;
}
