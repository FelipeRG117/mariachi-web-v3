/**
 * Sentry Edge Runtime Configuration
 *
 * This file configures Sentry for Edge runtime (middleware, edge functions).
 */

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Your Sentry DSN
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set tracesSampleRate for performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Environment
  environment: process.env.NODE_ENV || 'development',
});
