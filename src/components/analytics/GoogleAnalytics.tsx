'use client'

/**
 * Google Analytics 4 Component
 *
 * Implements GA4 tracking with gtag.js for Next.js 15+
 *
 * Features:
 * - Page view tracking
 * - E-commerce events (view_item, add_to_cart, purchase)
 * - Custom events
 * - Automatic route change tracking
 *
 * Setup:
 * 1. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to .env.local
 * 2. Include this component in root layout
 */

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void
    dataLayer?: unknown[]
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views on route change
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

    // Send pageview with custom URL
    window.gtag?.('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }, [pathname, searchParams])

  // Don't load GA in development
  if (process.env.NODE_ENV === 'development' || !GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  )
}

/**
 * Analytics Event Functions
 * Use these to track custom events throughout your app
 */

// Track page view (manual)
export const trackPageView = (url: string) => {
  if (!GA_MEASUREMENT_ID) return
  window.gtag?.('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

// Track custom event
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (!GA_MEASUREMENT_ID) return
  window.gtag?.('event', eventName, eventParams)
}

// E-commerce: View Item
export const trackViewItem = (product: {
  id: string
  name: string
  category: string
  price: number
}) => {
  if (!GA_MEASUREMENT_ID) return
  window.gtag?.('event', 'view_item', {
    currency: 'MXN',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1,
      },
    ],
  })
}

// E-commerce: Add to Cart
export const trackAddToCart = (product: {
  id: string
  name: string
  category: string
  price: number
  quantity: number
}) => {
  if (!GA_MEASUREMENT_ID) return
  window.gtag?.('event', 'add_to_cart', {
    currency: 'MXN',
    value: product.price * product.quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: product.quantity,
      },
    ],
  })
}

// E-commerce: Remove from Cart
export const trackRemoveFromCart = (product: {
  id: string
  name: string
  category: string
  price: number
  quantity: number
}) => {
  if (!GA_MEASUREMENT_ID) return
  window.gtag?.('event', 'remove_from_cart', {
    currency: 'MXN',
    value: product.price * product.quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: product.quantity,
      },
    ],
  })
}

// E-commerce: Begin Checkout
export const trackBeginCheckout = (
  items: Array<{
    id: string
    name: string
    category: string
    price: number
    quantity: number
  }>,
  value: number
) => {
  if (!GA_MEASUREMENT_ID) return
  window.gtag?.('event', 'begin_checkout', {
    currency: 'MXN',
    value,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}

// E-commerce: Purchase
export const trackPurchase = (
  transactionId: string,
  items: Array<{
    id: string
    name: string
    category: string
    price: number
    quantity: number
  }>,
  value: number,
  tax: number,
  shipping: number
) => {
  if (!GA_MEASUREMENT_ID) return
  window.gtag?.('event', 'purchase', {
    transaction_id: transactionId,
    currency: 'MXN',
    value,
    tax,
    shipping,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}

// Search event
export const trackSearch = (searchTerm: string) => {
  if (!GA_MEASUREMENT_ID) return
  window.gtag?.('event', 'search', {
    search_term: searchTerm,
  })
}
