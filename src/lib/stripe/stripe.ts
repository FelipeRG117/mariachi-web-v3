/**
 * Stripe Configuration and Services
 *
 * Handles Stripe.js initialization and checkout session creation
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';
import { apiRequest } from '@/lib/api/client';
import type { CartItem } from '@/types/cart';

// Initialize Stripe instance (singleton)
let stripePromise: Promise<Stripe | null>;

/**
 * Get Stripe instance
 * Lazy-loads Stripe.js only when needed
 */
export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.error('Stripe publishable key is not configured');
      return Promise.resolve(null);
    }

    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
};

/**
 * Checkout Session Request
 */
export interface CheckoutSessionRequest {
  items: CartItem[];
  customerEmail?: string;
  metadata?: Record<string, string>;
}

/**
 * Checkout Session Response
 */
export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

/**
 * Create Stripe checkout session
 *
 * @param data - Checkout session data (items, email, metadata)
 * @returns Promise with session ID and checkout URL
 */
export const createCheckoutSession = async (
  data: CheckoutSessionRequest
): Promise<CheckoutSessionResponse> => {
  try {
    const response = await apiRequest.post<CheckoutSessionResponse>(
      '/api/stripe/create-checkout-session',
      data
    );

    return response;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
};

/**
 * Redirect to Stripe checkout using hosted checkout URL
 * (Nueva API - ya no usa redirectToCheckout deprecated)
 *
 * @param url - Stripe checkout URL
 */
export const redirectToCheckout = async (url: string): Promise<void> => {
  // Simplemente redirigir a la URL de Stripe Checkout
  window.location.href = url;
};

/**
 * Create checkout session and redirect
 * Convenience method that combines creation + redirect
 *
 * @param data - Checkout session data
 */
export const checkoutWithStripe = async (
  data: CheckoutSessionRequest
): Promise<void> => {
  try {
    // Create session (retorna sessionId y URL)
    const { url } = await createCheckoutSession(data);

    // Redirect to Stripe checkout usando la URL directamente
    if (!url) {
      throw new Error('No checkout URL received from server');
    }

    window.location.href = url;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};

/**
 * Retrieve checkout session details
 *
 * @param sessionId - Stripe session ID
 */
export const getCheckoutSession = async (sessionId: string) => {
  try {
    const response = await apiRequest.get(
      `/api/stripe/checkout-session/${sessionId}`
    );
    return response;
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    throw error;
  }
};
