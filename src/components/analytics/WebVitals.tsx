'use client'

/**
 * Web Vitals Reporter for Next.js 15+
 *
 * Monitors Core Web Vitals and reports them to Google Analytics 4
 *
 * Core Web Vitals:
 * - LCP (Largest Contentful Paint): Loading performance
 * - FID (First Input Delay): Interactivity
 * - CLS (Cumulative Layout Shift): Visual stability
 *
 * Additional metrics:
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 * - INP (Interaction to Next Paint)
 *
 * Usage:
 * Add to root layout to automatically report metrics
 */

import { useReportWebVitals } from 'next/web-vitals'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Don't report in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]', metric.name, metric.value)
      return
    }

    // Send to Google Analytics 4
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      })
    }

    // Send to Sentry for performance monitoring
    if (window.Sentry?.metrics) {
      window.Sentry.metrics.distribution(metric.name, metric.value, {
        unit: getMetricUnit(metric.name),
        tags: {
          route: window.location.pathname,
        },
      })
    }
  })

  return null
}

/**
 * Get appropriate unit for each metric
 */
function getMetricUnit(metricName: string): string {
  switch (metricName) {
    case 'CLS':
      return 'none' // CLS is unitless
    case 'FID':
    case 'FCP':
    case 'LCP':
    case 'TTFB':
    case 'INP':
      return 'millisecond'
    default:
      return 'millisecond'
  }
}

/**
 * Web Vitals thresholds for scoring
 * https://web.dev/vitals/
 */
export const THRESHOLDS = {
  LCP: {
    good: 2500, // 2.5s
    needsImprovement: 4000, // 4s
  },
  FID: {
    good: 100, // 100ms
    needsImprovement: 300, // 300ms
  },
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  FCP: {
    good: 1800, // 1.8s
    needsImprovement: 3000, // 3s
  },
  TTFB: {
    good: 800, // 800ms
    needsImprovement: 1800, // 1.8s
  },
  INP: {
    good: 200, // 200ms
    needsImprovement: 500, // 500ms
  },
}

/**
 * Get rating for a metric value
 */
export function getMetricRating(
  metricName: keyof typeof THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metricName]
  if (!threshold) return 'poor'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}

// Extend Window interface for Sentry metrics
declare global {
  interface Window {
    Sentry?: {
      metrics?: {
        distribution: (
          name: string,
          value: number,
          options?: {
            unit?: string
            tags?: Record<string, string>
          }
        ) => void
      }
    }
  }
}
