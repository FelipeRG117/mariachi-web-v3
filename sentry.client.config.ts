/**
 * Sentry Client-Side Configuration
 *
 * This file configures Sentry for the browser/client-side.
 * It will capture errors that occur in the user's browser.
 */

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Your Sentry DSN (Data Source Name)
  // Get this from: https://sentry.io/settings/[your-org]/projects/[your-project]/keys/
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production to a lower value (e.g., 0.1 = 10%)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Set `tracePropagationTargets` to control which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/mariachi-web-v3.*\.vercel\.app/,
    /^https:\/\/creatorplantilla-back-production\.up\.railway\.app/,
  ],

  // Capture Replay for 10% of all sessions,
  // plus 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Enable Session Replay
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Filter out sensitive information
  beforeSend(event, hint) {
    // Don't send errors in development
    if (process.env.NODE_ENV === 'development') {
      return null;
    }

    // Filter out certain errors
    if (event.exception) {
      const error = hint.originalException;
      if (error && typeof error === 'object' && 'message' in error) {
        const message = error.message as string;

        // Don't send network errors from ad blockers
        if (message.includes('blocked by client')) {
          return null;
        }

        // Don't send CORS errors (usually ad blockers)
        if (message.includes('CORS')) {
          return null;
        }
      }
    }

    return event;
  },

  // Environment
  environment: process.env.NODE_ENV || 'development',
});
